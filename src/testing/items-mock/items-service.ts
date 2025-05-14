import { ItemsService } from '../../items/items.service';
import { itemMock } from './item-mock';

export const itemsServiceMock = {
  provide: ItemsService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      ...itemMock,
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        ...itemMock,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
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
