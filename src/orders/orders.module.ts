import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CustomersModule } from '../customers/customers.module';
import { ItemsModule } from '../items/items.module';
import { KafkaModule } from '../kafka/kafka.module';
import { ElasticsearchModuleTs } from 'src/elasticsearch/elasticsearch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CustomersModule,
    ItemsModule,
    KafkaModule,
    ElasticsearchModuleTs,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
