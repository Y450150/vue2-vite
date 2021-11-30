import { svgToBase64Encode } from "../controller/svg";

export default [
  {
    path: "/svg",
    method: "post",
    fileUpload: true,
    controller: svgToBase64Encode,
  },
];
