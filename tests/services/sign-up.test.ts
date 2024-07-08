import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { User } from "src/domain/user";
import server from "src/main/app/app";
import request from "supertest";

describe("SignUp", () => {
  let user: User;

  beforeEach(() => {
    user = {
      name: faker.person
        .fullName()
        .replace(/(Ms.|Mr.|Dr.|Miss|Mister|Mrs.)+\s/, "")
        .replace(/(Sr.|Jr.)/, ""),
      email: faker.internet.email(),
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
});
