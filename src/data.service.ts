import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

import { IDivisorInfo, IRangeInfo, ISearch, ISubmitResult, ISubtexts } from './interfaces';

export interface IDataServiceConfig {
  baseUrl: string;
  rangeInfoPath: string;
  divisorInfoPath: string;
  textToSearchPath: string;
  subTextsPath: string;
  submitResultPath: string;
}

export class DataService {
  private client: AxiosInstance;

  constructor(private config: IDataServiceConfig) {
    this.client = axios.create({ baseURL: config.baseUrl });
    this.enableResponseInterceptor();
  }

  private enableResponseInterceptor(): void {
    // Add a response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          response: { status, data, statusMessage },
          config,
        } = error;
        return this.client(config);
      },
    );
  }

  async getRangeInfo(): Promise<IRangeInfo> {
    const { data } = await this.client.get(this.config.rangeInfoPath);
    return data as IRangeInfo;
  }

  async getDivisorInfo(): Promise<IDivisorInfo> {
    const { data } = await this.client.get(this.config.divisorInfoPath);
    return data as IDivisorInfo;
  }

  async getTextToSearch(): Promise<ISearch> {
    const { data } = await this.client.get(this.config.textToSearchPath);
    return data as ISearch;
  }

  async getSubTexts(): Promise<ISubtexts> {
    const { data } = await this.client.get(this.config.subTextsPath);
    return data as ISubtexts;
  }

  async submitResults(results: ISubmitResult): Promise<any> {
    const { data } = await this.client.post(this.config.submitResultPath, results);
    return data;
  }
}

@Injectable()
export class DataServiceInject extends DataService {
  constructor(config: ConfigService) {
    super(config.get('clientConfig'));
  }
}
