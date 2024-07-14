import GetAccount from "src/application/services/get-account";
import UserRepository from "src/infra/repositories/account-repository";
import GetAccountController from "src/presentation/controllers/get-account-controller";

export default class GetAccountFactory {
  static makeUseCase(): GetAccount {
    const userRepository = new UserRepository();
    return new GetAccount(userRepository);
  }

  static makeController(): GetAccountController {
    return new GetAccountController(this.makeUseCase());
  }
}
