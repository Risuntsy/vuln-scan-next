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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#/components/ui/table";
import { Badge } from "#/components/ui/badge";
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  StopCircle,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { DASHBOARD_ROUTE, NEW_PROJECT_ROUTE, PROJECTS_ROUTE } from "#/consts";
import { sleep } from "#/libs/utils";
import Header from "#/components/main/header";

// 模拟数据
const projects = [
  {
    id: "TASK-1234",
    domain: "example.com",
    status: "completed",
    assets: { domains: 12, ips: 24, webs: 8 },
    vulnerabilities: { high: 2, medium: 5, low: 8 },
    createdAt: "2023-05-15 14:30",
    updatedAt: "2023-05-15 15:45"
  },
  {
    id: "TASK-1233",
    domain: "test.org",
    status: "in-progress",
    assets: { domains: 8, ips: 16, webs: 6 },
    vulnerabilities: { high: 1, medium: 3, low: 5 },
    createdAt: "2023-05-15 13:20",
    updatedAt: "2023-05-15 13:20"
  },
  {
    id: "TASK-1232",
    domain: "demo.net",
    status: "in-progress",
    assets: { domains: 5, ips: 10, webs: 3 },
    vulnerabilities: { high: 0, medium: 2, low: 4 },
    createdAt: "2023-05-15 12:10",
    updatedAt: "2023-05-15 12:10"
  },
  {
    id: "TASK-1231",
    domain: "sample.io",
    status: "pending",
    assets: { domains: 0, ips: 0, webs: 0 },
    vulnerabilities: { high: 0, medium: 0, low: 0 },
    createdAt: "2023-05-15 11:00",
    updatedAt: "2023-05-15 11:00"
  },
  {
    id: "TASK-1230",
    domain: "dev.example.com",
    status: "completed",
    assets: { domains: 3, ips: 8, webs: 2 },
    vulnerabilities: { high: 1, medium: 2, low: 3 },
    createdAt: "2023-05-15 10:30",
    updatedAt: "2023-05-15 11:45"
  },
  {
    id: "TASK-1229",
    domain: "api.test.org",
    status: "completed",
    assets: { domains: 2, ips: 4, webs: 1 },
    vulnerabilities: { high: 0, medium: 1, low: 2 },
    createdAt: "2023-05-15 09:20",
    updatedAt: "2023-05-15 10:35"
  },
  {
    id: "TASK-1228",
    domain: "blog.demo.net",
    status: "failed",
    assets: { domains: 0, ips: 0, webs: 0 },
    vulnerabilities: { high: 0, medium: 0, low: 0 },
    createdAt: "2023-05-15 08:10",
    updatedAt: "2023-05-15 08:25"
  }
];

export default async function ProjectsPage() {
  await sleep(1000);

  return (
    <>
      <Header title="扫描任务" description="管理所有扫描任务" routes={[{ name: "仪表盘", href: DASHBOARD_ROUTE }, { name: "扫描任务" }]}>
        <Link href={NEW_PROJECT_ROUTE}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            新建扫描任务
          </Button>
        </Link>
      </Header>

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="搜索任务..." className="pl-8 w-[250px]" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      筛选
                      <ChevronDown className="w-4 h-4 ml-2" />
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
              <div className="flex items-center gap-2">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="每页行数" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">任务ID</TableHead>
                    <TableHead>域名</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>资产</TableHead>
                    <TableHead>漏洞</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        <Link href={`${PROJECTS_ROUTE}/${project.id}`} className="text-primary hover:underline">
                          {project.id}
                        </Link>
                      </TableCell>
                      <TableCell>{project.domain}</TableCell>
                      <TableCell>
                        {project.status === "completed" ? (
                          <Badge variant="default">已完成</Badge>
                        ) : project.status === "in-progress" ? (
                          <Badge variant="default" className="bg-green-500">
                            进行中
                          </Badge>
                        ) : project.status === "pending" ? (
                          <Badge variant="outline">等待中</Badge>
                        ) : (
                          <Badge variant="destructive">失败</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs">域名: {project.assets.domains}</span>
                          <span className="text-xs">IP: {project.assets.ips}</span>
                          <span className="text-xs">Web: {project.assets.webs}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
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
                      </TableCell>
                      <TableCell>{project.createdAt}</TableCell>
                      <TableCell>{project.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {project.status === "in-progress" ? (
                            <Button variant="ghost" size="icon" title="停止">
                              <StopCircle className="w-4 h-4" />
                            </Button>
                          ) : project.status !== "completed" ? (
                            <Button variant="ghost" size="icon" title="开始">
                              <Play className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" title="重新扫描">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`${PROJECTS_ROUTE}/${project.id}`}>查看详情</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`${PROJECTS_ROUTE}/${project.id}/report`}>导出报告</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                删除任务
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
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
