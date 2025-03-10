"use client";

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
import Link from "next/link";
import { sleep } from "#/libs/utils";

// 模拟数据 - 体现层级关系
const webAssets = [
  {
    url: "https://example.com",
    title: "Example Domain",
    server: "nginx/1.18.0",
    status: 200,
    technologies: ["nginx", "jQuery", "Bootstrap"],
    project: "TASK-1234",
    discoveredAt: "2023-05-15",
    domain: "example.com",
    ip: "93.184.216.34",
    port: 443
  },
  {
    url: "http://example.com",
    title: "Example Domain",
    server: "nginx/1.18.0",
    status: 200,
    technologies: ["nginx", "jQuery", "Bootstrap"],
    project: "TASK-1234",
    discoveredAt: "2023-05-15",
    domain: "example.com",
    ip: "93.184.216.34",
    port: 80
  },
  {
    url: "https://www.example.com",
    title: "Example Domain",
    server: "nginx/1.18.0",
    status: 200,
    technologies: ["nginx", "jQuery", "Bootstrap"],
    project: "TASK-1234",
    discoveredAt: "2023-05-15",
    domain: "www.example.com",
    ip: "93.184.216.34",
    port: 443
  },
  {
    url: "https://api.example.com",
    title: "API Documentation",
    server: "nginx/1.18.0",
    status: 200,
    technologies: ["nginx", "Swagger", "Node.js"],
    project: "TASK-1234",
    discoveredAt: "2023-05-15",
    domain: "api.example.com",
    ip: "93.184.216.35",
    port: 443
  },
  {
    url: "https://blog.example.com",
    title: "Example Blog",
    server: "Apache/2.4.41",
    status: 200,
    technologies: ["Apache", "WordPress", "PHP"],
    project: "TASK-1234",
    discoveredAt: "2023-05-15",
    domain: "blog.example.com",
    ip: "93.184.216.36",
    port: 443
  },
  {
    url: "http://blog.example.com:8080",
    title: "Blog Admin",
    server: "Apache/2.4.41",
    status: 200,
    technologies: ["Apache", "WordPress", "PHP"],
    project: "TASK-1234",
    discoveredAt: "2023-05-15",
    domain: "blog.example.com",
    ip: "93.184.216.36",
    port: 8080
  },
  {
    url: "https://test.org",
    title: "Test Organization",
    server: "nginx/1.20.0",
    status: 200,
    technologies: ["nginx", "React", "Node.js"],
    project: "TASK-1233",
    discoveredAt: "2023-05-15",
    domain: "test.org",
    ip: "192.0.2.1",
    port: 443
  }
];

export default function WebAssetsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Web资产</h1>
          <p className="text-muted-foreground">管理所有发现的Web应用资产</p>
        </div>
      </div>

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="搜索URL或标题..." className="pl-8 w-[250px]" />
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
                    <DropdownMenuItem>全部Web资产</DropdownMenuItem>
                    <DropdownMenuItem>按服务器类型筛选</DropdownMenuItem>
                    <DropdownMenuItem>按技术栈筛选</DropdownMenuItem>
                    <DropdownMenuItem>按项目筛选</DropdownMenuItem>
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
                    <TableHead>URL</TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>域名</TableHead>
                    <TableHead>IP:端口</TableHead>
                    <TableHead>服务器</TableHead>
                    <TableHead>状态码</TableHead>
                    <TableHead>技术栈</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webAssets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium max-w-[200px] truncate">{asset.url}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{asset.title}</TableCell>
                      <TableCell>
                        <Link href={`/assets/domains?domain=${asset.domain}`} className="text-primary hover:underline">
                          {asset.domain}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/assets/ips?ip=${asset.ip}`} className="text-primary hover:underline">
                          {asset.ip}:{asset.port}
                        </Link>
                      </TableCell>
                      <TableCell>{asset.server}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            asset.status >= 200 && asset.status < 300
                              ? "default"
                              : asset.status >= 300 && asset.status < 400
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {asset.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {asset.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="mr-1">
                            {tech}
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" asChild>
                            <a href={asset.url} target="_blank" rel="noopener noreferrer">
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
                              <DropdownMenuItem>截图预览</DropdownMenuItem>
                              <DropdownMenuItem>漏洞扫描</DropdownMenuItem>
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
    </div>
  );
}
