import { serverRender } from "../render/render-server";
const rules = [{ path: "*", method: "get" }];
const mds = [serverRender];

export const MiddleWaresRouter = (app) => {
  rules.forEach((item) => {
    const { method = "get", path } = item;
    app[method](path, ...mds);
  });
};
