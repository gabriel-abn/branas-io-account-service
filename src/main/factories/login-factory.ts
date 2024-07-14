import Login from "src/application/services/login";
import UserRepository from "src/infra/repositories/account-repository";
import PasswordHasher from "src/infra/security/hasher";
import { JWTAdaper } from "src/infra/security/tokenizer";
import LoginController from "src/presentation/controllers/login-controller";

export default class LoginFactory {
  static makeUseCase(): Login {
    const userRepository = new UserRepository();
    return new Login(userRepository, new PasswordHasher(), new JWTAdaper());
  }

  static makeController(): LoginController {
    return new LoginController(this.makeUseCase());
  }
}
