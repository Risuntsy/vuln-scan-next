import { ENV_CONFIG } from "#/config";
import { FetchClient, RequestConfig } from "./base";
import { useUserStore } from "#/stores";

const userStore = useUserStore();

export const clientRequest = new FetchClient({
  baseUrl: ENV_CONFIG.BACKEND_URL
});

function authInterceptor(config: RequestConfig) {
  const accessToken = userStore.token
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
}

clientRequest.addRequestInterceptor(authInterceptor);
