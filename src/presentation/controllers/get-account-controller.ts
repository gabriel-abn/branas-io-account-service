import type GetAccount from "@/application/services/get-account";
import Controller from "../common/controller";
import type { HttpRequest } from "../common/http";

export default class GetAccountController extends Controller<any> {
  constructor(private readonly getAccount: GetAccount) {
    super();
  }

  async run(request: HttpRequest<null>): Promise<any> {
    try {
      const { accountId } = request.params ?? {};

      const result = await this.getAccount.execute({ accountId });

      return result;
    } catch (error: any) {
      if (error.name == "ACCOUNT_NOT_FOUND") {
        return {
          status: 404,
          body: {
            error: "ACCOUNT_NOT_FOUND",
            message: "Account not found.",
          },
          success: false,
        };
      }

      throw error;
    }
  }
}
