import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { customersRepositoryMock } from '../testing/customers-mock/customers-repository-mock';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { BadRequestException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: customersRepositoryMock.useValue,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    };

    const createdCustomer = {
      id: 1,
      ...createCustomerDto,
    };

    customersRepositoryMock.useValue.findOne.mockResolvedValue(null);
    customersRepositoryMock.useValue.create.mockReturnValue(createdCustomer);
    customersRepositoryMock.useValue.save.mockResolvedValue(createdCustomer);

    const result = await service.create(createCustomerDto);

    expect(result).toBeDefined();
    expect(result).toEqual(createdCustomer);
    expect(customersRepositoryMock.useValue.create).toHaveBeenCalledWith(
      createCustomerDto,
    );
    expect(customersRepositoryMock.useValue.save).toHaveBeenCalledWith(
      createdCustomer,
    );
  });

  it('should find all customers', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(customersRepositoryMock.useValue.find).toHaveBeenCalled();
  });

  it('should throw BadRequestException if customer already exists', async () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    };

    customersRepositoryMock.useValue.findOne.mockResolvedValue({
      id: 1,
      ...createCustomerDto,
    });

    await expect(service.create(createCustomerDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find a customer by id', async () => {
    const result = await service.findOne(1);
    expect(result).toBeDefined();
    expect(customersRepositoryMock.useValue.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a customer', async () => {
    const existingCustomer = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    };

    const updateCustomerDto: UpdateCustomerDto = { name: 'Jane Doe' };
    const updatedCustomer = { ...existingCustomer, ...updateCustomerDto };

    customersRepositoryMock.useValue.findOne.mockResolvedValue(
      existingCustomer,
    );
    customersRepositoryMock.useValue.merge.mockReturnValue(updatedCustomer);
    customersRepositoryMock.useValue.save.mockResolvedValue(updatedCustomer);

    const result = await service.update(1, updateCustomerDto);
    expect(result).toBeDefined();
    expect(customersRepositoryMock.useValue.merge).toHaveBeenCalledWith(
      existingCustomer,
      updateCustomerDto,
    );
    expect(customersRepositoryMock.useValue.save).toHaveBeenCalledWith(
      updatedCustomer,
    );
  });

  it('should remove a customer', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ message: 'Customer deleted successfully' });
    expect(customersRepositoryMock.useValue.remove).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }),
    );
  });
});
