import { ENV_CONFIG } from "#/config";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * HTTP请求配置接口
 */
export interface RequestConfig {
  url: string;
  method: string;
  data?: any;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: "object" | "raw" | "data";
}

/**
 * API响应接口
 */
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface ApiClientConfigBase {
  baseUrl: string;
  successCodes?: number[];
  interceptors?: {
    request?: Array<(config: RequestConfig) => RequestConfig | Promise<RequestConfig>>;
    response?: Array<(response: any) => any | Promise<any>>;
  };
  messageHandler?: (message: string) => any;
}

export interface ResponseFields {
  code: string;
  message: string;
  data: string;
}

export type ApiClientConfig =
  | (ApiClientConfigBase & {
      responseType: "object" | "raw";
      responseFields?: ResponseFields;
    })
  | (ApiClientConfigBase & {
      responseType: "data";
      responseFields: ResponseFields;
    });

/**
 * API客户端类
 * 专为Next.js的Server Actions设计，处理HTTP请求
 */
export class ApiClient {
  private config: ApiClientConfig;

  /**
   * 构造函数
   * @param config 客户端配置
   */
  constructor(config?: Partial<ApiClientConfig>) {
    this.config = {
      baseUrl: ENV_CONFIG.BACKEND_URL,
      responseType: "data",
      responseFields: {
        code: "code",
        message: "message",
        data: "data"
      },
      successCodes: [0, 200],
      interceptors: {
        request: [],
        response: []
      },
      ...(config || {})
    };
  }

  /**
   * 发送HTTP请求
   * @param config 请求配置
   * @returns 根据responseType返回不同类型的响应
   */
  async request<T>(config: RequestConfig): Promise<T> {
    try {
      let processedConfig = { ...config };

      // 应用请求拦截器
      if (this.config.interceptors?.request) {
        for (const interceptor of this.config.interceptors.request) {
          processedConfig = await interceptor(processedConfig);
        }
      }

      // 构建完整URL
      let url = this.config.baseUrl + processedConfig.url;

      // 处理查询参数
      if (processedConfig.params) {
        const queryParams = new URLSearchParams();
        Object.entries(processedConfig.params).forEach(([key, value]) => {
          queryParams.append(key, String(value));
        });
        url += (url.includes("?") ? "&" : "?") + queryParams.toString();
      }

      processedConfig.headers = {
        "Content-Type": "application/json",
        ...(processedConfig.headers || {})
      };

      const fetchOptions: RequestInit = {
        method: processedConfig.method,
        headers: processedConfig.headers,
        credentials: processedConfig.withCredentials ? "include" : "same-origin"
      };

      // 添加请求体
      if (processedConfig.data && processedConfig.method !== "GET") {
        fetchOptions.body = JSON.stringify(processedConfig.data);
      }

      // console.log("url", url);
      // console.log("fetchOptions", JSON.stringify(fetchOptions));
      // 发送请求
      const rawResponse = await fetch(url, fetchOptions);
      // console.log("rawResponse", rawResponse);

      // 处理未授权错误
      if (rawResponse.status === 401 || rawResponse.status === 403) {
        // 确保这是服务端环境
        if (typeof window === "undefined") {
          redirect("/login");
        }
        throw new Error("Unauthorized");
      }

      const responseType = processedConfig.responseType || this.config.responseType;

      // 处理 "raw" 类型的响应
      if (responseType === "raw") {
        // 对原始响应应用拦截器
        let processedResponse = rawResponse;
        if (this.config.interceptors?.response) {
          for (const interceptor of this.config.interceptors.response) {
            processedResponse = await interceptor(processedResponse);
          }
        }
        return processedResponse as T;
      }

      // 解析响应
      let data;
      const contentType = rawResponse.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await rawResponse.json();
      } else {
        data = await rawResponse.text();
      }

      // 处理 "object" 类型的响应
      if (responseType === "object") {
        let processedResponse = data;
        // 对完整响应对象应用响应拦截器
        if (this.config.interceptors?.response) {
          for (const interceptor of this.config.interceptors.response) {
            processedResponse = await interceptor(processedResponse);
          }
        }
        return processedResponse as T;
      }

      // 处理 "data" 类型的响应
      if (responseType === "data") {
        // Ensure responseFields exists for data responseType
        const responseFields = this.config.responseFields;
        if (!responseFields) {
          throw new Error("responseFields is required for responseType: data");
        }

        const { code: codeField, message: messageField, data: dataField } = responseFields;

        // 处理响应数据，不严格要求标准格式
        if (data && typeof data === "object" && codeField && codeField in data) {
          const codeValue = data[codeField];

          // 获取数据部分，可能不存在
          let dataValue = dataField && dataField in data ? data[dataField] : undefined;

          // 对数据部分应用响应拦截器
          if (dataValue !== undefined && this.config.interceptors?.response) {
            for (const interceptor of this.config.interceptors.response) {
              dataValue = await interceptor(dataValue);
            }
          }

          // 检查是否为成功状态码
          if (this.config.successCodes?.includes(Number(codeValue))) {
            // 如果没有数据字段，返回void或空对象
            return (dataValue === undefined ? {} : dataValue) as T;
          } else {
            // 返回完整响应给调用者处理错误
            return data as T;
          }
        }

        throw new Error("Invalid response format");
        // 如果不是兼容格式，自行包装
        // return {
        //   code: rawResponse.status,
        //   data: data as T,
        //   message: rawResponse.statusText
        // } as T;
      }

      // 如果responseType无效
      throw new Error(`Invalid response type: ${responseType}`);
    } catch (error) {
      if ((error as Error).message === "Unauthorized") {
        throw error; // 已处理的认证错误，直接抛出
      }

      // 其他错误
      console.error("API request failed:", error);
      return {
        code: 500,
        data: null,
        message: (error as Error).message || "Request failed"
      } as T;
    }
  }

  /**
   * 发送GET请求
   * @param url 请求URL
   * @param config 请求配置
   */
  async get<T>(url: string, config?: Omit<RequestConfig, "url" | "method">): Promise<T> {
    return this.request<T>({ ...config, url, method: "GET" });
  }

  /**
   * 发送POST请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   */
  async post<T = any>(url: string, data?: any, config?: Omit<RequestConfig, "url" | "method" | "data">): Promise<T> {
    return this.request<T>({ ...config, url, method: "POST", data });
  }

  /**
   * 发送PUT请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, "url" | "method" | "data">
  ): Promise<BaseResponse<T> | T | Response> {
    return this.request<T>({ ...config, url, method: "PUT", data });
  }

  /**
   * 发送DELETE请求
   * @param url 请求URL
   * @param config 请求配置
   */
  async delete<T = any>(
    url: string,
    config?: Omit<RequestConfig, "url" | "method">
  ): Promise<BaseResponse<T> | T | Response> {
    return this.request<T>({ ...config, url, method: "DELETE" });
  }

  /**
   * 添加请求拦截器
   * @param interceptor 请求拦截器函数
   */
  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>): void {
    this.config.interceptors = this.config.interceptors || { request: [], response: [] };
    this.config.interceptors.request = this.config.interceptors.request || [];
    this.config.interceptors.request.push(interceptor);
  }

  /**
   * 添加响应拦截器
   * @param interceptor 响应拦截器函数
   */
  addResponseInterceptor(interceptor: (response: any) => any | Promise<any>): void {
    this.config.interceptors = this.config.interceptors || { request: [], response: [] };
    this.config.interceptors.response = this.config.interceptors.response || [];
    this.config.interceptors.response.push(interceptor);
  }
}

async function authInterceptor(config: RequestConfig) {
  if (!config.withCredentials) {
    return config;
  }

  if (!config.headers) {
    config.headers = {};
  }

  const cookieStore = await cookies();
  const authToken = cookieStore.get("token");

  if (authToken) {
    config.headers["authorization"] = authToken.value;
    return config;
  }

  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  if (authHeader) {
    config.headers["authorization"] = authHeader;
  }

  if (!config.headers["authorization"]) {
    throw new Error("Unauthorized");
  }

  return config;
}

// 默认配置的实例
export const apiClient = new ApiClient();

apiClient.addRequestInterceptor(authInterceptor);
