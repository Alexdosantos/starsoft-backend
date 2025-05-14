import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ILike } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(
    id?: number,
    name?: string,
    price?: number,
    page?: number,
    limit?: number,
  ): Promise<{
    items: Item[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const [result, totalItems] = await this.itemRepository.findAndCount({
      where: {
        ...(id && { id }),
        ...(name && { name: ILike(`%${name}%`) }),
        ...(price && { price }),
      },
      relations: ['order'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items: result,
    };
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    const updatedItem = this.itemRepository.merge(item, updateItemDto);
    return this.itemRepository.save(updatedItem);
  }

  async remove(id: number): Promise<{ message: string }> {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    await this.itemRepository.remove(item);
    return { message: 'Item deleted successfully' };
  }
}
