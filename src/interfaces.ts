export interface IRangeInfo {
  lower: number;
  upper: number;
}
export interface IDivisor {
  divisor: number;
  output: string;
}
export interface IDivisorInfo {
  outputDetails: IDivisor[];
}

export interface ISearch {
  text: string;
}

export interface ISubtexts {
  subTexts: string[];
}

export interface ISubmitResult {
  candidate: string;
  text: string;
  results: IResult[];
}

export interface IResult {
  subtext: string;
  result: string;
}
