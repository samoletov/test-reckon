import * as submitResult from '../../test/data/submitResult.json';
import { SearchService } from './service';

describe('Search service', () => {
  const service = new SearchService('<your name>');
  it('should search substring', () => {
    const result = service.searchSubtext('Peter told Peter Pet', 'Peter');
    expect(result).toStrictEqual([1, 12]);

    const result2 = service.searchSubtext('Peter told Peter Pet', 'Peter2');
    expect(result2).toStrictEqual([]);
  });
  it('should check inputs', () => {
    const result = service.search(
      {
        text:
          'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!',
      },
      {
        subTexts: ['Peter', 'peter', 'Pick', 'Pi', 'Z'],
      },
    );
    expect(result).toStrictEqual(submitResult);
  });
});
