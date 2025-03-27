"use client";

import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  FileText,
  Globe,
  Layers,
  Mail,
  Network,
  RefreshCw,
  Search,
  Settings,
  Shield,
  StopCircle,
  ChevronsUpDown
} from "lucide-react";
import { use, useState, useEffect } from "react";
import { Locale } from "#/i18n";
import { useRouter, usePathname } from "next/navigation";
import { projectDetails } from "#/api/mock-data";
import { PROJECT_LIST_ROUTE, PROJECT_OVERVIEW_ROUTE, useLanguageRoute } from "#/routes";
import { Header, Select, SelectContent, SelectItem, SelectTrigger, useSidebar } from "#/components";
import Link from "next/link";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandSeparator } from "#/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";
import { cn } from "#/libs/utils";

export default function ProjectDetailPage({
  params,
  children
}: {
  params: Promise<{ projectId: string; lang: Locale }>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { projectId, lang } = use(params);
  const [open, setOpen] = useState(false);

  const r = useLanguageRoute(lang);

  const router = useRouter();
  const { setOpen: setSidebarOpen } = useSidebar();

  // const project = projectDetails.find((p) => p.id === id);
  const project = projectDetails[0];

  const sidebarItems: Array<{ key: string; icon: React.ElementType; label: string }> = [
    {
      key: "overview",
      icon: Layers,
      label: "项目概览"
    },
    {
      key: "vulnerabilities",
      icon: Shield,
      label: "漏洞管理"
    },
    {
      key: "ports",
      icon: Network,
      label: "端口信息"
    },
    {
      key: "websites",
      icon: Globe,
      label: "网站列表"
    },
    {
      key: "domains",
      icon: Globe,
      label: "域名列表"
    },
    {
      key: "screenshots",
      icon: Globe, // 待替换为实际图标
      label: "服务截图"
    },
    {
      key: "requests",
      icon: FileText,
      label: "请求数据"
    },
    {
      key: "emails",
      icon: Mail,
      label: "邮箱列表"
    },
    {
      key: "leaks",
      icon: AlertTriangle,
      label: "信息泄露"
    },
    {
      key: "clues",
      icon: Search,
      label: "资产线索"
    },
    {
      key: "settings",
      icon: Settings,
      label: "项目设置"
    }
  ];

  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header>
        <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
          <div className="flex">
            <Link href={r(PROJECT_LIST_ROUTE)}>
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="truncate">
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-xl md:text-2xl font-bold truncate">{project.domain}</h1>
                <div className="flex items-center gap-2">
                  <Select
                    value={projectId}
                    onValueChange={(value) => {
                      router.push(r(PROJECT_OVERVIEW_ROUTE, { params: { projectId: value } }));
                    }}
                  >
                    <SelectTrigger className="w-auto">
                      <Badge variant="outline" className="cursor-pointer">{project.id}</Badge>
                    </SelectTrigger>
                    <SelectContent>
                      {projectDetails.length <= 1 ? (
                        <span className="px-2 py-1 text-sm text-muted-foreground">未找到项目</span>
                      ) : (
                        projectDetails.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            <Badge variant="outline">{p.id}</Badge>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {project.status === "completed" ? (
                    <Badge variant="default">已完成</Badge>
                  ) : project.status === "in-progress" ? (
                    <Badge variant="default" className="bg-blue-500">
                      进行中
                    </Badge>
                  ) : project.status === "pending" ? (
                    <Badge variant="outline">等待中</Badge>
                  ) : (
                    <Badge variant="destructive">失败</Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                开始时间: {project.startTime} | 结束时间: {project.endTime} | 持续时间: {project.duration}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-end items-center gap-2">
            {project.status === "in-progress" ? (
              <Button variant="outline" size="sm">
                <StopCircle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">停止扫描</span>
              </Button>
            ) : (
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">重新扫描</span>
              </Button>
            )}
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">导出报告</span>
            </Button>
          </div>
        </div>
      </Header>

      <div className="flex h-full">
        {/* 项目侧边栏导航 */}
        <div className="flex justify-start border-r border-r-gray-200 dark:border-r-gray-800 shadow-sm">
          <div className="p-2 flex flex-col sticky top-0 gap-2 max-h-screen">
            {sidebarItems.map((item) => (
              <Link href={r(`/dashboard/project/${projectId}/${item.key}`)} key={item.key}>
                <Button
                  variant={pathname.endsWith(item.key) ? "default" : "ghost"}
                  className="justify-start group relative"
                  title={item.label}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline-block absolute left-14 lg:static lg:left-auto bg-popover p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 lg:opacity-100 lg:bg-transparent lg:p-0">
                    {item.label}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
