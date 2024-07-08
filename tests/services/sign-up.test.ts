import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { User } from "src/domain/user";
import GetAccountFactory from "src/main/factories/get-account-factory";
import SignUpFactory from "src/main/factories/sign-up-factory";

describe("SignUp", () => {
  const signUp = SignUpFactory.makeUseCase();
  const getAccount = GetAccountFactory.makeUseCase();

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
    const response = await signUp.execute(user);

    expect(response).toHaveProperty("accountId");

    const account = await getAccount.execute({
      accountId: response.accountId,
    });

    expect(account).toHaveProperty("accountId");
    expect(account.email).toBe(user.email);
  });
});
