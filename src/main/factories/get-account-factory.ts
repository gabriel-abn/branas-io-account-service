import GetAccount from "src/application/services/get-account";
import UserRepository from "src/infra/repositories/user-repository";

export default class GetAccountFactory {
  static makeUseCase(): GetAccount {
    const userRepository = new UserRepository();
    return new GetAccount(userRepository);
  }
}
