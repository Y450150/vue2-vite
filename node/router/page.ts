import express from "express";
import cors from "cors";
import * as config from "../config";

const CORS_CHECK = (req, callback) => {
  let corsOption;
  if (config.whiteList.includes(req.header("Origin"))) {
    corsOption = { origin: true };
  } else {
    corsOption = { origin: false };
  }
  callback(null, corsOption);
};

const rules = [{ path: "*", method: "get" }];
const mds = [cors(CORS_CHECK)];

export const MiddleWaresRouter = () => {
  const Router = express.Router();
  rules.forEach((item) => {
    const { method = "get", path } = item;
    Router[method](path, ...mds);
  });
  return Router;
};
