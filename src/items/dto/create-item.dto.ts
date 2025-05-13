import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ example: 'Calça' })
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @ApiProperty({ example: 29.5 })
  price: number;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @ApiProperty({ example: 5 })
  quantity: number;
}
