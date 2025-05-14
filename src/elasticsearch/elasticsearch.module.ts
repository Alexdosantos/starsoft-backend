import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        node:
          config.get<string>('ELASTICSEARCH_NODE') || 'http://localhost:9200',
      }),
    }),
  ],
  exports: [ElasticsearchModule],
})
export class ElasticsearchModuleTs {}
