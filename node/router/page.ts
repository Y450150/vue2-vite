import express from "express";

const rules = [{ path: "*", method: "get" }];
const mds = [];
mds.push(async (req, res, next) => {
  console.log("中1");
  await next();
});
mds.push(async (req, res, next) => {
  console.log("中2");
  await next();
});
mds.push(async (req, res, next) => {
  console.log("中3");
  await next();
});

export const MiddleWaresRouter = () => {
  const Router = express.Router();
  rules.forEach((item) => {
    const { method = "get", path } = item;
    Router[method](path, ...mds);
  });
  return Router;
};
