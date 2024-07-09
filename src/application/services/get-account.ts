import ApplicationError from "../common/application-error";
import type { IUserRepository } from "../protocols/user-repository";

type Input = {
  accountId: string;
};

export default class GetAccount {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: Input): Promise<any> {
    const acc = await this.userRepository.get({ accountId: input.accountId });

    if (!acc)
      throw new ApplicationError("Account not found.", "ACCOUNT_NOT_FOUND");

    return acc;
  }
}
