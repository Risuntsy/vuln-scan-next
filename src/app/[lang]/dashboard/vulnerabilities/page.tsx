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
import { ChevronDown, Download, ExternalLink, Filter, MoreHorizontal, Search } from "lucide-react";
import { DASHBOARD_ROUTE, PROJECT_ROUTE } from "#/config";
import Link from "next/link";
import Header from "#/components/main/header";

import { vulnerabilities } from "#/api/mock-data";

export default function VulnerabilitiesPage() {
  return (
    <>
      <Header
        routes={[{ name: "仪表盘", href: DASHBOARD_ROUTE }, { name: "漏洞库" }]}
      >
        <div>
          <h1 className="text-2xl font-bold">漏洞库</h1>
          <p className="text-muted-foreground text-sm">管理所有发现的安全漏洞</p>
        </div>
      </Header>

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="搜索漏洞..." className="pl-8 w-[250px]" />
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
                    <DropdownMenuItem>全部漏洞</DropdownMenuItem>
                    <DropdownMenuItem>高危漏洞</DropdownMenuItem>
                    <DropdownMenuItem>中危漏洞</DropdownMenuItem>
                    <DropdownMenuItem>低危漏洞</DropdownMenuItem>
                    <DropdownMenuItem>未修复漏洞</DropdownMenuItem>
                    <DropdownMenuItem>已修复漏洞</DropdownMenuItem>
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
                    <TableHead>ID</TableHead>
                    <TableHead>漏洞名称</TableHead>
                    <TableHead>严重程度</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>所属项目</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>发现时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vulnerabilities.map((vuln, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vuln.id}</TableCell>
                      <TableCell>{vuln.name}</TableCell>
                      <TableCell>
                        {vuln.severity === "high" ? (
                          <Badge variant="destructive">高危</Badge>
                        ) : vuln.severity === "medium" ? (
                          <Badge className="bg-yellow-500 text-white" variant="secondary">
                            中危
                          </Badge>
                        ) : (
                          <Badge variant="outline">低危</Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[140px] truncate">{vuln.url}</TableCell>
                      <TableCell>
                        <Link href={`${PROJECT_ROUTE}/${vuln.project}`}>{vuln.project}</Link>
                      </TableCell>
                      <TableCell>
                        {vuln.status === "open" ? (
                          <Badge variant="destructive">未修复</Badge>
                        ) : (
                          <Badge variant="default">已修复</Badge>
                        )}
                      </TableCell>
                      <TableCell>{vuln.discoveredAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" asChild>
                            <a href={vuln.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>查看详情</DropdownMenuItem>
                              <DropdownMenuItem>标记为已修复</DropdownMenuItem>
                              <DropdownMenuItem>导出报告</DropdownMenuItem>
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
              <div className="text-sm text-muted-foreground">显示 1-10 共 10 条记录</div>
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
