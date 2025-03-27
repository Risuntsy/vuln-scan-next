"use server";

import { Locale } from "#/i18n";
import { apiClient } from "#/libs/api-client";
import { LOGIN_ROUTE, useLanguageRoute } from "#/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, error: "请输入用户名和密码" };
  }

  try {
    const { token } = await login({ username, password });
    if (token) {
      (await cookies()).set("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 });
      return { success: true };
    } else {
      return { success: false, error: "用户名或密码错误" };
    }
  } catch (error) {
    return { success: false, error: "登录失败，请稍后再试" };
  }
}

export async function logout(lang: Locale) {
  (await cookies()).delete("token");
  redirect(useLanguageRoute(lang)(LOGIN_ROUTE));
}

export async function login(data: { username: string; password: string }) {
  interface LoginResponse {
    access_token: string;
  }

  const response = await apiClient.post<LoginResponse>("/user/login", data);
  return { token: `Bearer ${response.access_token}` };
}

export async function changePassword(data: { newPassword: string }) {
  return apiClient.post("/user/changePassword", data);
}

export async function checkAuth({ token }: { token: string }) {
  const response = await apiClient.get<Response>("/system/version", {
    responseType: "raw",
    headers: {
      Authorization: token
    }
  });

  if (response.status === 200) {
    return true;
  }

  return false;
}
