export interface ITokenizer {
  encode(payload: any): Promise<string>;
  decode(token: string): Promise<any>;
}
