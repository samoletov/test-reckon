import { Injectable } from '@nestjs/common';

import { IDivisor, IRangeInfo } from '../interfaces';

export interface IDivisorCheck {
  number: number;
  output: string;
}

@Injectable()
export class DivisibleService {
  private getDivisorsOutput(number: number, divisors: IDivisor[]): string[] {
    const result = [];
    divisors.forEach((divisor) => {
      if (number % divisor.divisor === 0) {
        result.push(divisor.output);
      }
    });
    return result;
  }

  public check(range: IRangeInfo, divisors: IDivisor[]): IDivisorCheck[] {
    const result = [];
    for (let number = range.lower; number <= range.upper; number++) {
      result.push({ number: number, output: this.getDivisorsOutput(number, divisors).join('') });
    }
    return result;
  }
}
