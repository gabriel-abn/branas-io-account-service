import { decode, sign } from "jsonwebtoken";
import type { ITokenizer } from "src/application/protocols";

export class JWTAdaper implements ITokenizer {
  constructor(private readonly secret: string = "secret") {}

  async encode(payload: any): Promise<string> {
    return sign(payload, this.secret);
  }

  async decode(token: string): Promise<any> {
    return decode(token);
  }
}
