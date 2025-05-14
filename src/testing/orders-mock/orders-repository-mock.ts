import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../../orders/entities/order.entity';
import { orderMock } from './orderMock';

export const ordersRepositoryMock = {
  provide: getRepositoryToken(Order),
  useValue: {
    create: jest.fn().mockReturnValue({ id: 1, ...orderMock }),
    save: jest.fn().mockResolvedValue({ id: 1, ...orderMock }),
    find: jest.fn().mockResolvedValue({ id: 1, ...orderMock }),
    findOne: jest.fn().mockResolvedValue({ id: 1, ...orderMock }),
    update: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  },
};
