import { CustomersService } from '../../customers/customers.service';

export const customersServiceMock = {
  provide: CustomersService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    merge: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve({ message: 'Customer deleted successfully' }),
      ),
  },
};
