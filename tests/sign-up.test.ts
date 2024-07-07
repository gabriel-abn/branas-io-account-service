import { faker } from "@faker-js/faker";
import GetAccount from "src/application/services/get-account";
import SignUp from "src/application/services/signup";
import type { User } from "src/domain/user";
import UserRepository from "src/infra/repositories/user-repository";

describe("SignUp", () => {
  beforeAll(async () => {});

  it("Deve registrar um motorista", async () => {
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

  it("Deve receber erro se CPF for inválido", () => {
    const user: User = {
      name: "Gabriel Nascimento",
      email: faker.internet.email(),
      accountId: "",
      carPlate: "ABC1234",
      cpf: "123456789",
      isDriver: true,
      isPassenger: false,
    };

    const userRepository = new UserRepository();
    const signUpService = new SignUp(userRepository);

    expect(async () => await signUpService.execute(user)).rejects.toThrow(
      "Invalid CPF.",
    );
  });

  it("Deve receber erro se placa de carro for inválida", () => {
    const user: User = {
      name: "Gabriel Nascimento",
      email: faker.internet.email(),
      accountId: "",
      carPlate: "ABC123",
      cpf: "97456321558",
      isDriver: true,
      isPassenger: false,
    };

    const userRepository = new UserRepository();
    const signUpService = new SignUp(userRepository);

    expect(async () => await signUpService.execute(user)).rejects.toThrow(
      "Invalid car plate.",
    );
  });

  it("Deve receber erro se email for inválido", async () => {
    const user: User = {
      name: "Gabriel Nascimento",
      email: "gabriel",
      accountId: "",
      carPlate: "ABC1234",
      cpf: "97456321558",
      isDriver: true,
      isPassenger: false,
    };

    const userRepository = new UserRepository();
    const signUpService = new SignUp(userRepository);

    await expect(signUpService.execute(user)).rejects.toThrow("Invalid email.");
  });

  it("Deve receber erro se nome for inválido", async () => {
    const user: User = {
      name: "Gabriel Nascimento 123",
      email: faker.internet.email(),
      accountId: "",
      carPlate: "ABC1234",
      cpf: "97456321558",
      isDriver: true,
      isPassenger: false,
    };

    const userRepository = new UserRepository();
    const signUpService = new SignUp(userRepository);

    await expect(signUpService.execute(user)).rejects.toThrow("Invalid name.");
  });
});
