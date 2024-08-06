import Login from "@/application/services/login";
import UserRepository from "@/infra/repositories/account-repository";
import PasswordHasher from "@/infra/security/hasher";
import { JWTAdaper } from "@/infra/security/tokenizer";
import LoginController from "@/presentation/controllers/login-controller";

export default class LoginFactory {
  static makeUseCase(): Login {
    const userRepository = new UserRepository();
    return new Login(userRepository, new PasswordHasher(), new JWTAdaper());
  }

  static makeController(): LoginController {
    return new LoginController(this.makeUseCase());
  }
}
