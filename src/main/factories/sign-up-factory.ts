import SignUp from "@/application/services/signup";
import UserRepository from "@/infra/repositories/account-repository";
import PasswordHasher from "@/infra/security/hasher";
import SignUpController from "@/presentation/controllers/sign-up-controller";

export default class SignUpFactory {
  static makeUseCase(): SignUp {
    const userRepository = new UserRepository();
    return new SignUp(userRepository, new PasswordHasher());
  }

  static makeController(): SignUpController {
    return new SignUpController(this.makeUseCase());
  }
}
