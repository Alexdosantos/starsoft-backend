import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../items/entities/item.entity';

export const itemsRepositoryMock = {
  provide: getRepositoryToken(Item),
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
    }),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        quantity: 1,
      },
    ]), // ✅ Aqui está o correto
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
    }),
    save: jest.fn().mockResolvedValue({
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
