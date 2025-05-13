import { ItemsService } from '../../items/items.service';

export const itemsServiceMock = {
  provide: ItemsService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        quantity: 1,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
    }),
    merge: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve({ message: 'Item deleted successfully' }),
      ),
  },
};
