import { type Account } from "../../domain/account";

export interface IAccountRepository {
  save(account: Account): Promise<void>;
  get(
    filter: Partial<{ email: string; accountId: string }>,
  ): Promise<Account | null>;
}
