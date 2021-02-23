import { DivisibleService } from './service';

describe('Divisible service', () => {
  const service = new DivisibleService();
  it('should check inputs', () => {
    const result = service.check(
      {
        lower: 2,
        upper: 6,
      },
      [
        { divisor: 2, output: '2' },
        { divisor: 3, output: '3' },
        { divisor: 5, output: '5' },
      ],
    );
    expect(result).toHaveLength(5);
    expect(result[0].output).toEqual('2');
    expect(result[1].output).toEqual('3');
    expect(result[2].output).toEqual('2');
    expect(result[3].output).toEqual('5');
    expect(result[4].output).toEqual('23');
  });
});
