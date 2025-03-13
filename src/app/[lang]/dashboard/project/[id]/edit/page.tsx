"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "#/i18n";
import { projectDetails } from "#/api";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { Switch } from "#/components/ui/switch";
import { Badge } from "#/components/ui/badge";
import { Label } from "#/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";
import { Alert, AlertDescription } from "#/components/ui/alert";
import { ArrowLeft, Info, Calendar, AlertCircle } from "lucide-react";
import { DASHBOARD_ROUTE, useLanguageRoute } from "#/config";
import Header from "#/components/main/header";

export default function ProjectEditPage({ params }: { params: Promise<{ id: string; lang: Locale }> }) {
  const { id, lang } = use(params);
  const r = useLanguageRoute(lang);
  const router = useRouter();

  // Find project by ID or use the first one as default
  const project = projectDetails.find((p) => p.id === id) || projectDetails[0];

  // Form state
  const [projectName, setProjectName] = useState(project.domain);
  const [tags, setTags] = useState(["周期任务"]);
  const [cluster, setCluster] = useState("集群");
  const [historyData, setHistoryData] = useState(180);
  const [targets, setTargets] = useState("");
  const [ports, setPorts] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [associateSubdomains, setAssociateSubdomains] = useState(true);
  const [associateIPs, setAssociateIPs] = useState(true);
  const [associateCertIPs, setAssociateCertIPs] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [enableScanning, setEnableScanning] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    router.push(r(`/dashboard/projects/${id}`));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        routes={[
          { name: "仪表盘", href: DASHBOARD_ROUTE },
          { name: "扫描任务", href: r("/dashboard/projects") },
          { name: "编辑项目" }
        ]}
      >
        <Button variant="ghost" size="icon" className="mr-2 sm:mr-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span>
          <h1 className="text-xl sm:text-2xl font-bold">编辑项目</h1>
          <p className="text-muted-foreground text-sm">
            项目ID:{" "}
            <Badge variant="outline" className="ml-1">
              {project.id}
            </Badge>
          </p>
        </span>
      </Header>

      <div className="p-4 sm:p-6 overflow-y-auto flex-1">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName" className="font-medium">
                项目名称 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="资产探测"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="font-medium">
                标签
              </Label>
              <Select defaultValue="周期任务">
                <SelectTrigger>
                  <SelectValue placeholder="通过标签更好的管理项目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="周期任务">周期任务</SelectItem>
                  <SelectItem value="重要资产">重要资产</SelectItem>
                  <SelectItem value="临时任务">临时任务</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cluster" className="font-medium">
                扫描集群 <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="集群">
                <SelectTrigger>
                  <SelectValue placeholder="请选择扫描集群" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="集群">集群</SelectItem>
                  <SelectItem value="集群1">集群1</SelectItem>
                  <SelectItem value="集群2">集群2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="historyData" className="font-medium">
                历史数据
              </Label>
              <Input
                id="historyData"
                type="number"
                value={historyData}
                onChange={(e) => setHistoryData(parseInt(e.target.value))}
                min={0}
                max={730}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targets" className="font-medium">
              探测目标
            </Label>
            <Alert className="mb-2 text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <AlertDescription>根域名数量建议不超过50，IP数量不超过30000</AlertDescription>
            </Alert>
            <Textarea
              id="targets"
              value={targets}
              onChange={(e) => setTargets(e.target.value)}
              placeholder="目标列表，换行添加，支持如下格式
192.0.2.18-192.0.2.128
192.0.2.18/24
192.0.2.18
*.example.com或example.com 扫描根域名
admin.*.example.com 扫描admin.*.example.com的子域名
*-api.example.com 扫描-api.example.com的子域名
系统会将*替换为字典进行爆破，为提高扫描效率，请检查*位置
abc.example.com 导入子域名"
              rows={6}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ports" className="font-medium">
              探测端口
            </Label>
            <Alert className="mb-2 text-sm">
              <Info className="h-4 w-4 mr-2 flex-shrink-0" />
              <AlertDescription>IP数量过多时建议选择特定端口</AlertDescription>
            </Alert>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <Select defaultValue="全端口">
                <SelectTrigger>
                  <SelectValue placeholder="策略模板" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全端口">全端口</SelectItem>
                  <SelectItem value="常用端口">常用端口</SelectItem>
                  <SelectItem value="Web端口">Web端口</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="ports"
              value={ports}
              onChange={(e) => setPorts(e.target.value)}
              placeholder="支持 21-22,80 格式"
              rows={3}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificates" className="font-medium">
              关联主体或证书
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cert1">证书1</SelectItem>
                <SelectItem value="cert2">证书2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="notifications" className="font-medium block mb-2">
                开启通知
              </Label>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                <Label htmlFor="notifications" className="cursor-pointer">
                  开启动态通知
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium block mb-2">关联模式</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="associateSubdomains"
                    checked={associateSubdomains}
                    onCheckedChange={setAssociateSubdomains}
                  />
                  <Label htmlFor="associateSubdomains" className="cursor-pointer">
                    关联子域名
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="associateIPs" checked={associateIPs} onCheckedChange={setAssociateIPs} />
                  <Label htmlFor="associateIPs" className="cursor-pointer">
                    关联解析IP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="associateCertIPs" checked={associateCertIPs} onCheckedChange={setAssociateCertIPs} />
                  <Label htmlFor="associateCertIPs" className="cursor-pointer">
                    关联证书IP
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isPublic" className="font-medium block mb-2">
                团队内公开
              </Label>
              <div className="flex items-center space-x-2">
                <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="isPublic" className="cursor-pointer">
                  {isPublic ? "团队可见" : "仅自己可见"}
                </Label>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <Label htmlFor="enableScanning" className="font-medium block mb-2">
              开启探测
            </Label>
            <div className="flex items-center space-x-2">
              <Switch id="enableScanning" checked={enableScanning} onCheckedChange={setEnableScanning} />
              <Label htmlFor="enableScanning" className="cursor-pointer">
                开启资产探测
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium block mb-2">探测时间</Label>
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <Input type="date" className="w-[160px]" />
                </div>
                <span className="mx-2">至</span>
                <Input type="date" className="w-[160px]" />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="0">
                  <SelectTrigger>
                    <SelectValue placeholder="请选择扫描时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 点</SelectItem>
                    <SelectItem value="1">1 点</SelectItem>
                    <SelectItem value="2">2 点</SelectItem>
                    <SelectItem value="3">3 点</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="number" min={0} max={366} step={0.1} defaultValue={0} className="w-[100px]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-medium block">网站图标关联</Label>
              <p className="text-sm text-muted-foreground">点击图标删除</p>
              <div className="h-20 border rounded-md flex items-center justify-center bg-muted/20">
                <span className="text-sm text-muted-foreground">暂无图标</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium block">项目Logo</Label>
              <Input placeholder="输入Logo URL" />
              <div className="h-20 border rounded-md flex items-center justify-center bg-muted/20">
                <span className="text-sm text-muted-foreground">预览区域</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 sticky bottom-0 bg-background pb-4">
            <Button variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit">保存项目</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
