import express from "express";
import GetAccountFactory from "../factories/get-account-factory";
import SignUpFactory from "../factories/sign-up-factory";
import expressRouteAdapter from "../middlewares/express-route-adapter";

const accountRouter = express.Router();

accountRouter.post(
  "/sign-up",
  expressRouteAdapter(SignUpFactory.makeController()),
);

accountRouter.get(
  "/:accountId",
  expressRouteAdapter(GetAccountFactory.makeController()),
);

export default accountRouter;
