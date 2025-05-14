import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../items/entities/item.entity';
import { itemMock } from './item-mock';

export const itemsRepositoryMock = {
  provide: getRepositoryToken(Item),
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      ...itemMock,
    }),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        ...itemMock,
      },
    ]), // ✅ Aqui está o correto
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      ...itemMock,
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      ...itemMock,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      ...itemMock,
    }),
    merge: jest.fn().mockResolvedValue({
      id: 1,
      ...itemMock,
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve({ message: 'Item deleted successfully' }),
      ),
  },
};
