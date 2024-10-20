import accountRouter from "@/main/app/routes";
import express from "express";

const server = express();
server.use(express.json());

const routerV1 = express.Router();
routerV1.use("/account", accountRouter);

server.use("/api/v1", routerV1);
export default server;
