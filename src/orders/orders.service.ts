import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

import { NotFoundException } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { ItemsService } from '../items/items.service';
import { OrderStatus } from 'src/enum/orderStatus';
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

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('order.created');
  }

  async create(createOrderDto: CreateOrderDto, customerId: number) {
    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const { items, ...orderData } = createOrderDto;

    // Verifica se todos os itens existem
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

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    const order = this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const { items, ...orderData } = updateOrderDto;

    let updatedItems = order.items;
    if (items && items.length > 0) {
      updatedItems = await Promise.all(
        items.map(async (itemId) => {
          const item = await this.itemsService.findOne(itemId);
          if (!item) {
            throw new NotFoundException(`Item with ID ${itemId} not found`);
          }
          return item;
        }),
      );
    }

    const updatedOrder = this.orderRepository.merge(order, {
      ...orderData,
      items: updatedItems,
    });

    await this.orderRepository.save(updatedOrder);

    await this.elasticsearchService.update({
      index: 'orders',
      id: order.id.toString(),
      doc: JSON.parse(JSON.stringify(updatedOrder)),
    });

    return updatedOrder;
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
    return order;
  }
}
