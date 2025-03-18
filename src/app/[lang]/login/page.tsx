"use client";

import type React from "react";

import { use, useState } from "react";
import { useAuth } from "#/contexts/auth-context";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";
import { Alert, AlertDescription } from "#/components/ui/alert";
import { Lock, User } from "lucide-react";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) {
  const { redirect } = use(searchParams);
  // use(sleep(randomInt(1000, 2000)));

  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    if (!username || !password) {
      setError("请输入用户名和密码");
      return;
    }

    const success = await login(username, password, redirect);
    if (!success) {
      setError("用户名或密码错误");
    }
  };

  return (
        <>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">漏洞扫描系统</CardTitle>
              <CardDescription className="text-center">请输入您的账号和密码登录</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
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
                        placeholder="请输入用户名"
                        className="pl-10"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="请输入密码"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleLogin} disabled={isLoading || isSubmitting}>
                {isSubmitting ? "登录中..." : "登录"}
              </Button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            提示: 使用用户名 "admin" 和密码 "password" 登录
          </div>
        </>
  );
}
