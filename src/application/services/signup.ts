import crypto from "crypto";
import validateName from "src/utils/validate-name";
import validateCarPlate from "src/utils/validateCarPlate";
import { validateCpf } from "src/utils/validateCpf";
import validateEmail from "src/utils/validateEmail";
import type { IUserRepository } from "../protocols/user-repository";

type Input = {
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};

type Output = {
  accountId: string;
};

export default class SignUp {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: Input): Promise<Output> {
    try {
      const id = crypto.randomUUID();

      const acc = await this.userRepository.get({ email: input.email });

      if (acc) throw new Error("Email already in use.");

      const validation = this.validateData({ ...input });
      if (validation) throw new Error(validation);

      await this.userRepository.save({ ...input, accountId: id });

      return {
        accountId: id,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private validateData(input: {
    name: string;
    email: string;
    cpf: string;
    carPlate: string;
  }) {
    if (!validateName(input.name)) return "Invalid name.";
    if (!validateEmail(input.email)) return "Invalid email.";
    if (!validateCpf(input.cpf)) return "Invalid CPF.";
    if (!validateCarPlate(input.carPlate)) return "Invalid car plate.";
  }
}
