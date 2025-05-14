import { OrderStatus } from '../../enum/orderStatus';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';

export const orderMock: CreateOrderDto = {
  status: OrderStatus.PENDING,
  items: [],
};
