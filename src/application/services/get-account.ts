import ApplicationError from "../common/application-error";
import type UseCase from "../common/use-case";
import type { IAccountRepository } from "../protocols";

type Input = {
  accountId: string;
};

export default class GetAccount implements UseCase<Input, any> {
  constructor(private readonly userRepository: IAccountRepository) {}

  async execute(input: Input): Promise<any> {
    const account = await this.userRepository.get({
      accountId: input.accountId,
    });

    if (!account)
      throw new ApplicationError("Account not found.", "ACCOUNT_NOT_FOUND");

    return account.props;
  }
}
