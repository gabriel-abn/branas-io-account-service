import type { IAccountRepository } from "@/application/protocols/account-repository";
import { Account } from "@/domain/account";
import Postgres from "../database/postgres";

export default class UserRepository implements IAccountRepository {
  constructor(private readonly database: Postgres = Postgres.getInstance()) {}

  async save(account: Account): Promise<void> {
    await this.database.query(
      `
        insert into app.account (account_id, name, email, password, cpf, car_plate, is_passenger, is_driver)
        values ($1, $2, $3, $4, $5, $6, $7, $8);
      `,
      [
        account.props.accountId,
        account.props.name,
        account.props.email,
        account.props.password,
        account.props.cpf,
        account.props.carPlate,
        !!account.props.isPassenger,
        !!account.props.isDriver,
      ],
    );
  }

  async get(
    filter: Partial<{ email: string; accountId: string }>,
  ): Promise<Account | null> {
    try {
      const { email, accountId } = filter;
      let user: any;

      if (email) {
        [user] = await this.database.query(
          `
        select * from app.account where email = $1;
        `,
          [email],
        );
      } else if (accountId) {
        [user] = await this.database.query(
          `
        select *
        from app.account 
        where account_id = $1;
      `,
          [accountId],
        );
      }

      if (!user) return null;

      return Account.restore({
        accountId: user.account_id,
        name: user.name,
        email: user.email,
        password: user.password,
        cpf: user.cpf,
        carPlate: user.car_plate,
        isPassenger: user.is_passenger,
        isDriver: user.is_driver,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
