import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { customersServiceMock } from '../testing/customers-mock/customers-service-mock';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customerMock } from '../testing/customers-mock/customerMock';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [customersServiceMock],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', async () => {
    const createCustomerDto = customerMock;

    const result = await controller.create(createCustomerDto);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(createCustomerDto);
  });

  it('should find all customers', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a customer by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a customer', async () => {
    const updateCustomerDto: UpdateCustomerDto = { name: 'Jane Doe' };
    const result = await controller.update('1', updateCustomerDto);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, updateCustomerDto);
  });

  it('should remove a customer', async () => {
    const id = '1';
    const result = await controller.remove(id);
    expect(result).toEqual({ message: 'Customer deleted successfully' });
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
