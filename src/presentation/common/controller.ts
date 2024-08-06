import ApplicationError from "@/application/common/application-error";
import type { HttpRequest, HttpResponse } from "@/presentation/common/http";
import type { SafeParseError, z } from "zod";

export default abstract class Controller<T> {
  abstract run(request: HttpRequest<T>): Promise<any>;

  constructor(private readonly schema?: z.ZodSchema) {}

  async handle(request: HttpRequest<T>): Promise<HttpResponse> {
    try {
      if (this.schema) {
        const validatedRequest = this.schema.safeParse(request.body);

        if (!validatedRequest.success) {
          return {
            status: 400,
            success: false,
            body: {
              error: "INVALID_MISSING_PARAMS",
              message: formatZodError(validatedRequest),
            },
          };
        }
      }

      const response = await this.run(request);

      if (
        ["body", "status", "success"].every((field) =>
          response.hasOwnProperty(field),
        )
      ) {
        return response;
      }

      return {
        body: response,
        status: 200,
        success: true,
      };
    } catch (error: any) {
      if (error instanceof ApplicationError) {
        return {
          body: {
            error: error.name,
            message: error.message,
          },
          success: false,
          status: 400,
        };
      }

      return {
        body: error.message,
        status: 500,
        success: false,
      };
    }
  }
}

const formatZodError = (error: SafeParseError<any>) => {
  const formattedError = error.error.errors.map((err) => {
    return {
      field: err.path.join("."),
      message: err.message,
    };
  });

  return formattedError;
};
