import path from "path";
import fs from "fs";
import ws from "nodejs-websocket"

const mockPath = path.resolve(__dirname, "./mock/chat.json");
const clientList = [];
ws.createServer(function (conn) {
  console.log("New connection");
  clientList.push(conn);
  conn.on("text", function (str) {
    var data = JSON.parse(fs.readFileSync(mockPath, "utf-8"));
    data.push(JSON.parse(str));
    data = JSON.stringify(data);
    fs.writeFileSync(mockPath, data);
    clientList.forEach((conn) => conn.send(data));
  });
  conn.on("close", function (code, reason) {
    console.log("Connection closed");
  });
}).listen(8888);
