import { OrderStatus } from '../../enum/orderStatus';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({ example: OrderStatus.PENDING })
  status?: OrderStatus;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ example: [1, 2, 3] })
  items: number[];
}
