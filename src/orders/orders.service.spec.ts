import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CustomersService } from '../customers/customers.service';
import { ItemsService } from '../items/items.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { elasticsearchServiceMock } from '../testing/elasticSeach-mock/elasticSearch-service-mock';
import { orderMock } from '../testing/orders-mock/orderMock';
import { customersServiceMock } from '../testing/customers-mock/customers-service-mock';
import { itemsServiceMock } from '../testing/items-mock/items-service';
import { ordersRepositoryMock } from '../testing/orders-mock/orders-repository-mock';
import { NotFoundException } from '@nestjs/common';
import { OrderStatus } from '../enum/orderStatus';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: 'KAFKA_CLIENT',
          useValue: {
            emit: jest.fn(),
            subscribeToResponseOf: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Order),
          useValue: ordersRepositoryMock.useValue,
        },
        {
          provide: CustomersService,
          useValue: customersServiceMock.useValue,
        },
        {
          provide: ItemsService,
          useValue: itemsServiceMock.useValue,
        },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMock.useValue,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const createSpy = jest.spyOn(service, 'create');
    await service.create(orderMock, 1);
    expect(createSpy).toHaveBeenCalledWith(orderMock, 1);
  });

  it('should throw NotFoundException if customer not found', async () => {
    customersServiceMock.useValue.findOne.mockResolvedValue(null);
    await expect(service.create(orderMock, 1)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should find array of orders', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(ordersRepositoryMock.useValue.findAndCount).toHaveBeenCalled();
  });

  it('should throw NotFoundException if order not found', async () => {
    ordersRepositoryMock.useValue.findOne.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should find a specific order by ID', async () => {
    ordersRepositoryMock.useValue.findOne.mockResolvedValue(orderMock);
    const result = await service.findOne(1);
    expect(result).toEqual(orderMock);
  });

  it('should update an order', async () => {
    const existingOrder = {
      id: 1,
      items: [],
      status: OrderStatus.PENDING,
    };

    const updatedOrderMock = {
      id: 1,
      items: [],
      status: OrderStatus.PROCESSING,
    };

    const updateOrder = {
      ...existingOrder,
      ...updatedOrderMock,
    };

    ordersRepositoryMock.useValue.findOne.mockResolvedValue(existingOrder);
    ordersRepositoryMock.useValue.save.mockResolvedValue(updateOrder);

    const result = await service.update(1, updatedOrderMock);
    expect(result).toBeDefined();
    expect(ordersRepositoryMock.useValue.save).toHaveBeenCalledWith(
      expect.objectContaining(updatedOrderMock),
    );
  });
});
