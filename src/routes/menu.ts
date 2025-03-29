import { Database, Home, Shield, Fingerprint, Bug, Globe, Layers, Network, BarChart3, Settings } from "lucide-react";

import {
    ASSETS_WEBS_ROUTE,
    FINGERPRINTS_ROUTE,
    SETTINGS_ROUTE,
    STATISTICS_ROUTE,
    ASSETS_DOMAINS_ROUTE,
    ASSETS_IPS_ROUTE,
    DASHBOARD_ROUTE,
    PROJECT_LIST_ROUTE
} from "./consts";

import { SideBarItem } from "#/types";

export const menuItems: SideBarItem[] = [
    { name: "仪表盘", href: DASHBOARD_ROUTE, Icon: Home },
    { name: "扫描任务", href: PROJECT_LIST_ROUTE, Icon: Shield },
    {
        name: "资产管理",
        Icon: Database,
        subMenu: [
            { name: "域名资产", href: ASSETS_DOMAINS_ROUTE, Icon: Globe },
            { name: "IP资产", href: ASSETS_IPS_ROUTE, Icon: Network },
            { name: "Web资产", href: ASSETS_WEBS_ROUTE, Icon: Layers }
        ]
    },
    { name: "指纹库", href: FINGERPRINTS_ROUTE, Icon: Fingerprint },
    { name: "统计分析", href: STATISTICS_ROUTE, Icon: BarChart3 },
    { name: "系统设置", href: SETTINGS_ROUTE, Icon: Settings }
];
