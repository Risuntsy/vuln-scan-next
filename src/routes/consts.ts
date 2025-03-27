// common routes
export const LOGIN_ROUTE = "/login";
export const DASHBOARD_ROUTE = "/dashboard";
export const STATISTICS_ROUTE = `/statistics`;
export const SETTINGS_ROUTE = `/settings`;

// project routes
export const PROJECT_LIST_ROUTE = `${DASHBOARD_ROUTE}/project`;
export const NEW_PROJECT_ROUTE = `${PROJECT_LIST_ROUTE}/new`;
export const PROJECT_ROUTE = `${PROJECT_LIST_ROUTE}/:projectId`;

// project detail routes
export const PROJECT_OVERVIEW_ROUTE = `${PROJECT_ROUTE}/overview`;
export const PROJECT_REQUEST_ROUTE = `${PROJECT_ROUTE}/request`;
export const PROJECT_EMAIL_ROUTE = `${PROJECT_ROUTE}/email`;
export const PROJECT_LEAK_ROUTE = `${PROJECT_ROUTE}/leak`;
export const PROJECT_ASSETS_ROUTE = `${PROJECT_ROUTE}/assets`;
export const PROJECT_SETTINGS_ROUTE = `${PROJECT_ROUTE}/settings`;
export const PROJECT_EDIT_ROUTE = `${PROJECT_ROUTE}/edit`;
export const PROJECT_REPORT_ROUTE = `${PROJECT_ROUTE}/report`;
export const PROJECT_VULNERABILITIES_ROUTE = `${PROJECT_ROUTE}/vulnerabilities`;
export const PROJECT_VULNERABILITY_DETAIL_ROUTE = `${PROJECT_VULNERABILITIES_ROUTE}/:vulnerabilityId`;

// assets routes
export const ASSETS_ROUTE = `${DASHBOARD_ROUTE}/assets`;
export const ASSETS_DOMAINS_ROUTE = `${ASSETS_ROUTE}/domains`;
export const ASSETS_IPS_ROUTE = `${ASSETS_ROUTE}/ips`;
export const ASSETS_WEBS_ROUTE = `${ASSETS_ROUTE}/web`;

// fingerprints routes
export const FINGERPRINTS_ROUTE = `${DASHBOARD_ROUTE}/fingerprints`;
export const NEW_FINGERPRINT_ROUTE = `${FINGERPRINTS_ROUTE}/new`;
export const FINGERPRINT_DETAIL_ROUTE = `${FINGERPRINTS_ROUTE}/:fingerprintId`;
