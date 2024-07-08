import crypto from "crypto";
import type { IUserRepository } from "../protocols/user-repository";

type Input = {
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};

type Output = {
  accountId: string;
};

export default class SignUp {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: Input): Promise<Output> {
    try {
      const id = crypto.randomUUID();

      const acc = await this.userRepository.get({ email: input.email });

      if (acc) throw new Error("Email already in use.");

      await this.userRepository.save({ ...input, accountId: id });

      return {
        accountId: id,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
