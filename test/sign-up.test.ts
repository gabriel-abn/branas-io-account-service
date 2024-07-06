import { faker } from "@faker-js/faker";
import GetAccount from "src/application/services/get-account";
import SignUp from "src/application/services/signup";
import type { User } from "src/domain/user";
import UserRepository from "src/infra/repositories/user-repository";

describe("SignUp", () => {
  beforeAll(async () => {});

  test("Deve registrar um motorista", async () => {
    const user: User = {
      name: "Gabriel Nascimento",
      email: faker.internet.email(),
      accountId: "",
      carPlate: "ABC1234",
      cpf: "97456321558",
      isDriver: true,
      isPassenger: false,
    };

    const userRepository = new UserRepository();
    const signUpService = new SignUp(userRepository);
    const response = await signUpService.execute(user);

    expect(response).toHaveProperty("accountId");

    const getAccountService = new GetAccount(userRepository);
    const account = await getAccountService.execute({
      accountId: response.accountId,
    });

    expect(account).toHaveProperty("accountId");
    expect(account.email).toBe(user.email);
  });
});
