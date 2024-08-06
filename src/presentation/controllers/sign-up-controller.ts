import type SignUp from "@/application/services/signup";
import { validateCpf } from "@/utils/user-data-validation";
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

      return /^[a-zA-ZÀ-ÿ'-]+\s[a-zA-ZÀ-ÿ'-]+(\s[a-zA-ZÀ-ÿ'-]+){0,4}$/.test(
        name,
      );
    },
    {
      message: "Invalid name.",
    },
  ),
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .regex(/(?=.*[a-z])/, "Password must have at least one lowercase letter.")
    .regex(/(?=.*[A-Z])/, "Password must have at least one uppercase letter.")
    .regex(/(?=.*\d)/, "Password must have at least one number.")
    .regex(
      /(?=.*[!@#$%^&*()])/,
      "Password must have at least one special character.",
    )
    .min(8, "Password must have at least 8 characters.")
    .max(24, "Password must have at most 24 characters."),
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
    const { name, email, password, cpf, carPlate, isPassenger, isDriver } =
      request.body;

    const result = await this.signUp.execute({
      name,
      email,
      password,
      cpf,
      isPassenger,
      isDriver,
      carPlate: carPlate ? carPlate : "",
    });

    return result;
  }
}
