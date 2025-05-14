import { OrdersService } from '../../orders/orders.service';

export const ordersServiceMock = {
  provide: OrdersService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      status: 'pending',
      items: [],
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        status: 'pending',
        items: [],
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      status: 'pending',
      items: [],
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      status: 'pending',
      items: [],
    }),
    remove: jest.fn().mockResolvedValue({
      message: 'Order deleted successfully',
    }),
  },
};
