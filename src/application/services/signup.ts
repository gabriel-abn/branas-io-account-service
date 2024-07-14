import crypto from "crypto";
import { Account } from "src/domain/account";
import ApplicationError from "../common/application-error";
import type UseCase from "../common/use-case";
import type { IAccountRepository } from "../protocols/account-repository";
import type IPasswordHasher from "../protocols/hasher";

type Input = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};

type Output = {
  accountId: string;
};

export default class SignUp implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: IAccountRepository,
    private readonly hasher: IPasswordHasher,
  ) {}

  async execute(input: Input): Promise<Output> {
    const id = crypto.randomUUID();

    const exists = await this.userRepository.get({ email: input.email });

    if (exists)
      throw new ApplicationError("Email already in use.", "EMAIL_IN_USE");

    const hashedPassword = await this.hasher.hash(input.password);

    const account = Account.create({
      ...input,
      password: hashedPassword,
      accountId: id,
    });

    await this.userRepository.save(account);

    return {
      accountId: id,
    };
  }
}
