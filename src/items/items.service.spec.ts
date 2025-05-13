import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { itemsRepositoryMock } from '../testing/items-mock/items-repositories-mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { itemMock } from '../testing/items-mock/item-mock';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: itemsRepositoryMock.useValue,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item', async () => {
    const createItemDto: CreateItemDto = itemMock;

    const createdItem = {
      id: 1,
      ...createItemDto,
    };

    itemsRepositoryMock.useValue.findOne.mockResolvedValue(null);
    itemsRepositoryMock.useValue.create.mockReturnValue(createdItem);
    itemsRepositoryMock.useValue.save.mockResolvedValue(createdItem);

    const result = await service.create(createItemDto);

    expect(result).toBeDefined();
    expect(result).toEqual(createdItem);
    expect(itemsRepositoryMock.useValue.create).toHaveBeenCalledWith(
      createItemDto,
    );
    expect(itemsRepositoryMock.useValue.save).toHaveBeenCalledWith(createdItem);
  });

  it('should find all items', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(itemsRepositoryMock.useValue.find).toHaveBeenCalled();
  });

  it('should find a specific item by ID', async () => {
    itemsRepositoryMock.useValue.findOne.mockResolvedValue(itemMock);
    const result = await service.findOne(1);
    expect(result).toBeDefined();
    expect(result).toEqual(itemMock);
    expect(itemsRepositoryMock.useValue.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update an item', async () => {
    const existingItem: UpdateItemDto = {
      name: 'Item 2',
      price: 20,
      quantity: 2,
    };
    const updatedItemDto: UpdateItemDto = {
      name: 'Item 2',
      price: 0,
      quantity: 2,
    };
    const updatedItem = {
      ...existingItem,
      ...updatedItemDto,
    };

    itemsRepositoryMock.useValue.findOne.mockResolvedValue(existingItem);
    itemsRepositoryMock.useValue.merge.mockReturnValue(updatedItem);
    itemsRepositoryMock.useValue.save.mockResolvedValue(updatedItem);

    const result = await service.update(1, updatedItemDto);
    expect(result).toBeDefined();
    expect(itemsRepositoryMock.useValue.merge).toHaveBeenCalledWith(
      existingItem,
      updatedItemDto,
    );
    expect(itemsRepositoryMock.useValue.save).toHaveBeenCalledWith(updatedItem);
  });

  it('should remove an item', async () => {
    const item = {
      id: 1,
      ...itemMock,
    };

    itemsRepositoryMock.useValue.findOne.mockResolvedValue(item);
    itemsRepositoryMock.useValue.remove.mockResolvedValue(item);

    const result = await service.remove(1);

    expect(result).toEqual({ message: 'Item deleted successfully' });

    expect(itemsRepositoryMock.useValue.remove).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }),
    );
  });
});
