import GetAccount from "@/application/services/get-account";
import UserRepository from "@/infra/repositories/account-repository";
import GetAccountController from "@/presentation/controllers/get-account-controller";

export default class GetAccountFactory {
  static makeUseCase(): GetAccount {
    const userRepository = new UserRepository();
    return new GetAccount(userRepository);
  }

  static makeController(): GetAccountController {
    return new GetAccountController(this.makeUseCase());
  }
}
