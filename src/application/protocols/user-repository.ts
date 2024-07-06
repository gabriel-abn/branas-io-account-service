import { type User } from "../../domain/user";

export interface IUserRepository {
  save(user: User): Promise<void>;
  get(
    filter: Partial<{ email: string; accountId: string }>,
  ): Promise<User | null>;
}
