import { IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;
}
