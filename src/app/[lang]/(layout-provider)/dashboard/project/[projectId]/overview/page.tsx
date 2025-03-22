"use client";

import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "#/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Table } from "#/components/ui/table";
import { Button } from "#/components/ui/button";
import { Globe, Network, Layers, Shield, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { Locale } from "#/i18n";
import { use, useState } from "react";
import { useLanguageRoute } from "#/routes";
import { projectDetails } from "#/api";
import { Badge } from "#/components";

export default function ProjectOverviewPage({ params }: { params: Promise<{ projectId: string; lang: Locale }> }) {
  const { projectId, lang } = use(params);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});
  const [expandedIPs, setExpandedIPs] = useState<Record<string, boolean>>({});
  const r = useLanguageRoute(lang);

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
    </div>
  );
}
