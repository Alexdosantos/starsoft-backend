import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { ordersServiceMock } from '../testing/orders-mock/orders-service-mock';
import { OrdersService } from './orders.service';
import { orderMock } from '../testing/orders-mock/orderMock';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [ordersServiceMock],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const result = await controller.create(orderMock, '1');
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(orderMock, 1);
  });

  it('should find all orders', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a specific order by ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an order', async () => {
    const result = await controller.update('1', orderMock);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, orderMock);
  });

  it('should remove an order', async () => {
    const result = await controller.remove('1');
    expect(result).toBeDefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
