import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import config from '../../config/dev';
import * as divisorInfo from '../../test/data/divisorInfo.json';
import * as outputData from '../../test/data/output.json';
import * as rangeInfo from '../../test/data/rangeInfo.json';
import { DataServiceInject } from '../data.service';
import { DivisibleController } from './controller';
import { DivisibleService } from './service';

describe('DivisibleController', () => {
  let appController: DivisibleController;
  let dataService: DataServiceInject;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      controllers: [DivisibleController],
      providers: [DataServiceInject, DivisibleService],
    }).compile();
    appController = app.get<DivisibleController>(DivisibleController);
    dataService = app.get<DataServiceInject>(DataServiceInject);
  });

  describe('root', () => {
    it('should show divisible output with initial test data', async () => {
      jest.spyOn(dataService, 'getRangeInfo').mockImplementation(async () => {
        return rangeInfo;
      });
      jest.spyOn(dataService, 'getDivisorInfo').mockImplementation(async () => {
        return divisorInfo;
      });
      const result = await appController.divisible();
      expect(result).toEqual(outputData.output);
    });
  });
});
