import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DataServiceInject } from '../data.service';
import { SearchServiceInject } from './service';

@Controller()
@ApiTags('search')
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {
  constructor(private readonly dataService: DataServiceInject, private readonly searchService: SearchServiceInject) {}

  @Get('/search')
  @ApiOperation({
    summary: 'Search substrings in text and send it to results endpoint',
  })
  async search(): Promise<any> {
    const text = await this.dataService.getTextToSearch();
    const subtexts = await this.dataService.getSubTexts();
    const results = this.searchService.search(text, subtexts);
    const submitResult = await this.dataService.submitResults(results);
    return Object.assign(results, submitResult);
  }
}
