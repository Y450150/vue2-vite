import path from "path";
import express from "express";
import router from "./router";
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
server.use("/dist", serve("./dist", true)); // 部署dist目录
server.use("/api", router); // 部署路由

MiddleWaresRouter(server); // 放在这里，让前面的先命中
export { server };

// var ws = require("nodejs-websocket");
// const mockPath = path.resolve(__dirname, "./mock/chat.json");
// const clientList = [];

// ws.createServer(function (conn) {
//   console.log("New connection");
//   clientList.push(conn);
//   conn.on("text", function (str) {
//     var data = JSON.parse(fs.readFileSync(mockPath, "utf-8"));
//     data.push(JSON.parse(str));
//     data = JSON.stringify(data);
//     fs.writeFileSync(mockPath, data);
//     clientList.forEach((conn) => conn.send(data));
//   });
//   conn.on("close", function (code, reason) {
//     console.log("Connection closed");
//   });
// }).listen(8888);
