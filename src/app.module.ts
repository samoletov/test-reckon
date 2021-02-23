import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '../config/dev';
import { DivisibleModule } from './divisible/module';
import { SearchModule } from './search/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DivisibleModule,
    SearchModule,
  ],
})
export class AppModule {}
