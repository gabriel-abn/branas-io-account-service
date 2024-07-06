import type { IUserRepository } from "../protocols/user-repository";

type Input = {
  accountId: string;
};

export default class GetAccount {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: Input): Promise<any> {
    try {
      const acc = await this.userRepository.get({ accountId: input.accountId });

      if (!acc) return "Account not found.";

      return acc;
    } catch (error: any) {
      console.log(error);
      return -2;
    }
  }
}
