import type Login from "src/application/services/login";
import { z } from "zod";
import Controller from "../common/controller";
import type { HttpRequest } from "../common/http";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof schema>;

export default class LoginController extends Controller<LoginRequest> {
  constructor(private readonly login: Login) {
    super(schema);
  }

  async run(request: HttpRequest<LoginRequest>): Promise<any> {
    const { email, password } = request.body;

    const result = await this.login.execute({ email, password });

    return result;
  }
}
