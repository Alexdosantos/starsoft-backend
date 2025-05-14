import { Customer } from '../../customers/entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { customerMock } from './customerMock';

export const customersRepositoryMock = {
  provide: getRepositoryToken(Customer),
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),

    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        ...customerMock,
      },
    ]),
    merge: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    remove: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
  },
};
