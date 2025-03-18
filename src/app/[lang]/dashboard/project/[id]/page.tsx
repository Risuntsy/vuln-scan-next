"use client";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Badge } from "#/components/ui/badge";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Mail,
  Network,
  RefreshCw,
  Search,
  Settings,
  Shield,
  StopCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#/components/ui/table";
import { use, useState } from "react";
import { Locale } from "#/i18n";
import { useRouter } from "next/navigation";
import { projectDetails } from "#/api/mock-data";
import { useLanguageRoute } from "#/config";
import { Header } from "#/components";
export default function ProjectDetailPage({ params }: { params: Promise<{ id: string; lang: Locale }> }) {
  const { id, lang } = use(params);
  const r = useLanguageRoute(lang);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});
  const [expandedIPs, setExpandedIPs] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // const project = projectDetails.find((p) => p.id === id);
  const project = projectDetails[0];

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
      <Header>
        <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
          <div className="flex">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="truncate">
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-xl md:text-2xl font-bold truncate">{project.domain}</h1>
                <Badge variant="outline">{project.id}</Badge>
                {project.status === "completed" ? (
                  <Badge variant="default">
                    已完成
                  </Badge>
                ) : project.status === "in-progress" ? (
                  <Badge variant="default" className="bg-blue-500">
                    进行中
                  </Badge>
                ) : project.status === "pending" ? (
                  <Badge variant="outline">
                    等待中
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    失败
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                开始时间: {project.startTime} | 结束时间: {project.endTime} | 持续时间: {project.duration}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-end items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/project`)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">项目列表</span>
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">切换项目</span>
            </Button>
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
        <div className="w-64 border-r p-4 space-y-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <Layers className="w-4 h-4 mr-2" />
            项目概览
          </Button>
          <Button
            variant={activeTab === "vulnerabilities" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("vulnerabilities")}
          >
            <Shield className="w-4 h-4 mr-2" />
            漏洞管理
          </Button>
          <Button
            variant={activeTab === "ports" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("ports")}
          >
            <Network className="w-4 h-4 mr-2" />
            端口信息
          </Button>
          <Button
            variant={activeTab === "websites" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("websites")}
          >
            <Globe className="w-4 h-4 mr-2" />
            网站列表
          </Button>
          <Button
            variant={activeTab === "domains" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("domains")}
          >
            <Globe className="w-4 h-4 mr-2" />
            域名列表
          </Button>
          <Button
            variant={activeTab === "screenshots" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("screenshots")}
          >
            {/* <Image className="w-4 h-4 mr-2" /> */}
            {/* TODO: 添加服务截图图标 */}
            服务截图
          </Button>
          <Button
            variant={activeTab === "requests" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("requests")}
          >
            <FileText className="w-4 h-4 mr-2" />
            请求数据
          </Button>
          <Button
            variant={activeTab === "emails" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("emails")}
          >
            <Mail className="w-4 h-4 mr-2" />
            邮箱列表
          </Button>
          <Button
            variant={activeTab === "leaks" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("leaks")}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            信息泄露
          </Button>
          <Button
            variant={activeTab === "clues" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("clues")}
          >
            <Search className="w-4 h-4 mr-2" />
            资产线索
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            项目设置
          </Button>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">域名资产</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{project.domains.length}</div>
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
                    <div className="text-2xl font-bold">{project.domains.length}</div>
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
                    <div className="text-2xl font-bold">{project.domains.length}</div>
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

              <Card>
                <CardHeader>
                  <CardTitle>资产概览</CardTitle>
                </CardHeader>
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
                                                    <div className="text-xs text-muted-foreground">
                                                      {port.web.server}
                                                    </div>
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
                                                        port.number !== 80 && port.number !== 443
                                                          ? `:${port.number}`
                                                          : ""
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
            </div>
          )}

          {activeTab === "vulnerabilities" && (
            <Card>
              <CardHeader>
                <CardTitle>漏洞管理</CardTitle>
              </CardHeader>
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
          )}

          {activeTab === "ports" && (
            <Card>
              <CardHeader>
                <CardTitle>端口信息</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">端口信息页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "websites" && (
            <Card>
              <CardHeader>
                <CardTitle>网站列表</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">网站列表页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "domains" && (
            <Card>
              <CardHeader>
                <CardTitle>域名列表</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">域名列表页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "screenshots" && (
            <Card>
              <CardHeader>
                <CardTitle>服务截图</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">服务截图页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "requests" && (
            <Card>
              <CardHeader>
                <CardTitle>请求数据</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">请求数据页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "emails" && (
            <Card>
              <CardHeader>
                <CardTitle>邮箱列表</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">邮箱列表页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "leaks" && (
            <Card>
              <CardHeader>
                <CardTitle>信息泄露</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">信息泄露页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "clues" && (
            <Card>
              <CardHeader>
                <CardTitle>资产线索</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">资产线索页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>项目设置</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">项目设置页面内容将在此处显示</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
