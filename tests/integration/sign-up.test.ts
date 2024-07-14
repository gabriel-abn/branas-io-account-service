import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import server from "src/main/app/app";
import request from "supertest";

describe("SignUp", () => {
  let user: {
    name: string;
    email: string;
    password: string;
    accountId: string;
    carPlate: string;
    cpf: string;
    isDriver: boolean;
    isPassenger: boolean;
  };

  beforeEach(() => {
    user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "Password123!@",
      accountId: "",
      carPlate: new RandExp(/[A-Z]{3}\d{4}/).gen(),
      cpf: faker.helpers.arrayElement([
        "97456321558",
        "71428793860",
        "87748248800",
      ]),
      isDriver: true,
      isPassenger: false,
    };
  });

  it("Deve registrar um motorista", async () => {
    const signUpResponse = await request(server)
      .post("/api/v1/account/sign-up")
      .send({ ...user });

    expect(signUpResponse.body).toHaveProperty("accountId");

    const getAccountResponse = await request(server).get(
      `/api/v1/account/${signUpResponse.body.accountId}`,
    );

    expect(getAccountResponse.body).toHaveProperty("accountId");
    expect(getAccountResponse.body.email).toBe(user.email);
  });

  it("Deve registrar um passageiro", async () => {
    user.isDriver = false;
    user.isPassenger = true;

    const signUpResponse = await request(server)
      .post("/api/v1/account/sign-up")
      .send({ ...user });

    expect(signUpResponse.body).toHaveProperty("accountId");

    const getAccountResponse = await request(server).get(
      `/api/v1/account/${signUpResponse.body.accountId}`,
    );

    expect(getAccountResponse.body).toHaveProperty("accountId");
    expect(getAccountResponse.body.email).toBe(user.email);
    expect(getAccountResponse.body.isDriver).toBe(false);
    expect(getAccountResponse.body.isPassenger).toBe(true);
  });

  it("Deve retornar 400 se o email já estiver em uso", async () => {
    await request(server)
      .post("/api/v1/account/sign-up")
      .send({ ...user });

    const signUpResponse = await request(server)
      .post("/api/v1/account/sign-up")
      .send({ ...user });

    expect(signUpResponse.status).toBe(400);
    expect(signUpResponse.body).toHaveProperty("error", "EMAIL_IN_USE");
  });

  it("Deve retornar 400 se o CPF já estiver em uso");
});
