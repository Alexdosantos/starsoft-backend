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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create/:customerId')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiParam({ name: 'customerId', required: true, type: 'number' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created', type: Order })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Param('customerId') customerId: string,
  ) {
    return this.ordersService.create(createOrderDto, +customerId);
  }

  @Get()
  @ApiOperation({ summary: 'Find all orders' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [Order] })
  async findAll(
    @Query('id') id?: string,
    @Query('status') status?: string,
    @Query('createdAt') createdAt?: string,
    @Query('updatedAt') updatedAt?: string,
    @Query('items') items?: string,
  ) {
    return await this.ordersService.findAll(
      +id,
      status,
      createdAt,
      updatedAt,
      items,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a specific order by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated', type: Order })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }

  @Get('search-elasticsearch')
  @ApiOperation({ summary: 'Search orders using Elasticsearch' })
  @ApiResponse({
    status: 200,
    description: 'Search results from Elasticsearch',
    type: [Order],
  })
  @EventPattern('order.created')
  handleOrderCreated(@Payload() payload: Order, @Ctx() context: KafkaContext) {
    console.log('payload created', payload);
    const message = context.getMessage();
    console.log('[Kafka] order.created received:', {
      key: message.key,
      offset: message.offset,
      value: message.value,
      timestamp: message.timestamp,
    });
  }

  @EventPattern('order.updated')
  handleOrderUpdated(@Payload() payload: Order, @Ctx() context: KafkaContext) {
    console.log('payload', payload);
    const message = context.getMessage();
    console.log('[Kafka] order.updated received:', {
      key: message.key,
      offset: message.offset,
      value: message.value,
      timestamp: message.timestamp,
    });
  }
}
