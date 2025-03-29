"use server";

import { Locale } from "#/i18n";
import { apiClient } from "#/libs/api-client";
import { DASHBOARD_ROUTE, LOGIN_ROUTE, useLanguageRoute } from "#/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function handleLogin(lang: Locale, formData: FormData, redirectPath?: string) {
    const loginFormSchema = z.object({
        username: z.string().min(6).max(20),
        password: z.string().min(6).max(20)
    });

    const validatedFields = loginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password")
    });

    if (!validatedFields.success) {
        return { success: false, error: "用户名或密码错误" };
    }

    const username = validatedFields.data.username;
    const password = validatedFields.data.password;

    const { token } = await login({ username, password });
    if (token) {
        (await cookies()).set("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 });
        redirect(useLanguageRoute(lang)(redirectPath || DASHBOARD_ROUTE));
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
