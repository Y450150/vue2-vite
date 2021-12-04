import path from "path";
import express from "express";
import router from "./router";
import bodyParser from "body-parser";
import { MiddleWaresRouter } from "./router/page";
import { CORS } from "./middleware/cors";
import { initServerRender } from "./render/render-server";

const server = express();

initServerRender(server);

const resolve = (file) => path.resolve(process.cwd(), file);
const serve = (path, cache) => {
  return express.static(resolve(path), {
    // maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    maxAge: 0,
  });
};

server.use(CORS);
//解析application/json
server.use(bodyParser.json());

//解析application/x-www-form-urlencoded
server.use(bodyParser.urlencoded());

server.use("/dist", serve("./dist", true)); // 部署dist目录
server.use("/api", router); // 部署路由

MiddleWaresRouter(server); // 放在后面，让前面的先命中

export { server };

