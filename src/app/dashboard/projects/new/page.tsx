"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Checkbox } from "#/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROJECTS_ROUTE } from "#/consts";

const formSchema = z.object({
  domain: z.string().min(1, "域名不能为空"),
  scanType: z.string(),
  description: z.string().optional(),
  options: z.object({
    subdomainScan: z.boolean().default(true),
    portScan: z.boolean().default(true),
    vulnScan: z.boolean().default(true),
    webScan: z.boolean().default(true)
  }),
  scanDepth: z.string().default("medium")
});

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scanType: "full",
      domain: "",
      description: "",
      options: {
        subdomainScan: true,
        portScan: true,
        vulnScan: true,
        webScan: true
      },
      scanDepth: "medium"
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);

    // 模拟API请求
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(PROJECTS_ROUTE);
    }, 1500);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-6 border-b">
        <Button variant="ghost" size="icon" className="mr-4 hover:cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">新建扫描任务</h1>
          <p className="text-muted-foreground">创建新的漏洞扫描任务</p>
        </div>
      </div>

      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>扫描配置</CardTitle>
            <CardDescription>配置扫描目标和扫描选项</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>目标域名</FormLabel>
                      <FormControl>
                        <Input placeholder="example.com" {...field} />
                      </FormControl>
                      <FormDescription>输入要扫描的域名，可以是一级、二级或三级域名</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scanType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>扫描类型</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择扫描类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full">完整扫描</SelectItem>
                          <SelectItem value="quick">快速扫描</SelectItem>
                          <SelectItem value="custom">自定义扫描</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>选择预设的扫描类型或自定义扫描选项</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>描述</FormLabel>
                      <FormControl>
                        <Textarea placeholder="输入任务描述（可选）" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel>扫描选项</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="options.subdomainScan"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>子域名扫描</FormLabel>
                            <FormDescription>发现目标域名的所有子域名</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.portScan"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>端口扫描</FormLabel>
                            <FormDescription>扫描目标IP的开放端口</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.webScan"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Web应用扫描</FormLabel>
                            <FormDescription>识别Web应用和服务</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.vulnScan"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>漏洞扫描</FormLabel>
                            <FormDescription>检测常见安全漏洞</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="scanDepth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>扫描深度</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择扫描深度" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">轻量 (快速但覆盖面小)</SelectItem>
                          <SelectItem value="medium">中等 (平衡速度和覆盖面)</SelectItem>
                          <SelectItem value="deep">深度 (全面但耗时较长)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>选择扫描的深度级别，影响扫描时间和覆盖范围</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Play className="w-4 h-4 mr-2 animate-pulse" />
                      正在创建...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      开始扫描
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
