import { type User } from "../../domain/user";

export interface IUserRepository {
  save(user: User): Promise<void>;
  get(email: string): Promise<User>;
}
