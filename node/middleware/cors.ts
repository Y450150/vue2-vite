import cors from "cors";
import * as config from "../config";

export const CORS = cors((req, callback) => {
  let corsOption;
  if (config.whiteList.includes(req.header("Origin"))) {
    corsOption = { origin: true };
  } else {
    corsOption = { origin: false };
  }
  callback(null, corsOption);
});
