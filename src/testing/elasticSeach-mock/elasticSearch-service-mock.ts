import { ElasticsearchService } from '@nestjs/elasticsearch';

export const elasticsearchServiceMock = {
  provide: ElasticsearchService,
  useValue: {
    index: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
