import ApplicationError from "../common/application-error";
import type UseCase from "../common/use-case";
import type {
  IAccountRepository,
  IPasswordHasher,
  ITokenizer,
} from "../protocols";

export type Input = {
  email: string;
  password: string;
};

export type Output = {
  token: string;
};

export default class Login implements UseCase<Input, Output> {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly comparePassword: IPasswordHasher,
    private readonly tokenizer: ITokenizer,
  ) {}

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.get({ email: input.email });

    if (!account) {
      throw new ApplicationError("Invalid credentials.", "INVALID_CREDENTIALS");
    }

    const isValid = await this.comparePassword.compare(
      input.password,
      account.props.password,
    );

    if (!isValid) {
      throw new ApplicationError("Invalid credentials.", "INVALID_CREDENTIALS");
    }

    const token = await this.tokenizer.encode(account.props.accountId);

    return {
      token,
    };
  }
}
