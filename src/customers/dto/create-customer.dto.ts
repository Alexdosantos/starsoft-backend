import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsString({ message: 'Phone must be a string' })
  phone: string;
}
