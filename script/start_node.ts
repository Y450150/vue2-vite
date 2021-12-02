import { server } from "../node/app";

const PORT = 8080;

server.listen(PORT, () => {
  console.log("server start");
});
