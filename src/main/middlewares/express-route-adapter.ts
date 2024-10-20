import type Controller from "@/presentation/common/controller";
import type { HttpRequest } from "@/presentation/common/http";
import type { Request, Response } from "express";

const expressRouteAdapter = (controller: Controller<any>) => {
  return async (request: Request, response: Response) => {
    try {
      const serializedRequest: HttpRequest<any> = {
        body: request.body,
        params: request.params,
        query: request.query,
      };

      const result = await controller.handle(serializedRequest);

      return response.status(result.status).json(result.body);
    } catch (error: any) {
      return response
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  };
};

export default expressRouteAdapter;
