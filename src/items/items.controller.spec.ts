import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { itemsServiceMock } from '../testing/items-mock/items-service';
import { UpdateItemDto } from './dto/update-item.dto';
import { itemMock } from '../testing/items-mock/item-mock';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [itemsServiceMock],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    const result = await controller.create(itemMock);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(itemMock);
  });

  it('should find all items', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a specific item by ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an item', async () => {
    const updateItemDto: UpdateItemDto = itemMock;
    const result = await controller.update('1', updateItemDto);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, updateItemDto);
  });

  it('should remove an item', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ message: 'Item deleted successfully' });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
