/**
 * HTTP请求配置接口
 */
export interface RequestConfig {
  url: string;
  method: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: "object" | "raw" | "data";
}

/**
 * 客户端配置接口
 */
export interface ClientConfig {
  baseUrl: string;
  responseType?: "object" | "raw" | "data";
  responseFields?: {
    code?: string;
    message?: string;
    data?: string;
  };
  successCodes?: number[];
  interceptors?: {
    request?: Array<(config: RequestConfig) => RequestConfig | Promise<RequestConfig>>;
    response?: Array<(response: any) => any | Promise<any>>;
  };
}

/**
 * 基础响应接口
 */
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * Fetch客户端类
 * 用于处理HTTP请求并支持拦截器功能
 */
export class FetchClient {
  private config: ClientConfig;

  /**
   * 构造函数
   * @param config 客户端配置
   */
  constructor(config: ClientConfig) {
    this.config = {
      responseType: "data",
      responseFields: {
        code: "code",
        message: "message",
        data: "data"
      },
      successCodes: [0],
      interceptors: {
        request: [],
        response: []
      },
      ...config
    };
  }

  /**
   * 发送HTTP请求
   * @param config 请求配置
   * @returns 根据responseType返回不同类型的响应
   */
  async request<T>(config: RequestConfig): Promise<BaseResponse<T> | T | Response> {
    let processedConfig = { ...config };

    // 应用请求拦截器
    if (this.config.interceptors?.request) {
      for (const interceptor of this.config.interceptors.request) {
        processedConfig = await interceptor(processedConfig);
      }
    }

    let url = this.config.baseUrl + processedConfig.url;
    if (processedConfig.params) {
      const queryParams = new URLSearchParams();
      Object.entries(processedConfig.params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      url += `?${queryParams.toString()}`;
      processedConfig.params = undefined;
    }

    const fetchOptions: RequestInit = {
      method: processedConfig.method,
      headers: {
        "Content-Type": "application/json",
        ...processedConfig.headers
      },
      credentials: processedConfig.withCredentials ? "include" : "same-origin"
    };

    if (processedConfig.data && processedConfig.method !== "GET") {
      fetchOptions.body = JSON.stringify(processedConfig.data);
    }

    let rawResponse = await fetch(url, fetchOptions);
    const responseType = processedConfig.responseType || this.config.responseType;

    // 处理 "raw" 类型的响应
    if (responseType === "raw") {
      // 对原始响应应用拦截器
      if (this.config.interceptors?.response) {
        for (const interceptor of this.config.interceptors.response) {
          rawResponse = await interceptor(rawResponse);
        }
      }
      return rawResponse;
    }

    // 解析JSON响应
    const jsonResponse = await rawResponse.json();

    // 处理 "object" 类型的响应
    if (responseType === "object") {
      let processedResponse = jsonResponse;
      // 对完整响应对象应用响应拦截器
      if (this.config.interceptors?.response) {
        for (const interceptor of this.config.interceptors.response) {
          processedResponse = await interceptor(processedResponse);
        }
      }
      return processedResponse as BaseResponse<T>;
    } 
    
    // 处理 "data" 类型的响应
    if (responseType === "data") {
      const { code: codeField, message: messageField, data: dataField } = this.config.responseFields || {};
      
      // 确保所有字段都存在
      if (codeField && messageField && dataField && 
          codeField in jsonResponse && 
          dataField in jsonResponse) {
        
        const codeValue = jsonResponse[codeField];
        let dataValue = jsonResponse[dataField];
        
        // 对数据部分应用响应拦截器
        if (this.config.interceptors?.response) {
          for (const interceptor of this.config.interceptors.response) {
            dataValue = await interceptor(dataValue);
          }
        }
        
        // 检查是否为成功状态码
        if (this.config.successCodes?.includes(Number(codeValue))) {
          return dataValue as T;
        }
      }
      
      // 如果没有匹配的字段结构或不是成功状态码，返回整个响应
      return jsonResponse as T;
    }

    // 如果responseType无效
    throw new Error(`Invalid response type: ${responseType}`);
  }

  /**
   * 发送GET请求
   * @param url 请求URL
   * @param config 请求配置
   */
  async get<T>(url: string, config?: RequestConfig): Promise<BaseResponse<T> | T | Response> {
    return this.request<T>({ ...config, url, method: "GET" });
  }

  /**
   * 发送POST请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<BaseResponse<T> | T | Response> {
    return this.request<T>({ ...config, url, method: "POST", data });
  }

  /**
   * 发送PUT请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<BaseResponse<T> | T | Response> {
    return this.request<T>({ ...config, url, method: "PUT", data });
  }

  /**
   * 发送DELETE请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   */
  async delete<T>(url: string, data?: any, config?: RequestConfig): Promise<BaseResponse<T> | T | Response> {
    return this.request<T>({ ...config, url, method: "DELETE", data });
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
   * 当responseType为"object"时，拦截器接收完整的响应对象
   * 当responseType为"data"时，拦截器仅接收响应的data部分
   * @param interceptor 响应拦截器函数
   */
  addResponseInterceptor(interceptor: (response: any) => any | Promise<any>): void {
    this.config.interceptors = this.config.interceptors || { request: [], response: [] };
    this.config.interceptors.response = this.config.interceptors.response || [];
    this.config.interceptors.response.push(interceptor);
  }
}
