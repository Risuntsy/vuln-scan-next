"use client";

import type React from "react";

import { use, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Alert, AlertDescription } from "#/components/ui/alert";
import { Lock, User } from "lucide-react";
import { Locale } from "#/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotification } from "#/contexts/notification-context";
import { DASHBOARD_ROUTE, useLanguageRoute } from "#/routes";

export default function LoginPage({
  searchParams,
  params
}: {
  searchParams: Promise<{ redirect?: string }>;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = use(params);
  const { setNotification } = useNotification();
  const [username, setUsername] = useState("ScopeSentry");
  const [password, setPassword] = useState("HVTFqCGI");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const r = useLanguageRoute(lang);
  const queryParams = useSearchParams();

  const submitAction = async (action: () => any) => {
    setIsSubmitting(true);
    const result = await action();
    if (!result?.success) {
      setError(result?.error || "登录失败");
    }
    setNotification({
      message: "登录成功",
      type: "success"
    });
    router.push(queryParams.get("redirect") || r(DASHBOARD_ROUTE));
    setIsSubmitting(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">漏洞扫描系统</CardTitle>
          <CardDescription className="text-center">请输入您的账号和密码登录</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formAction = async () => await handleLogin(new FormData(e.currentTarget));
              await submitAction(formAction);
            }}
          > */}
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              router.push(r(DASHBOARD_ROUTE));
            }}
          >
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="请输入用户名"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "登录中..." : "登录"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        提示: 使用用户名 "admin" 和密码 "password" 登录
      </div>
    </>
  );
}
