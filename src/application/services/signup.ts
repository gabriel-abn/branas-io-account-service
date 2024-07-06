import crypto from "crypto";
import validateCarPlate from "src/utils/validateCarPlate";
import { validateCpf } from "src/utils/validateCpf";
import validateEmail from "src/utils/validateEmail";
import validateName from "src/utils/validateName";
import type { IUserRepository } from "../protocols/user-repository";

type Input = {
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};

export default class SignUp {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: Input): Promise<any> {
    try {
      const id = crypto.randomUUID();

      const acc = await this.userRepository.get({ email: input.email });

      if (acc) return "Email already in use.";

      if (!validateName(input.name)) return "Invalid name.";
      if (!validateEmail(input.email)) return "Invalid email.";
      if (!validateCpf(input.cpf)) return "Invalid CPF.";
      if (!validateCarPlate(input.carPlate) && input.isDriver)
        return "Invalid car plate.";

      await this.userRepository.save({ ...input, accountId: id });

      return {
        accountId: id,
      };
    } catch (error: any) {
      console.log(error);

      return -6;
    }
  }
}
