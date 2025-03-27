import {
  Input,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge
} from "#/components/ui";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  LucideIcon,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Search,
  StopCircle,
  Trash2,
  XCircle
} from "lucide-react";
import Link from "next/link";
import {
  DASHBOARD_ROUTE,
  NEW_PROJECT_ROUTE,
  PROJECT_EDIT_ROUTE,
  PROJECT_OVERVIEW_ROUTE,
  PROJECT_REPORT_ROUTE,
  PROJECT_LIST_ROUTE,
  useLanguageRoute
} from "#/routes";
import { sleep } from "#/libs/utils";
import Header from "#/components/main/header";
import { projects } from "#/api/mock-data";
import { Locale } from "#/i18n";

const PAGE_SIZES = [10, 20, 50, 100];

const FILTER_OPTIONS = [
  { label: "全部任务" },
  { label: "进行中" },
  { label: "已完成" },
  { label: "等待中" },
  { label: "失败" }
];

type ProjectStatus = "completed" | "in-progress" | "pending" | "failed";

const PROJECT_ACTIONS = [
  {
    key: "stop",
    icon: StopCircle,
    title: "停止",
    showWhen: (status: ProjectStatus) => status === "in-progress"
  },
  {
    key: "start",
    icon: Play,
    title: "开始",
    showWhen: (status: ProjectStatus) => status !== "completed" && status !== "in-progress"
  },
  {
    key: "rescan",
    icon: RefreshCw,
    title: "重新扫描",
    showWhen: (status: ProjectStatus) => status === "completed"
  },
  {
    key: "edit",
    icon: Pencil,
    title: "编辑",
    route: PROJECT_EDIT_ROUTE
  },
  {
    key: "view",
    icon: Eye,
    title: "查看详情",
    route: PROJECT_OVERVIEW_ROUTE
  },
  {
    key: "report",
    icon: FileText,
    title: "导出报告",
    route: PROJECT_REPORT_ROUTE
  }
];

const STATUS_BADGES: Record<
  ProjectStatus,
  {
    icon: LucideIcon;
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
    animate?: boolean;
  }
> = {
  completed: {
    icon: CheckCircle,
    label: "已完成",
    variant: "default"
  },
  "in-progress": {
    icon: RefreshCw,
    label: "进行中",
    variant: "default",
    className: "bg-blue-400 hover:bg-blue-500",
    animate: true
  },
  pending: {
    icon: Clock,
    label: "等待中",
    variant: "outline"
  },
  failed: {
    icon: XCircle,
    label: "失败",
    variant: "destructive"
  }
};

const ASSET_TYPES = [
  { key: "domains", label: "域名" },
  { key: "ips", label: "IP" },
  { key: "webs", label: "Web" }
];

export default async function ProjectsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const r = useLanguageRoute(lang);
  await sleep(1000);

  return (
    <>
      <Header routes={[{ name: "仪表盘", href: DASHBOARD_ROUTE }, { name: "扫描任务" }]}>
        <div className="flex items-center gap-2 justify-between w-full">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">扫描任务</h1>
            <p className="text-muted-foreground text-sm">管理所有扫描任务</p>
          </div>
          <Link href={NEW_PROJECT_ROUTE}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建扫描任务
            </Button>
          </Link>
        </div>
      </Header>

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="sticky top-0 z-10 bg-background pb-2 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-auto max-w-[250px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="搜索任务..." className="pl-8" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-1" />
                        筛选
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      {FILTER_OPTIONS.map((option) => (
                        <DropdownMenuItem key={option.label}>{option.label}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Select defaultValue="10">
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="每页行数" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAGE_SIZES.map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="ml-1">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1 sm:ml-2 sm:border-l sm:pl-2">
                    <Button variant="outline" size="sm" disabled>
                      上一页
                    </Button>
                    <span className="text-xs whitespace-nowrap">第 1 页，共 10 页</span>
                    <Button variant="outline" size="sm">
                      下一页
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                  <div
                    className={`h-1.5 ${
                      project.status === "in-progress"
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x bg-[length:400%_100%] transition-colors duration-1000"
                        : project.status === "completed"
                          ? "bg-primary"
                          : project.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-destructive"
                    }`}
                  ></div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Link
                        href={r(PROJECT_OVERVIEW_ROUTE, { params: { projectId: project.id } })}
                        className="text-primary hover:underline font-medium truncate max-w-[150px]"
                      >
                        {project.id}
                      </Link>
                      <div className="flex items-center space-x-1">
                        <div className="hidden lg:flex items-center space-x-1">
                          {PROJECT_ACTIONS.map((action) => {
                            if (!action.showWhen || action.showWhen(project.status)) {
                              const Icon = action.icon;
                              const content = (
                                <Button
                                  key={action.key}
                                  variant="ghost"
                                  size="icon"
                                  title={action.title}
                                  className="h-7 w-7"
                                >
                                  <Icon className="w-4 h-4" />
                                </Button>
                              );

                              return action.route ? (
                                <Link key={action.key} href={r(action.route, { params: { id: project.id } })}>
                                  {content}
                                </Link>
                              ) : (
                                content
                              );
                            }
                            return null;
                          })}
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {PROJECT_ACTIONS.map((action) => {
                              if (!action.showWhen || action.showWhen(project.status)) {
                                const Icon = action.icon;
                                const content = (
                                  <DropdownMenuItem
                                    key={action.key}
                                    className={action.key === "delete" ? "text-destructive" : ""}
                                  >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {action.title}
                                  </DropdownMenuItem>
                                );

                                return action.route ? (
                                  <Link key={action.key} href={r(action.route, { params: { id: project.id } })}>
                                    {content}
                                  </Link>
                                ) : (
                                  content
                                );
                              }
                              return null;
                            })}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除任务
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-muted-foreground mb-1">域名</div>
                      <div className="font-medium truncate">{project.domain}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">状态</div>
                        {(() => {
                          const status = STATUS_BADGES[project.status];
                          const Icon = status.icon;
                          return (
                            <Badge variant={status.variant} className={status.className}>
                              <div className="flex items-center">
                                <div className={status.animate ? "animate-spin mr-1" : "mr-1"}>
                                  <Icon className="w-3 h-3" />
                                </div>
                                <span>{status.label}</span>
                              </div>
                            </Badge>
                          );
                        })()}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">创建时间</div>
                        <div className="text-sm">{project.createdAt}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {ASSET_TYPES.map((type) => (
                        <div key={type.key} className="bg-muted rounded-md p-2 text-center">
                          <div className="text-xs text-muted-foreground">{type.label}</div>
                          <div className="font-medium">{project.assets[type.key as keyof typeof project.assets]}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">漏洞</div>
                      <div className="flex flex-wrap items-center gap-1">
                        {project.vulnerabilities.high > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            高: {project.vulnerabilities.high}
                          </Badge>
                        )}
                        {project.vulnerabilities.medium > 0 && (
                          <Badge className="text-xs bg-yellow-500 text-white hover:bg-yellow-400">
                            中: {project.vulnerabilities.medium}
                          </Badge>
                        )}
                        {project.vulnerabilities.low > 0 && (
                          <Badge variant="outline" className="text-xs">
                            低: {project.vulnerabilities.low}
                          </Badge>
                        )}
                        {project.vulnerabilities.high === 0 &&
                          project.vulnerabilities.medium === 0 &&
                          project.vulnerabilities.low === 0 && (
                            <span className="text-xs text-muted-foreground">无</span>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sticky bottom-0 bg-background py-3 border-t">
              <div className="text-sm text-muted-foreground">显示 1-7 共 7 条记录</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
