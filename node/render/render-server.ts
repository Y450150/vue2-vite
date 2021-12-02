import fs from "fs";
import path from "path";
import { BundleRenderer, createBundleRenderer } from "vue-server-renderer";
const devServer = require("../../build/setup-dev-server");
const isProd = process.env.NODE_ENV === "production";
const resolve = (file) => path.resolve(process.cwd(), file);

let renderer: BundleRenderer;
let readyPromise: Promise<any>;

export async function render(req, res) {
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

export async function initServerRender(server) {
  const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, {
      // this is only needed when vue-server-renderer is npm-linked
      basedir: resolve("./dist"),
      // recommended for performance
      runInNewContext: false,
      ...options,
    });
  };
  const template = fs.readFileSync(resolve("./index.template.html"), "utf-8");
  readyPromise = devServer(server, (bundle, options) => {
    renderer = createRenderer(bundle, { template, ...options });
  });
}

export async function serverRender(req, res) {
  try {
    console.log(req.url, "serverRender-------");
    await readyPromise;
    await render(req, res);
  } catch (error) {
    console.log("renderPromise server get err", error);
  }
}
