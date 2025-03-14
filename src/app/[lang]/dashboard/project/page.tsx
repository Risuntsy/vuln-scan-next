import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "#/components/ui/dropdown-menu";
import { Input } from "#/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Badge } from "#/components/ui/badge";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
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
  PROJECT_DETAIL_ROUTE,
  PROJECT_EDIT_ROUTE,
  PROJECT_REPORT_ROUTE,
  PROJECT_ROUTE,
  useLanguageRoute
} from "#/config";
import { sleep } from "#/libs/utils";
import Header from "#/components/main/header";
import { projects } from "#/api/mock-data";
import { Locale } from "#/i18n";

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
                      <DropdownMenuItem>全部任务</DropdownMenuItem>
                      <DropdownMenuItem>进行中</DropdownMenuItem>
                      <DropdownMenuItem>已完成</DropdownMenuItem>
                      <DropdownMenuItem>等待中</DropdownMenuItem>
                      <DropdownMenuItem>失败</DropdownMenuItem>
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
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
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
                  {project.status === "in-progress" ? (
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1.5 animate-gradient-x bg-[length:400%_100%] transition-colors duration-1000"></div>
                  ) : project.status === "completed" ? (
                    <div className="bg-primary h-1.5"></div>
                  ) : project.status === "pending" ? (
                    <div className="bg-yellow-500 h-1.5"></div>
                  ) : (
                    <div className="bg-destructive h-1.5"></div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Link
                        href={`${PROJECT_ROUTE}/${project.id}`}
                        className="text-primary hover:underline font-medium truncate max-w-[150px]"
                      >
                        {project.id}
                      </Link>
                      <div className="flex items-center space-x-1">
                        {project.status === "in-progress" ? (
                          <Button variant="ghost" size="icon" title="停止" className="h-7 w-7">
                            <StopCircle className="w-4 h-4" />
                          </Button>
                        ) : project.status !== "completed" ? (
                          <Button variant="ghost" size="icon" title="开始" className="h-7 w-7">
                            <Play className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" title="重新扫描" className="h-7 w-7">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                        <div className="hidden sm:flex items-center space-x-1">
                          <Link href={r(PROJECT_EDIT_ROUTE, { params: { id: project.id } })}>
                            <Button variant="ghost" size="icon" title="编辑" className="h-7 w-7">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={r(PROJECT_DETAIL_ROUTE, { params: { id: project.id } })}>
                            <Button variant="ghost" size="icon" title="查看详情" className="h-7 w-7">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={r(PROJECT_REPORT_ROUTE, { params: { id: project.id } })}>
                            <Button variant="ghost" size="icon" title="导出报告" className="h-7 w-7">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={r(PROJECT_DETAIL_ROUTE, { params: { id: project.id } })}>
                                <Eye className="w-4 h-4 mr-2" />
                                查看详情
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={r(PROJECT_EDIT_ROUTE, { params: { id: project.id } })}>
                                <Pencil className="w-4 h-4 mr-2" />
                                编辑任务
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={r(PROJECT_REPORT_ROUTE, { params: { id: project.id } })}>
                                <FileText className="w-4 h-4 mr-2" />
                                导出报告
                              </Link>
                            </DropdownMenuItem>
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
                        {project.status === "completed" ? (
                          <Badge variant="default">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            已完成
                          </Badge>
                        ) : project.status === "in-progress" ? (
                          <Badge variant="default" className="bg-blue-400 hover:bg-blue-500">
                            <div className="flex items-center">
                              <div className="animate-spin mr-1">
                                <RefreshCw className="w-3 h-3" />
                              </div>
                              <span>进行中</span>
                            </div>
                          </Badge>
                        ) : project.status === "pending" ? (
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            等待中
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="w-3 h-3 mr-1" />
                            失败
                          </Badge>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">创建时间</div>
                        <div className="text-sm">{project.createdAt}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-muted rounded-md p-2 text-center">
                        <div className="text-xs text-muted-foreground">域名</div>
                        <div className="font-medium">{project.assets.domains}</div>
                      </div>
                      <div className="bg-muted rounded-md p-2 text-center">
                        <div className="text-xs text-muted-foreground">IP</div>
                        <div className="font-medium">{project.assets.ips}</div>
                      </div>
                      <div className="bg-muted rounded-md p-2 text-center">
                        <div className="text-xs text-muted-foreground">Web</div>
                        <div className="font-medium">{project.assets.webs}</div>
                      </div>
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
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="outline" size="sm" disabled>
                  下一页
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
