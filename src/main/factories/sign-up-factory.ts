import SignUp from "src/application/services/signup";
import UserRepository from "src/infra/repositories/account-repository";
import SignUpController from "src/presentation/controllers/sign-up-controller";

export default class SignUpFactory {
  static makeUseCase(): SignUp {
    const userRepository = new UserRepository();
    return new SignUp(userRepository);
  }

  static makeController(): SignUpController {
    return new SignUpController(this.makeUseCase());
  }
}
