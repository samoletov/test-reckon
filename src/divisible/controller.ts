import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DataServiceInject } from '../data.service';
import { DivisibleService } from './service';

@Controller()
@ApiTags('divisible')
@UseInterceptors(ClassSerializerInterceptor)
export class DivisibleController {
  constructor(private readonly dataService: DataServiceInject, private readonly divisibleService: DivisibleService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Check divisible numbers',
  })
  async divisible(): Promise<string> {
    const rangeInfo = await this.dataService.getRangeInfo();
    const divisorInfo = await this.dataService.getDivisorInfo();
    const divisorCheck = this.divisibleService.check(rangeInfo, divisorInfo.outputDetails);
    return divisorCheck
      .map((divisorCheck) => {
        return divisorCheck.number + ':' + (divisorCheck.output ? ' ' + divisorCheck.output : '');
      })
      .join(`\n`);
  }
}
