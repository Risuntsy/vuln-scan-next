"use server";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { AlertCircle, CheckCircle2, Clock, Play, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { NEW_PROJECT_ROUTE, PROJECT_LIST_ROUTE } from "#/routes";
import Header from "#/components/main/header";
import { getAssetStatistics, getNodeData, getTaskData } from "#/actions/dashboard";
import { Suspense } from "react";
import { Skeleton } from "#/components/ui/skeleton";

// 加载状态组件
function LoadingSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                    <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-[100px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-7 w-[60px] mb-2" />
                        <Skeleton className="h-4 w-[120px]" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

async function OverviewCards() {
    const [assetStats, taskData, nodeData] = await Promise.all([
        getAssetStatistics(),
        getTaskData({ pageSize: 5 }),
        getNodeData()
    ]);

    const runningTasks = nodeData.data.list.reduce((acc, node) => acc + node.running, 0);

    const cards = [
        {
            title: "总扫描任务",
            value: taskData.data.total.toString(),
            footer: (
                <p className="text-xs text-muted-foreground">
                    进行中 <span className="text-green-500">{runningTasks}</span>
                </p>
            )
        },
        {
            title: "已发现漏洞",
            value: assetStats.data.data.vulnerabilityCount.toString(),
            footer: (
                <div className="flex items-center text-xs text-muted-foreground">
                    <Badge variant="destructive" className="mr-1">
                        高危 24
                    </Badge>
                    <Badge className="mr-1 text-white bg-yellow-500 hover:bg-yellow-400">中危 78</Badge>
                    <Badge variant="outline">低危 254</Badge>
                </div>
            )
        },
        {
            title: "已发现资产",
            value: assetStats.data.data.asetCount.toString(),
            footer: (
                <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2">域名: {assetStats.data.data.subdomainCount}</span>
                    <span className="mr-2">敏感: {assetStats.data.data.sensitiveCount}</span>
                    <span>URL: {assetStats.data.data.urlCount}</span>
                </div>
            )
        },
        {
            title: "活跃扫描",
            value: runningTasks.toString(),
            footer: (
                <div className="flex items-center text-xs text-muted-foreground">
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    <span>正在进行中</span>
                </div>
            )
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <Card key={index}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        {card.footer}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

async function RecentTasks() {
    const { data } = await getTaskData({ pageSize: 3 });

    const taskStatusMap: Record<
        string,
        {
            icon: typeof Play | typeof CheckCircle2 | typeof Clock;
            iconColor: string;
            status: string;
            statusClass?: string;
        }
    > = {
        running: { icon: Play, iconColor: "text-green-500", status: "进行中" },
        completed: { icon: CheckCircle2, iconColor: "text-green-500", status: "已完成", statusClass: "bg-green-50" },
        pending: { icon: Clock, iconColor: "text-yellow-500", status: "计划中" }
    };

    const tasks = data.list.map((task) => {
        const status = task.progress === "100" ? "completed" : task.progress === "0" ? "pending" : "running";
        const statusConfig = taskStatusMap[status];

        return {
            icon: statusConfig.icon,
            iconColor: statusConfig.iconColor,
            title: task.name,
            subtitle: `任务编号: ${task.taskNum}`,
            status: statusConfig.status,
            time: task.creatTime,
            statusClass: statusConfig.statusClass
        };
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">最近任务</CardTitle>
                <Link href={PROJECT_LIST_ROUTE}>
                    <Button variant="secondary" size="sm">
                        查看全部
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <task.icon className={`w-4 h-4 mr-2 ${task.iconColor}`} />
                                <div>
                                    <p className="text-sm font-medium">{task.title}</p>
                                    <p className="text-xs text-muted-foreground">{task.subtitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Badge variant="outline" className={`mr-2 ${task.statusClass || ""}`}>
                                    {task.status}
                                </Badge>
                                <p className="text-xs text-muted-foreground">{task.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default function Dashboard() {
    const overviewCards = [
        {
            title: "总扫描任务",
            value: "128",
            footer: (
                <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">+12.5%</span>
                </p>
            )
        },
        {
            title: "已发现漏洞",
            value: "356",
            footer: (
                <div className="flex items-center text-xs text-muted-foreground">
                    <Badge variant="destructive" className="mr-1">
                        高危 24
                    </Badge>
                    <Badge className="mr-1 text-white bg-yellow-500 hover:bg-yellow-400">中危 78</Badge>
                    <Badge variant="outline">低危 254</Badge>
                </div>
            )
        },
        {
            title: "已发现资产",
            value: "1,892",
            footer: (
                <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2">域名: 245</span>
                    <span className="mr-2">IP: 1,024</span>
                    <span>Web: 623</span>
                </div>
            )
        },
        {
            title: "活跃扫描",
            value: "5",
            footer: (
                <div className="flex items-center text-xs text-muted-foreground">
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    <span>正在进行中</span>
                </div>
            )
        }
    ];

    const assetTimeline = [
        {
            title: "发现新域名",
            subtitle: "dev.example.com",
            alertTitle: "关联到主域名 example.com",
            alertDesc: "发现3个开放端口，2个Web服务",
            time: "10分钟前"
        },
        {
            title: "新增IP资产",
            subtitle: "192.168.1.25",
            alertTitle: "内网服务器",
            alertDesc: "运行MySQL数据库，开放3306端口",
            time: "1小时前"
        },
        {
            title: "资产变更",
            subtitle: "api.example.com",
            alertTitle: "服务更新",
            alertDesc: "检测到Nginx版本从1.18.0更新到1.20.1",
            time: "3小时前"
        },
        {
            title: "新增Web应用",
            subtitle: "shop.example.com",
            alertTitle: "电子商务应用",
            alertDesc: "使用WordPress平台，检测到15个插件",
            time: "昨天"
        }
    ];

    const recentTasks = [
        {
            icon: Play,
            iconColor: "text-green-500",
            title: "全面资产扫描",
            subtitle: "example.com",
            status: "进行中",
            time: "2分钟前"
        },
        {
            icon: CheckCircle2,
            iconColor: "text-green-500",
            title: "漏洞扫描",
            subtitle: "api.example.org",
            status: "已完成",
            time: "1小时前",
            statusClass: "bg-green-50"
        },
        {
            icon: Clock,
            iconColor: "text-yellow-500",
            title: "定期安全检查",
            subtitle: "internal.example.net",
            status: "计划中",
            time: "明天"
        }
    ];

    const latestVulnerabilities: {
        iconColor: string;
        title: string;
        subtitle: string;
        severity: string;
        badgeVariant?: "destructive" | "outline" | "default" | "secondary";
        badgeClass?: string;
    }[] = [
        {
            iconColor: "text-red-500",
            title: "SQL注入漏洞",
            subtitle: "app.example.com/login",
            severity: "高危",
            badgeVariant: "destructive"
        },
        {
            iconColor: "text-yellow-500",
            title: "跨站脚本攻击 (XSS)",
            subtitle: "blog.example.com/comments",
            severity: "中危",
            badgeClass: "bg-yellow-500 hover:bg-yellow-400"
        },
        {
            iconColor: "text-blue-500",
            title: "信息泄露",
            subtitle: "api.example.com/v1/users",
            severity: "低危",
            badgeVariant: "outline"
        }
    ];

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
                <Suspense fallback={<LoadingSkeleton />}>
                    <OverviewCards />
                </Suspense>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-md font-medium">资产动态</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative space-y-0">
                                <div className="absolute left-1.5 top-2 bottom-0 w-0.5 bg-border"></div>
                                {assetTimeline.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`relative pl-6 ${index !== assetTimeline.length - 1 ? "pb-6" : ""}`}
                                    >
                                        <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary"></div>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium">{item.title}</p>
                                            <p className="text-xs text-muted-foreground mb-1">{item.subtitle}</p>
                                            <Alert className="py-2">
                                                <AlertTitle className="text-xs font-medium">
                                                    {item.alertTitle}
                                                </AlertTitle>
                                                <AlertDescription className="text-xs">
                                                    {item.alertDesc}
                                                </AlertDescription>
                                            </Alert>
                                            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Suspense fallback={<LoadingSkeleton />}>
                            <RecentTasks />
                        </Suspense>

                        <Card>
                            <CardHeader className="flex flex-row items-center pb-2">
                                <CardTitle className="text-md font-medium">最新漏洞</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {latestVulnerabilities.map((vuln, index) => (
                                        <div key={index} className="flex items-start justify-between">
                                            <div className="flex items-start">
                                                <AlertCircle className={`w-4 h-4 mr-2 mt-0.5 ${vuln.iconColor}`} />
                                                <div>
                                                    <p className="text-sm font-medium">{vuln.title}</p>
                                                    <p className="text-xs text-muted-foreground">{vuln.subtitle}</p>
                                                </div>
                                            </div>
                                            <Badge variant={vuln.badgeVariant} className={vuln.badgeClass}>
                                                {vuln.severity}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
