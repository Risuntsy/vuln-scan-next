import { FetchClient } from "./base";
import { ENV_CONFIG } from "#/config";


export const serverRequest = new FetchClient({
  baseUrl: ENV_CONFIG.BACKEND_URL
});

