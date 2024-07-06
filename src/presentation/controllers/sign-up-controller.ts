import type SignUp from "src/application/services/signup";
import z from "zod";
import type { HttpRequest } from "../common/http";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().length(11),
  carPlate: z.string().length(7),
  isPassenger: z.boolean(),
  isDriver: z.boolean(),
});

export type SignUpRequest = z.infer<typeof schema>;

export default class SignUpController {
  constructor(private readonly signUp: SignUp) {}

  async handle(request: HttpRequest<SignUpRequest>): Promise<void> {
    try {
      const { name, email, cpf, carPlate, isPassenger, isDriver } =
        request.body;

      const result = await this.signUp.execute({
        name,
        email,
        cpf,
        carPlate,
        isPassenger,
        isDriver,
      });

      if (result === -1) {
        res.status(400).json({ error: "Invalid CPF" });
      } else if (result === -2) {
        res.status(400).json({ error: "Invalid email" });
      } else if (result === -3) {
        res.status(400).json({ error: "Invalid name" });
      } else if (result === -4) {
        res.status(400).json({ error: "Email already in use" });
      } else if (result === -5) {
        res.status(400).json({ error: "Invalid car plate" });
      } else if (result === -6) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
