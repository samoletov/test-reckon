import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IResult, ISearch, ISubmitResult, ISubtexts } from 'src/interfaces';

export class SearchService {
  constructor(private candidateName: string) {}
  public searchSubtext(text: string, subtext: string): number[] {
    const result = [];
    let foundIndex = null;
    let iSubtext = 0;
    for (let iText = 0; iText < text.length; iText++) {
      if (iSubtext === subtext.length) {
        if (foundIndex !== null) {
          result.push(foundIndex + 1);
        } else {
          foundIndex = null;
          iSubtext = 0;
        }
      }
      if (text[iText] === subtext[iSubtext]) {
        if (iSubtext === 0) {
          foundIndex = iText;
        }
        iSubtext++;
      } else {
        foundIndex = null;
        iSubtext = 0;
      }
    }
    return result;
  }

  public search(text: ISearch, subtexts: ISubtexts): ISubmitResult {
    const submitResult = {
      candidate: this.candidateName,
      text: text.text,
      results: [],
    } as ISubmitResult;

    submitResult.results = subtexts.subTexts.map((subtext) => {
      const searchResult = this.searchSubtext(this.toLowercase(text.text), this.toLowercase(subtext));
      return {
        subtext: subtext,
        result: searchResult.length ? searchResult.join(', ') : '<No Output>',
      } as IResult;
    });

    return submitResult;
  }

  private toLowercase(str: string) {
    let result = '';

    for (let i = 0; i < str.length; i++) {
      const code = str[i].charCodeAt(0);
      if (code >= 65 && code <= 90) {
        const letter = String.fromCharCode(code + 32);
        result += letter;
      } else {
        result += str[i];
      }
    }
    return result;
  }
}

@Injectable()
export class SearchServiceInject extends SearchService {
  constructor(config: ConfigService) {
    super(config.get('appConfig').candidate);
  }
}
