import type { IUserRepository } from "src/application/protocols/user-repository";
import type { User } from "src/domain/user";
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

  async get(
    filter: Partial<{ email: string; accountId: string }>,
  ): Promise<User | null> {
    try {
      const { email, accountId } = filter;
      let user: any;

      if (email) {
        [user] = await this.database.query(
          `
        select * from cccat17.account where email = $1;
        `,
          [email],
        );
      } else if (accountId) {
        [user] = await this.database.query(
          `
        select *
        from cccat17.account 
        where account_id = $1;
      `,
          [accountId],
        );
      }

      if (!user) return null;

      return {
        accountId: user.account_id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        carPlate: user.car_plate,
        isPassenger: user.is_passenger,
        isDriver: user.is_driver,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
