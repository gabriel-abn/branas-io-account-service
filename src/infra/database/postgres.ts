import pgp from "pg-promise";

export default class Postgres {
  private connection: pgp.IDatabase<any>;
  private static instance: Postgres;

  private constructor() {
    const databaseUrl = process.env.DATABASE_URL ? 
      process.env.DATABASE_URL : 
      "postgres://postgres:123456@localhost:5432/app";
    this.connection = pgp()(databaseUrl);
  }

  async query(sql: string, values: any[]) {
    return this.connection.query(sql, values);
  }

  async end() {
    await this.connection.$pool.end();
  }

  static getInstance() {
    if (!Postgres.instance) {
      Postgres.instance = new Postgres();
    }

    return Postgres.instance;
  }
}
