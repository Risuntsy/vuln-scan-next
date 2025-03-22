// 基础路由常量
export const LOGIN_ROUTE = "/login";
export const DASHBOARD_ROUTE = "/dashboard";

// 项目相关路由
export const PROJECT_ROUTE = `${DASHBOARD_ROUTE}/project`;
export const NEW_PROJECT_ROUTE = `${PROJECT_ROUTE}/new`;
export const PROJECT_DETAIL_ROUTE = `${PROJECT_ROUTE}/:id`;

// 具体项目相关路由
export const PROJECT_OVERVIEW_ROUTE = `${PROJECT_DETAIL_ROUTE}/overview`;
export const PROJECT_REQUEST_ROUTE = `${PROJECT_DETAIL_ROUTE}/request`;
export const PROJECT_EMAIL_ROUTE = `${PROJECT_DETAIL_ROUTE}/email`;
export const PROJECT_LEAK_ROUTE = `${PROJECT_DETAIL_ROUTE}/leak`;
export const PROJECT_ASSETS_ROUTE = `${PROJECT_DETAIL_ROUTE}/assets`;
export const PROJECT_SETTINGS_ROUTE = `${PROJECT_DETAIL_ROUTE}/settings`;




export const PROJECT_EDIT_ROUTE = `${PROJECT_DETAIL_ROUTE}/edit`;
export const PROJECT_REPORT_ROUTE = `${PROJECT_DETAIL_ROUTE}/report`;

// 资产相关路由
export const ASSETS_ROUTE = `${DASHBOARD_ROUTE}/assets`;
export const ASSETS_DOMAINS_ROUTE = `${ASSETS_ROUTE}/domains`;
export const ASSETS_IPS_ROUTE = `${ASSETS_ROUTE}/ips`;
export const ASSETS_WEBS_ROUTE = `${ASSETS_ROUTE}/web`;

// 漏洞相关路由
export const VULNERABILITIES_ROUTE = `${DASHBOARD_ROUTE}/vulnerabilities`;
export const VULNERABILITY_DETAIL_ROUTE = `${VULNERABILITIES_ROUTE}/:id`;

// 指纹相关路由
export const FINGERPRINTS_ROUTE = `${DASHBOARD_ROUTE}/fingerprints`;
export const NEW_FINGERPRINT_ROUTE = `${FINGERPRINTS_ROUTE}/new`;
export const FINGERPRINT_DETAIL_ROUTE = `${FINGERPRINTS_ROUTE}/:id`;

// 其他路由
export const STATISTICS_ROUTE = `${DASHBOARD_ROUTE}/statistics`;
export const SETTINGS_ROUTE = `${DASHBOARD_ROUTE}/settings`;