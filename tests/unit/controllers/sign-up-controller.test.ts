import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { AccountProps } from "src/domain/account";
import SignUpFactory from "src/main/factories/sign-up-factory";

describe("SignUpController", () => {
  const signUp = SignUpFactory.makeController();

  let user: AccountProps;

  beforeEach(() => {
    user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      accountId: "",
      carPlate: new RandExp(/[A-Z]{3}\d{4}/).gen(),
      cpf: faker.helpers.arrayElement([
        "974.563.215-58",
        "714.287.938-60",
        "877.482.488-00",
      ]),
      isDriver: true,
      isPassenger: false,
    };
  });

  it("Deve receber erro se CPF for inválido", async () => {
    const { body, status } = await signUp.handle({
      body: { ...user, cpf: "12345678901" },
    });

    expect(status).toBe(400);
    expect(body).toHaveProperty("error", "INVALID_MISSING_PARAMS");
    expect(body.message[0]).toHaveProperty("message", "Invalid CPF.");
  });

  it("Deve receber erro se placa de carro for inválida", async () => {
    const { body, status } = await signUp.handle({
      body: { ...user, carPlate: "123456" },
    });

    expect(body).toHaveProperty("error", "INVALID_MISSING_PARAMS");
    expect(body.message[0]).toHaveProperty("message", "Invalid car plate.");
    expect(status).toBe(400);
  });

  it("Deve receber erro se email for inválido", async () => {
    const { body, status } = await signUp.handle({
      body: { ...user, email: "invalid-email" },
    });

    expect(body).toHaveProperty("error", "INVALID_MISSING_PARAMS");
    expect(body.message[0]).toHaveProperty("message", "Invalid email.");
    expect(status).toBe(400);
  });

  it("Deve receber erro se nome for inválido", async () => {
    const { body, status } = await signUp.handle({
      body: { ...user, name: "gabriel 123" },
    });

    expect(body).toHaveProperty("error", "INVALID_MISSING_PARAMS");
    expect(body.message[0]).toHaveProperty("message", "Invalid name.");
    expect(status).toBe(400);
  });
});
