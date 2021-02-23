import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataServiceInject } from 'src/data.service';

import { SearchController } from './controller';
import { SearchServiceInject } from './service';

@Module({
  imports: [],
  providers: [ConfigService, DataServiceInject, SearchServiceInject],
  controllers: [SearchController],
})
export class SearchModule {}
