import type { IUserRepository } from "src/services/protocols/user-repository";
import type { User } from "../../domain/user";
import Postgres from "../database/postgres";

export default class UserRepository implements IUserRepository {
  constructor(private readonly database: Postgres = Postgres.getInstance()) {}

  async save(user: User): Promise<void> {
    await this.database.query(
      `
        insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver)
        values ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        user.accountId,
        user.name,
        user.email,
        user.cpf,
        user.carPlate,
        !!user.isPassenger,
        !!user.isDriver,
      ],
    );
  }

  async get(email: string): Promise<User> {
    const [user] = await this.database.query(
      `
        select * from cccat17.account where email = $1
      `,
      [email],
    );

    return user;
  }
}
