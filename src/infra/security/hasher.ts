import { pbkdf2 } from "crypto";
import type { IPasswordHasher } from "src/application/protocols/hasher";

export default class PasswordHasher implements IPasswordHasher {
  private readonly iterations: number;
  private readonly keyLength: number;

  constructor(private readonly secret: string = "secret") {
    this.iterations = 1000;
    this.keyLength = 64;
  }

  async hash(value: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      pbkdf2(
        value,
        this.secret,
        this.iterations,
        this.keyLength,
        "sha512",
        (err, derivedKey) => {
          if (err) reject(err);
          resolve(derivedKey.toString("hex"));
        },
      );
    });
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return hash === (await this.hash(value));
  }
}
