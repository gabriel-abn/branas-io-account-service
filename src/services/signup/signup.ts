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

      const acc = await this.userRepository.get(input.email);

      if (acc) return -4;

      if (!validateName(input.name)) return -3;
      if (!validateEmail(input.email)) return -2;
      if (!validateCpf(input.cpf)) return -1;
      if (!validateCarPlate(input.carPlate) && input.isDriver) return -5;

      await this.userRepository.save({ ...input, accountId: id });

      return {
        accountId: id,
      };
    } catch (error) {
      return -6;
    }
  }
}
