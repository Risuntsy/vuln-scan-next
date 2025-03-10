"use client";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Badge } from "#/components/ui/badge";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  Globe,
  Layers,
  Network,
  RefreshCw,
  Shield,
  StopCircle
} from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#/components/ui/table";
import { use, useState } from "react";
import { PROJECTS_ROUTE } from "#/consts";

const project = {
  id: "TASK-1234",
  domain: "example.com",
  status: "completed",
  progress: 100,
  startTime: "2023-05-15 14:30",
  endTime: "2023-05-15 15:45",
  duration: "1小时15分钟",
  domains: [
    {
      name: "example.com",
      status: "active",
      ips: [
        {
          address: "93.184.216.34",
          ports: [
            {
              number: 80,
              service: "HTTP",
              web: { title: "Example Domain", server: "nginx/1.18.0" }
            },
            {
              number: 443,
              service: "HTTPS",
              web: { title: "Example Domain", server: "nginx/1.18.0" }
            },
            { number: 22, service: "SSH", web: null }
          ]
        }
      ]
    },
    {
      name: "www.example.com",
      status: "active",
      ips: [
        {
          address: "93.184.216.34",
          ports: [
            {
              number: 80,
              service: "HTTP",
              web: { title: "Example Domain", server: "nginx/1.18.0" }
            },
            {
              number: 443,
              service: "HTTPS",
              web: { title: "Example Domain", server: "nginx/1.18.0" }
            }
          ]
        }
      ]
    },
    {
      name: "api.example.com",
      status: "active",
      ips: [
        {
          address: "93.184.216.35",
          ports: [
            {
              number: 80,
              service: "HTTP",
              web: { title: "API Documentation", server: "nginx/1.18.0" }
            },
            {
              number: 443,
              service: "HTTPS",
              web: { title: "API Documentation", server: "nginx/1.18.0" }
            }
          ]
        }
      ]
    },
    {
      name: "blog.example.com",
      status: "active",
      ips: [
        {
          address: "93.184.216.36",
          ports: [
            {
              number: 80,
              service: "HTTP",
              web: { title: "Example Blog", server: "Apache/2.4.41" }
            },
            {
              number: 443,
              service: "HTTPS",
              web: { title: "Example Blog", server: "Apache/2.4.41" }
            },
            {
              number: 8080,
              service: "HTTP-Proxy",
              web: { title: "Blog Admin", server: "Apache/2.4.41" }
            }
          ]
        }
      ]
    },
    {
      name: "dev.example.com",
      status: "inactive",
      ips: [
        {
          address: "93.184.216.37",
          ports: [
            { number: 80, service: "HTTP", web: null },
            { number: 443, service: "HTTPS", web: null },
            { number: 3306, service: "MySQL", web: null }
          ]
        }
      ]
    }
  ],
  vulnerabilities: [
    {
      id: "VUL-001",
      name: "SQL注入漏洞",
      severity: "high",
      url: "https://api.example.com/users",
      domain: "api.example.com",
      ip: "93.184.216.35",
      port: 443
    },
    {
      id: "VUL-002",
      name: "XSS漏洞",
      severity: "medium",
      url: "https://blog.example.com/post",
      domain: "blog.example.com",
      ip: "93.184.216.36",
      port: 443
    },
    {
      id: "VUL-003",
      name: "CSRF漏洞",
      severity: "medium",
      url: "https://example.com/account",
      domain: "example.com",
      ip: "93.184.216.34",
      port: 443
    },
    {
      id: "VUL-004",
      name: "信息泄露",
      severity: "low",
      url: "https://example.com/about",
      domain: "example.com",
      ip: "93.184.216.34",
      port: 443
    },
    {
      id: "VUL-005",
      name: "弱密码",
      severity: "low",
      url: "https://example.com/login",
      domain: "example.com",
      ip: "93.184.216.34",
      port: 443
    }
  ]
};

// 统计数据
const stats = {
  domains: project.domains.length,
  ips: project.domains.reduce((acc, domain) => acc + domain.ips.length, 0),
  ports: project.domains.reduce((acc, domain) => acc + domain.ips.reduce((acc2, ip) => acc2 + ip.ports.length, 0), 0),
  webs: project.domains.reduce(
    (acc, domain) =>
      acc + domain.ips.reduce((acc2, ip) => acc2 + ip.ports.filter((port) => port.web !== null).length, 0),
    0
  )
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // TODO
  const { id } = use(params);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});
  const [expandedIPs, setExpandedIPs] = useState<Record<string, boolean>>({});

  const toggleDomain = (domainName: string) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [domainName]: !prev[domainName]
    }));
  };

  const toggleIP = (domainName: string, ipAddress: string) => {
    const key = `${domainName}-${ipAddress}`;
    setExpandedIPs((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-6 border-b">
        <Link href={PROJECTS_ROUTE}>
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-3">{project.domain}</h1>
            <Badge variant="outline">{project.id}</Badge>
            {project.status === "completed" ? (
              <Badge variant="default" className="ml-2">
                已完成
              </Badge>
            ) : project.status === "in-progress" ? (
              <Badge variant="default" className="ml-2 bg-blue-500">
                进行中
              </Badge>
            ) : project.status === "pending" ? (
              <Badge variant="outline" className="ml-2">
                等待中
              </Badge>
            ) : (
              <Badge variant="destructive" className="ml-2">
                失败
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            开始时间: {project.startTime} | 结束时间: {project.endTime} | 持续时间: {project.duration}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {project.status === "in-progress" ? (
            <Button variant="outline">
              <StopCircle className="w-4 h-4 mr-2" />
              停止扫描
            </Button>
          ) : (
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              重新扫描
            </Button>
          )}
          <Button>
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">域名资产</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.domains}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Globe className="w-3 h-3 mr-1" />
                <span>已发现域名</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">IP资产</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ips}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Network className="w-3 h-3 mr-1" />
                <span>已发现IP地址</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Web资产</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.webs}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Layers className="w-3 h-3 mr-1" />
                <span>已发现Web应用</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">漏洞</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.vulnerabilities.length}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Shield className="w-3 h-3 mr-1" />
                <span>已发现安全漏洞</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assets">
          <TabsList className="mb-4">
            <TabsTrigger value="assets">资产视图</TabsTrigger>
            <TabsTrigger value="vulnerabilities">漏洞列表</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {project.domains.map((domain, domainIndex) => (
                    <div key={`domain-${domainIndex}`} className="border rounded-md">
                      <div
                        className="flex items-center p-4 cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleDomain(domain.name)}
                      >
                        <Button variant="ghost" size="icon" className="mr-2">
                          {expandedDomains[domain.name] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <Globe className="w-4 h-4 mr-2" />
                        <span className="font-medium">{domain.name}</span>
                        <Badge variant={domain.status === "active" ? "default" : "outline"} className="ml-2">
                          {domain.status === "active" ? "活跃" : "未活跃"}
                        </Badge>
                      </div>

                      {expandedDomains[domain.name] && (
                        <div className="border-t p-4 pl-12">
                          {domain.ips.map((ip, ipIndex) => (
                            <div key={`ip-${domainIndex}-${ipIndex}`} className="border rounded-md mb-4 last:mb-0">
                              <div
                                className="flex items-center p-4 cursor-pointer hover:bg-muted/50"
                                onClick={() => toggleIP(domain.name, ip.address)}
                              >
                                <Button variant="ghost" size="icon" className="mr-2">
                                  {expandedIPs[`${domain.name}-${ip.address}`] ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                                <Network className="w-4 h-4 mr-2" />
                                <span className="font-medium">{ip.address}</span>
                                <Badge variant="outline" className="ml-2">
                                  {ip.ports.length} 个端口
                                </Badge>
                              </div>

                              {expandedIPs[`${domain.name}-${ip.address}`] && (
                                <div className="border-t p-4">
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>端口</TableHead>
                                          <TableHead>服务</TableHead>
                                          <TableHead>Web应用</TableHead>
                                          <TableHead className="text-right">操作</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {ip.ports.map((port, portIndex) => (
                                          <TableRow key={`port-${domainIndex}-${ipIndex}-${portIndex}`}>
                                            <TableCell>{port.number}</TableCell>
                                            <TableCell>{port.service}</TableCell>
                                            <TableCell>
                                              {port.web ? (
                                                <div>
                                                  <div className="font-medium">{port.web.title}</div>
                                                  <div className="text-xs text-muted-foreground">{port.web.server}</div>
                                                </div>
                                              ) : (
                                                <span className="text-muted-foreground">-</span>
                                              )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                              {port.web && (
                                                <Button variant="ghost" size="icon" asChild>
                                                  <a
                                                    href={`http${port.number === 443 ? "s" : ""}://${domain.name}${
                                                      port.number !== 80 && port.number !== 443 ? `:${port.number}` : ""
                                                    }`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    <ExternalLink className="w-4 h-4" />
                                                  </a>
                                                </Button>
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="m-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>漏洞名称</TableHead>
                      <TableHead>严重程度</TableHead>
                      <TableHead>域名</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>端口</TableHead>
                      <TableHead>URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.vulnerabilities.map((vuln, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{vuln.id}</TableCell>
                        <TableCell>{vuln.name}</TableCell>
                        <TableCell>
                          {vuln.severity === "high" ? (
                            <Badge variant="destructive">高危</Badge>
                          ) : vuln.severity === "medium" ? (
                            <Badge className="bg-yellow-500 text-white hover:bg-yellow-400">中危</Badge>
                          ) : (
                            <Badge variant="outline">低危</Badge>
                          )}
                        </TableCell>
                        <TableCell>{vuln.domain}</TableCell>
                        <TableCell>{vuln.ip}</TableCell>
                        <TableCell>{vuln.port}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="truncate max-w-[200px]">{vuln.url}</span>
                            <Button variant="ghost" size="icon" asChild className="ml-2">
                              <a href={vuln.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
