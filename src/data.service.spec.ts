import * as submitResult from '../test/data/submitResult.json';
import { DataService } from './data.service';

describe('Data service', () => {
  const service = new DataService({
    baseUrl: 'https://join.reckon.com',
    rangeInfoPath: '/test1/rangeInfo',
    divisorInfoPath: '/test1/divisorInfo',
    textToSearchPath: '/test2/textToSearch',
    subTextsPath: '/test2/subTexts',
    submitResultPath: '/test2/submitResults',
  });

  it('should getRangeInfo', async () => {
    const result = await service.getRangeInfo();
    expect(result).toHaveProperty('lower');
    expect(result).toHaveProperty('upper');
  });

  it('should getDivisorInfo', async () => {
    const result = await service.getDivisorInfo();
    expect(result).toHaveProperty('outputDetails');
  });

  it('should getSubTexts', async () => {
    const result = await service.getSubTexts();
    expect(result).toHaveProperty('subTexts');
  });

  it('should getTextToSearch', async () => {
    const result = await service.getTextToSearch();
    expect(result).toHaveProperty('text');
  });

  it('should submitResults', async () => {
    const result = await service.submitResults(
      Object.assign(submitResult, {
        candidate: 'Johnny Samoletov',
      }),
    );
    expect(result).toHaveProperty('result');
  });
});
