import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { AlertCircle, CheckCircle2, Clock, Play, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { NEW_PROJECT_ROUTE, PROJECT_ROUTE, VULNERABILITIES_ROUTE, ASSETS_ROUTE } from "#/config";
import Header from "#/components/main/header";

export default function Dashboard() {
  return (
    <>
      <Header>
        <div className="flex items-center gap-2 justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold">仪表盘</h1>
            <p className="text-muted-foreground text-sm">系统概览和最近活动</p>
          </div>
          <Link href={NEW_PROJECT_ROUTE}>
            <Button className="hover:cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              新建扫描任务
            </Button>
          </Link>
        </div>
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 资产动态时间线 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">资产动态</CardTitle>
              <Link href={ASSETS_ROUTE}>
                <Button variant="secondary" size="sm">
                  查看全部
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {/* 时间线连接线 */}
                <div className="absolute left-1.5 top-2 bottom-0 w-0.5 bg-border"></div>

                {/* 时间线项目 */}
                <div className="relative pl-6 pb-6">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">发现新域名</p>
                    <p className="text-xs text-muted-foreground mb-1">dev.example.com</p>
                    <Alert className="py-2">
                      <AlertTitle className="text-xs font-medium">关联到主域名 example.com</AlertTitle>
                      <AlertDescription className="text-xs">发现3个开放端口，2个Web服务</AlertDescription>
                    </Alert>
                    <p className="text-xs text-muted-foreground mt-1">10分钟前</p>
                  </div>
                </div>

                <div className="relative pl-6 pb-6">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">新增IP资产</p>
                    <p className="text-xs text-muted-foreground mb-1">192.168.1.25</p>
                    <Alert className="py-2">
                      <AlertTitle className="text-xs font-medium">内网服务器</AlertTitle>
                      <AlertDescription className="text-xs">运行MySQL数据库，开放3306端口</AlertDescription>
                    </Alert>
                    <p className="text-xs text-muted-foreground mt-1">1小时前</p>
                  </div>
                </div>

                <div className="relative pl-6 pb-6">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">资产变更</p>
                    <p className="text-xs text-muted-foreground mb-1">api.example.com</p>
                    <Alert className="py-2">
                      <AlertTitle className="text-xs font-medium">服务更新</AlertTitle>
                      <AlertDescription className="text-xs">检测到Nginx版本从1.18.0更新到1.20.1</AlertDescription>
                    </Alert>
                    <p className="text-xs text-muted-foreground mt-1">3小时前</p>
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">新增Web应用</p>
                    <p className="text-xs text-muted-foreground mb-1">shop.example.com</p>
                    <Alert className="py-2">
                      <AlertTitle className="text-xs font-medium">电子商务应用</AlertTitle>
                      <AlertDescription className="text-xs">使用WordPress平台，检测到15个插件</AlertDescription>
                    </Alert>
                    <p className="text-xs text-muted-foreground mt-1">昨天</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 最近任务和最新漏洞 */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">最近任务</CardTitle>
                <Link href={PROJECT_ROUTE}>
                  <Button variant="secondary" size="sm">
                    查看全部
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-2 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">全面资产扫描</p>
                        <p className="text-xs text-muted-foreground">example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        进行中
                      </Badge>
                      <p className="text-xs text-muted-foreground">2分钟前</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">漏洞扫描</p>
                        <p className="text-xs text-muted-foreground">api.example.org</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-green-50">
                        已完成
                      </Badge>
                      <p className="text-xs text-muted-foreground">1小时前</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">定期安全检查</p>
                        <p className="text-xs text-muted-foreground">internal.example.net</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        计划中
                      </Badge>
                      <p className="text-xs text-muted-foreground">明天</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">最新漏洞</CardTitle>
                <Link href={VULNERABILITIES_ROUTE}>
                  <Button variant="secondary" size="sm">
                    查看全部
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">SQL注入漏洞</p>
                        <p className="text-xs text-muted-foreground">app.example.com/login</p>
                      </div>
                    </div>
                    <Badge variant="destructive">高危</Badge>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">跨站脚本攻击 (XSS)</p>
                        <p className="text-xs text-muted-foreground">blog.example.com/comments</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500 hover:bg-yellow-400">中危</Badge>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">信息泄露</p>
                        <p className="text-xs text-muted-foreground">api.example.com/v1/users</p>
                      </div>
                    </div>
                    <Badge variant="outline">低危</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
