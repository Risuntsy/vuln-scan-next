import type React from "react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Lock, User } from "lucide-react";
import { Locale } from "#/i18n";
import { handleLogin } from "#/actions";

export default async function LoginPage({
    searchParams,
    params
}: {
    searchParams: Promise<{ redirect?: string }>;
    params: Promise<{ lang: Locale }>;
}) {
    const [{ lang }, { redirect }] = await Promise.all([params, searchParams]);

    return (
        <>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">漏洞扫描系统</CardTitle>
                    <CardDescription className="text-center">请输入您的账号和密码登录</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={async (formData) => {
                            "use server";
                            await handleLogin(lang, formData, redirect);
                        }}
                    >
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
                                        required
                                        defaultValue="ScopeSentry"
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
                                        required
                                        defaultValue="AJYvD7oJ"
                                    />
                                </div>
                            </div>
                            <Button className="w-full" type="submit">
                                登录
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
