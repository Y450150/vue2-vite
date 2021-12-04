import { svgToBase64Encode } from "../controller/svg";
import { testApi } from "../controller/test";
export default [
  {
    path: "/test",
    method: "post",
    controller: testApi,
  },
  {
    path: "/svg",
    method: "post",
    fileUpload: true,
    controller: svgToBase64Encode,
  },
];
