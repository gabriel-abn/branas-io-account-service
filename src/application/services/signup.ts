import crypto from "crypto";
import ApplicationError from "../common/application-error";
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
    const id = crypto.randomUUID();

    const acc = await this.userRepository.get({ email: input.email });

    if (acc)
      throw new ApplicationError("Email already in use.", "EMAIL_IN_USE");

    await this.userRepository.save({ ...input, accountId: id });

    return {
      accountId: id,
    };
  }
}
