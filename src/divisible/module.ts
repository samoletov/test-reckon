import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataServiceInject } from 'src/data.service';

import { DivisibleController } from './controller';
import { DivisibleService } from './service';

@Module({
  imports: [],
  providers: [ConfigService, DataServiceInject, DivisibleService],
  controllers: [DivisibleController],
})
export class DivisibleModule {}
