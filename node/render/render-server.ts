import fs from "fs";
import path from "path";
import express from "express";

const { createBundleRenderer } = require("vue-server-renderer");
const devServer = require("../../build/setup-dev-server");
const isProd = process.env.NODE_ENV === "production";
const server = express();
const resolve = (file) => path.resolve(__dirname, file);

let renderer, readyPromise;

export function render(ctx) {
  const { req, res } = ctx;
  const handleError = (err) => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send("404 | Page Not Found ---");
    } else {
      // Render Error Page or Redirect
      res.status(500).send("500 | Internal Server Error");
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };
  const context = {
    title: "yvywang",
    url: req.url,
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      handleError(err);
      return console.log("renderString err", err);
    }
    res.send(html);
  });
}

export function initServerRender() {
  const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, {
      basedir: resolve("./dist"),
      ...options,
    });
  };
  const template = fs.readFileSync(resolve("../../index.template.html"), "utf-8");
  readyPromise = devServer(server, (bundle, options) => {
    renderer = createRenderer(bundle, { template, ...options });
  });
}
export function serverRender(ctx) {
  readyPromise
    .then(() => render(ctx))
    .catch((err) => {
      return console.log("renderPromise server get err", err);
    });
}
