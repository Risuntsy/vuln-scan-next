import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { AlertCircle, CheckCircle2, Clock, Play, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_ROUTE, NEW_PROJECT_ROUTE, PROJECTS_ROUTE } from "#/consts";
import Header from "#/components/main/header";

export default function Dashboard() {
  return (
    <>
      <Header title="仪表盘" description="系统概览和最近活动">
        <Link href={NEW_PROJECT_ROUTE}>
          <Button className="hover:cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            新建扫描任务
          </Button>
        </Link>
      </Header>

      <div className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">总扫描任务</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">
                较上月 <span className="text-green-500">+12.5%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">已发现漏洞</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">356</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="destructive" className="mr-1">
                  高危 24
                </Badge>
                <Badge className="mr-1 text-white bg-yellow-500 hover:bg-yellow-400">中危 78</Badge>
                <Badge variant="outline">低危 254</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">已发现资产</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,892</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="mr-2">域名: 245</span>
                <span className="mr-2">IP: 1,024</span>
                <span>Web: 623</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">活跃扫描</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                <span>正在进行中</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert variant="default">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>系统通知</AlertTitle>
          <AlertDescription>漏洞库已更新至最新版本 v2.4.1，包含 15 个新增漏洞特征。</AlertDescription>
        </Alert>

        <Tabs defaultValue="recent">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="recent">最近任务</TabsTrigger>
              <TabsTrigger value="vulnerabilities">最新漏洞</TabsTrigger>
            </TabsList>
            <Link href={PROJECTS_ROUTE} className="hover:underline">
              查看全部
            </Link>
          </div>

          <TabsContent value="recent" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      id: "TASK-1234",
                      domain: "example.com",
                      status: "completed",
                      time: "10分钟前"
                    },
                    {
                      id: "TASK-1233",
                      domain: "test.org",
                      status: "in-progress",
                      time: "25分钟前"
                    },
                    {
                      id: "TASK-1232",
                      domain: "demo.net",
                      status: "in-progress",
                      time: "1小时前"
                    },
                    {
                      id: "TASK-1231",
                      domain: "sample.io",
                      status: "pending",
                      time: "2小时前"
                    },
                    {
                      id: "TASK-1230",
                      domain: "dev.example.com",
                      status: "completed",
                      time: "3小时前"
                    }
                  ].map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                        ) : task.status === "in-progress" ? (
                          <RefreshCw className="w-5 h-5 mr-3 text-blue-500 animate-spin" />
                        ) : (
                          <Clock className="w-5 h-5 mr-3 text-yellow-500" />
                        )}
                        <div>
                          <div className="font-medium">{task.domain}</div>
                          <Link href={`${PROJECTS_ROUTE}/${task.id}`} className="text-sm hover:underline">
                            {task.id}
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-4">{task.time}</span>
                        <Button variant="ghost" size="icon">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      id: "CVE-2023-1234",
                      name: "Apache Log4j RCE",
                      severity: "high",
                      time: "1天前"
                    },
                    {
                      id: "CVE-2023-5678",
                      name: "Nginx 配置错误",
                      severity: "medium",
                      time: "2天前"
                    },
                    {
                      id: "CVE-2023-9012",
                      name: "SQL注入漏洞",
                      severity: "high",
                      time: "3天前"
                    },
                    {
                      id: "CVE-2023-3456",
                      name: "跨站脚本攻击",
                      severity: "medium",
                      time: "4天前"
                    },
                    {
                      id: "CVE-2023-7890",
                      name: "信息泄露",
                      severity: "low",
                      time: "5天前"
                    }
                  ].map((vuln) => (
                    <div key={vuln.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <Badge
                          variant={
                            vuln.severity === "high"
                              ? "destructive"
                              : vuln.severity === "medium"
                                ? "secondary"
                                : "outline"
                          }
                          className="mr-3"
                        >
                          {vuln.severity === "high" ? "高危" : vuln.severity === "medium" ? "中危" : "低危"}
                        </Badge>
                        <div>
                          <div className="font-medium">{vuln.name}</div>
                          <div className="text-sm text-muted-foreground">{vuln.id}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{vuln.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
