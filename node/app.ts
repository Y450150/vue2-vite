import express from "express";
import router from "./router";
import { MiddleWaresRouter } from "./router/page";

const server = express();

const serve = (path) => {
  return express.static(path.resolve(__dirname, path), {
    maxAge: 0,
  });
};
server.use("/", MiddleWaresRouter());
server.use("/dist", serve("./dist")); // 部署dist目录
server.use("/api", router); // 部署路由

server.listen(8080, () => {
  console.log("server start");
});

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
