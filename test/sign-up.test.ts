import type { User } from "src/domain/user";
import Postgres from "src/infra/database/postgres";
import UserRepository from "src/infra/repositories/user-repository";
import SignUp from "src/services/signup/signup";

describe("SignUp", () => {
  afterAll(async () => {
    const database = Postgres.getInstance();

    await database.query("delete from cccat17.account;", []);
    await database.end();
  });

  test("Deve registrar um motorista", async function () {
    const user: User = {
      name: "Gabriel Nascimento",
      email: "gabriel.ab.nascimento@gmail.com",
      accountId: "",
      carPlate: "ABC1234",
      cpf: "97456321558",
      isDriver: true,
      isPassenger: false,
    };

    const service = new SignUp(new UserRepository());

    const response = await service.execute(user);

    console.log(response);
    expect(response).toHaveProperty("accountId");
  });
});
