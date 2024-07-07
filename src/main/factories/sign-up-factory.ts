import SignUp from "src/application/services/signup";
import UserRepository from "src/infra/repositories/user-repository";

export default class SignUpFactory {
  static makeUseCase(): SignUp {
    const userRepository = new UserRepository();
    return new SignUp(userRepository);
  }
}
