import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import server from "src/main/app/app";
import type { SignUpRequest } from "src/presentation/controllers/sign-up-controller";
import request from "supertest";

describe("Login", () => {
  let user: SignUpRequest;

  beforeEach(() => {
    user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "Password123!@",
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

  it("should login a user", async () => {
    await request(server)
      .post("/api/v1/account/sign-up")
      .send({ ...user });

    const response = await request(server)
      .post("/api/v1/account/login")
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
