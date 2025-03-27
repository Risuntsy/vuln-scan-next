"use client";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Globe, Network, Layers, Shield, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { Locale } from "#/i18n";
import { use } from "react";
import { projectDetails } from "#/api";
import { ServiceTypeList } from "#/components/overview/ServiceTypeList";
import ServiceIconGrid from "#/components/overview/ServiceIconGrid";
import { StatisticsList } from "#/components/overview/StatisticsList";

// 示例数据
const serviceTypes = [
  {
    category: "基础服务",
    items: [
      { name: "对象存储服务", count: 12 },
      { name: "Discuz!", count: 8 },
      { name: "长亭雷池WAF社区版", count: 5 },
      { name: "Redis", count: 15 },
      { name: "MySQL", count: 23 },
      { name: "MongoDB", count: 7 }
    ]
  },
  {
    category: "应用服务", 
    items: [
      { name: "Vue", count: 45 },
      { name: "React", count: 38 },
      { name: "Angular", count: 12 },
      { name: "鸿翼edoc2 ECM", count: 4 },
      { name: "Polycom RealPresence Media Suite", count: 3 },
      { name: "WordPress", count: 27 },
      { name: "Joomla", count: 8 }
    ]
  },
  {
    category: "安全服务",
    items: [
      { name: "ModSecurity", count: 16 },
      { name: "Fail2Ban", count: 9 },
      { name: "Snort IDS", count: 4 },
      { name: "OpenVAS", count: 2 }
    ]
  },
  {
    category: "监控服务",
    items: [
      { name: "Prometheus", count: 13 },
      { name: "Grafana", count: 11 },
      { name: "Zabbix", count: 7 },
      { name: "Nagios", count: 5 }
    ]
  }
];

const serviceIcons = [
  {
    name: "Nginx",
    icon: "/icons/nginx.svg", 
    count: 185
  },
  {
    name: "Apache",
    icon: "/icons/apache.svg",
    count: 145
  },
  {
    name: "IIS",
    icon: "/icons/iis.svg",
    count: 78
  },
  {
    name: "Tomcat",
    icon: "/icons/tomcat.svg",
    count: 56
  },
  {
    name: "Node.js",
    icon: "/icons/nodejs.svg",
    count: 92
  },
  {
    name: "PHP",
    icon: "/icons/php.svg",
    count: 167
  },
  {
    name: "Python",
    icon: "/icons/python.svg",
    count: 83
  },
  {
    name: "Java",
    icon: "/icons/java.svg",
    count: 124
  }
];

const statisticsData = [
  {
    title: "网页标题",
    description: "网站标题统计",
    items: [
      { name: "管理后台", count: 45 },
      { name: "用户中心", count: 38 },
      { name: "登录页面", count: 67 },
      { name: "控制面板", count: 29 },
      { name: "系统设置", count: 23 },
      { name: "首页", count: 156 }
    ]
  },
  {
    title: "应用软件",
    description: "使用的应用软件统计",
    items: [
      { name: "Nginx", count: 185 },
      { name: "Apache", count: 145 },
      { name: "MySQL", count: 167 },
      { name: "PHP", count: 134 },
      { name: "WordPress", count: 89 },
      { name: "Tomcat", count: 56 }
    ]
  },
  {
    title: "服务提供商",
    description: "云服务提供商统计", 
    items: [
      { name: "阿里云", count: 234 },
      { name: "腾讯云", count: 156 },
      { name: "华为云", count: 89 },
      { name: "AWS", count: 67 },
      { name: "Azure", count: 45 },
      { name: "Google Cloud", count: 34 }
    ]
  },
  {
    title: "操作系统",
    description: "服务器操作系统统计",
    items: [
      { name: "CentOS", count: 267 },
      { name: "Ubuntu", count: 189 },
      { name: "Debian", count: 134 },
      { name: "Windows Server", count: 78 },
      { name: "Red Hat", count: 45 }
    ]
  }
];

const overviewItems = [
  {
    title: "域名资产",
    value: 0,
    icon: Globe,
    description: "已发现域名"
  },
  {
    title: "IP资产",
    value: 0,
    icon: Network,
    description: "已发现IP地址"
  },
  {
    title: "Web资产",
    value: 0,
    icon: Layers,
    description: "已发现Web应用"
  },
  {
    title: "漏洞",
    value: 0,
    icon: Shield,
    description: "已发现安全漏洞"
  }
];

export default function ProjectOverviewPage({ params }: { params: Promise<{ projectId: string; lang: Locale }> }) {
  const { projectId, lang } = use(params);
  const project = projectDetails[0];

  return (
    <div className="space-y-6">
      {/* 总览卡片 */}
      <div className="grid gap-6 md:grid-cols-4">
        {overviewItems.map(({ title, value, icon: Icon, description }) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Icon className="w-3 h-3 mr-1" />
                <span>{description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 服务类型列表 */}
      <ServiceTypeList data={serviceTypes} lang={lang} />

      {/* 服务图标网格 */}
      <ServiceIconGrid data={serviceIcons} lang={lang} />

      {/* 统计列表 */}
      <StatisticsList data={statisticsData} lang={lang} />
    </div>
  );
}
