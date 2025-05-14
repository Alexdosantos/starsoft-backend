import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from './entities/item.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: 'Item created', type: Item })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all items' })
  @ApiResponse({ status: 200, description: 'List of items', type: [Item] })
  async findAll(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('price') price?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return await this.itemsService.findAll(+id, name, +price, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a specific item by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiResponse({ status: 200, description: 'Item found', type: Item })
  async findOne(@Param('id') id: string) {
    return await this.itemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: 'Item updated', type: Item })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiResponse({ status: 200, description: 'Item deleted' })
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(+id);
  }
}
