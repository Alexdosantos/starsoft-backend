import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

import { NotFoundException } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { ItemsService } from '../items/items.service';
import { OrderStatus } from '../enum/orderStatus';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomersService,
    private readonly itemsService: ItemsService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async create(createOrderDto: CreateOrderDto, customerId: number) {
    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const { items, ...orderData } = createOrderDto;

    const orderItems = await Promise.all(
      items.map(async (itemId) => {
        const item = await this.itemsService.findOne(itemId);
        if (!item) {
          throw new NotFoundException(`Item with ID ${itemId} not found`);
        }
        return item;
      }),
    );

    const order = this.orderRepository.create({
      ...orderData,
      status: OrderStatus.PENDING,
      customer,
      items: orderItems,
    });

    const savedOrder = await this.orderRepository.save(order);

    await this.elasticsearchService.index({
      index: 'orders',
      id: savedOrder.id.toString(),
      document: JSON.parse(JSON.stringify(savedOrder)),
    });

    this.kafkaClient.emit('order.created', JSON.stringify(savedOrder));

    return savedOrder;
  }

  async findAll(
    id?: number,
    status?: string,
    createdAt?: string,
    updatedAt?: string,
    items?: string,
  ) {
    if (status && !Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new BadRequestException(
        `Status inválido. Os valores permitidos são: ${Object.values(OrderStatus).join(', ')}`,
      );
    }
    const where: any = {
      ...(id && { id }),
      ...(status && { status }),
      ...(createdAt && { createdAt: new Date(createdAt) }),
      ...(updatedAt && { updatedAt: new Date(updatedAt) }),
    };

    if (items) {
      where.items = {
        name: ILike(`%${items}%`),
      };
    }

    const [result] = await this.orderRepository.findAndCount({
      where,
      relations: ['customer', 'items'],
    });

    return result;
  }
  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'items'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const { items, ...orderData } = updateOrderDto;

    if (items) {
      const newItems = await Promise.all(
        items.map(async (itemId) => {
          const item = await this.itemsService.findOne(itemId);
          if (!item) {
            throw new NotFoundException(`Item with ID ${itemId} not found`);
          }
          return item;
        }),
      );

      order.items = newItems;
    }

    Object.assign(order, orderData);

    const updatedOrder = await this.orderRepository.save(order);

    this.kafkaClient.emit('order.updated', JSON.stringify(updatedOrder));

    await this.elasticsearchService.update({
      index: 'orders',
      id: order.id.toString(),
      doc: JSON.parse(JSON.stringify(updatedOrder)),
    });

    return {
      message: `Order ${id} updated successfully`,
    };
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.orderRepository.remove(order);
    await this.elasticsearchService.delete({
      index: 'orders',
      id: order.id.toString(),
    });
    return {
      message: 'Order deleted successfully',
    };
  }
}
