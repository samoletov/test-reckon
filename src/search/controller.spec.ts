import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import config from '../../config/dev';
import * as submitResult from '../../test/data/submitResult.json';
import * as subTexts from '../../test/data/subTexts.json';
import * as textToSearch from '../../test/data/textToSearch.json';
import { DataServiceInject } from '../data.service';
import { SearchController } from './controller';
import { SearchServiceInject } from './service';

describe('SearchController', () => {
  let controller: SearchController;
  let dataService: DataServiceInject;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      controllers: [SearchController],
      providers: [DataServiceInject, SearchServiceInject],
    }).compile();
    controller = app.get<SearchController>(SearchController);
    dataService = app.get<DataServiceInject>(DataServiceInject);
  });

  describe('root', () => {
    it('should show divisible output with initial test data', async () => {
      jest.spyOn(dataService, 'getTextToSearch').mockImplementation(async () => {
        return textToSearch;
      });
      jest.spyOn(dataService, 'getSubTexts').mockImplementation(async () => {
        return subTexts;
      });
      jest.spyOn(dataService, 'submitResults').mockImplementation(async () => {
        return {};
      });
      const result = await controller.search();
      expect(result).toStrictEqual(
        Object.assign(submitResult, {
          candidate: 'Johnny Samoletov',
        }),
      );
    });
  });
});
