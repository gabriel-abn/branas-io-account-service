import GetAccountFactory from "@/main/factories/get-account-factory";
import SignUpFactory from "@/main/factories/sign-up-factory";
import type { HttpRequest } from "@/presentation/common/http";
import type { SignUpRequest } from "@/presentation/controllers/sign-up-controller";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";

describe("GetAccountController", () => {
  const signUp = SignUpFactory.makeController();
  const getAccount = GetAccountFactory.makeController();
  let request: HttpRequest<SignUpRequest>;

  beforeEach(() => {
    request = {
      body: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "Password123!@",
        carPlate: new RandExp(/[A-Z]{3}\d{4}/).gen(),
        cpf: "97456321558",
        isDriver: true,
        isPassenger: false,
      },
    };
  });

  it("Deve retornar um usuário", async () => {
    const response = await signUp.handle(request);

    const account = await getAccount.handle({
      body: {},
      params: {
        accountId: response.body.accountId,
      },
    });

    expect(account.body.email).toBe(request.body.email);
  });
});
