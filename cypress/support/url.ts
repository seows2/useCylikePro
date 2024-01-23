import { e2e } from "../index";

const getBaseUrl = () =>
  e2e.env("BASE_URL") || e2e.config().baseUrl || "http://localhost:3000";

export const fromBaseUrl = (url = "") => new URL(url, getBaseUrl()).href;
