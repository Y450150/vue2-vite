import { Config, Time } from "@clarity-types/core";

let config: Config = {
    projectId: null,
    delay: 1 * Time.Second,
    lean: false,
    track: true,
    content: true,
    mask: [],
    unmask: [],
    regions: [],
    metrics: [],
    dimensions: [],
    cookies: [],
    report: null,
    upload: "http://localhost:8080/api/test",
    fallback: null,
    upgrade: null
};

export default config;
