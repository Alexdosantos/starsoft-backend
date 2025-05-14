import { CustomersService } from '../../customers/customers.service';
import { customerMock } from './customerMock';

export const customersServiceMock = {
  provide: CustomersService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        ...customerMock,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    merge: jest.fn().mockResolvedValue({
      id: 1,
      ...customerMock,
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve({ message: 'Customer deleted successfully' }),
      ),
  },
};
