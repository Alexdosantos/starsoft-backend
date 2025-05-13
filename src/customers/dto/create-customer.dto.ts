import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({ example: '123456789' })
  phone: string;
}
