import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.ordersService.findAll();
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
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @EventPattern('order.created')
  handleOrderCreated(@Payload() payload: Order, @Ctx() context: KafkaContext) {
    console.log('[Kafka] Evento recebido:', payload);

    const message = context.getMessage();
    console.log('[Kafka key]', message.key);
    console.log('[Kafka offset]', message.offset);
    console.log('[Kafka value]', message.value);
    console.log('[timestamp]', message.timestamp);
  }
}
