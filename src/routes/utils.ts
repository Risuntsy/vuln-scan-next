import { Locale } from "#/i18n";



interface RouteOptions {
  params?: Record<string, string | number>;
  query?: Record<string, string>;
}

/**
 * 构建路由，支持语言前缀、路径参数和查询参数
 * @param route 路由模板
 * @param options 可选配置，包含路径参数和查询参数
 * @returns 完整的路由字符串
 *
 * @example
 * // 返回 "/zh/dashboard/project/123?view=details"
 * buildRoute(PROJECT_DETAIL_ROUTE, { params: { id: "123" }, query: { view: "details" } })
 */
export function buildRoute(route: string, options?: RouteOptions): string {
  let result = route;

  // 替换路径参数
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, String(value));
    });
  }

  // 添加查询参数
  if (options?.query) {
    const queryString = new URLSearchParams(options.query).toString();
    if (queryString) {
      result += `?${queryString}`;
    }
  }

  return result;
}

export function useLanguageRoute(lang: Locale) {
  return function (route: string, options?: RouteOptions) {
    return `/${lang}${buildRoute(route, options)}`;
  };
}
