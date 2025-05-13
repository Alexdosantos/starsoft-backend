import { Customer } from '../../customers/entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const customersRepositoryMock = {
  provide: getRepositoryToken(Customer),
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),

    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
      },
    ]),
    merge: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    remove: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
  },
};
