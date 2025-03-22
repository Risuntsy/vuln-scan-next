"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DASHBOARD_ROUTE, LOGIN_ROUTE, useLanguageRoute } from "#/routes";
import { useNotification } from "#/contexts/notification-context";

import { Locale } from "#/i18n";
interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string, redirect?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, lang }: { children: React.ReactNode; lang: Locale }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();
  const { setNotification } = useNotification();

  const r = useLanguageRoute(lang);

  // 检查本地存储中是否有已保存的用户会话
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  // 路由保护逻辑
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== r(LOGIN_ROUTE)) {
        // 未登录且不在登录页面，重定向到登录页
        setNotification({ message: "请先登录", type: "error" });
        router.push(r(LOGIN_ROUTE, { query: { redirect: pathname } }));
      } else if (user && pathname === r(LOGIN_ROUTE)) {
        // 已登录且在登录页面，重定向
        setNotification({ message: "登录成功", type: "success" });
        router.push(redirect || r(DASHBOARD_ROUTE));
      }
    }
  }, [user, isLoading, pathname, router]);

  // 登录函数
  const login = async (username: string, password: string, redirect?: string) => {
    // 模拟API请求
    setIsLoading(true);
    try {
      // 为了演示，我们使用模拟数据
      if (username === "admin" && password === "password") {
        const user = {
          id: "1",
          username: "admin",
          name: "管理员",
          role: "admin"
        };
        setRedirect(redirect);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return false;
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push(LOGIN_ROUTE);
  };

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
