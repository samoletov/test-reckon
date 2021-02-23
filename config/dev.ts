import { IDataServiceConfig } from 'src/data.service';

export default (): any => ({
  clientConfig: {
    baseUrl: 'https://join.reckon.com',
    rangeInfoPath: '/test1/rangeInfo',
    divisorInfoPath: '/test1/divisorInfo',
    textToSearchPath: '/test2/textToSearch',
    subTextsPath: '/test2/subTexts',
    submitResultPath: '/test2/submitResults',
  } as IDataServiceConfig,
  appConfig: {
    candidate: 'Johnny Samoletov',
  },
});
