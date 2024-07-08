import type SignUp from "src/application/services/signup";
import { validateCpf } from "src/utils/user-data-validation";
import z from "zod";
import Controller from "../common/controller";
import type { HttpRequest } from "../common/http";

const schema = z.object({
  name: z.custom<string>(
    (value) => {
      if (typeof value !== "string") return false;

      const name = value
        .replace(/(Ms. |Mr. |Dr. |Miss |Mister |Mrs. )/, "")
        .replace(/( Sr.| Jr.)/, "");

      if (/^[a-zA-ZÀ-ÿ'-]+\s[a-zA-ZÀ-ÿ'-]+(\s[a-zA-ZÀ-ÿ'-]+){0,4}$/.test(name))
        return true;

      console.log(name);
      console.log(value);
      return false;
    },
    {
      message: "Invalid name.",
    },
  ),
  email: z.string().email("Invalid email."),
  cpf: z.custom<string>(
    (value) => typeof value === "string" && validateCpf(value),
    {
      message: "Invalid CPF.",
    },
  ),
  carPlate: z
    .string()
    .regex(/[A-Z]{3}[0-9]{4}/, {
      message: "Invalid car plate.",
    })
    .optional(),
  isPassenger: z.boolean(),
  isDriver: z.boolean(),
});

export type SignUpRequest = z.infer<typeof schema>;

export default class SignUpController extends Controller<SignUpRequest> {
  constructor(private readonly signUp: SignUp) {
    super(schema);
  }

  async run(request: HttpRequest<SignUpRequest>): Promise<any> {
    const { name, email, cpf, carPlate, isPassenger, isDriver } = request.body;

    const result = await this.signUp.execute({
      name,
      email,
      cpf,
      isPassenger,
      isDriver,
      carPlate: carPlate ? carPlate : "",
    });

    return result;
  }
}
