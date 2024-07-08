import type GetAccount from "src/application/services/get-account";
import Controller from "../common/controller";
import type { HttpRequest } from "../common/http";

export default class GetAccountController extends Controller<any> {
  constructor(private readonly getAccount: GetAccount) {
    super();
  }

  async run(request: HttpRequest<null>): Promise<any> {
    const { accountId } = request.params ?? {};

    const result = await this.getAccount.execute({ accountId });

    return result;
  }
}
