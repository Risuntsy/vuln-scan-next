"use server";

import { headers } from "next/headers";

import { cookies } from "next/headers";
import { RequestConfig } from "./api-client";

export async function authInterceptor(config: RequestConfig) {
    if (!config.withCredentials) {
        return config;
    }

    if (!config.headers) {
        config.headers = {};
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (authToken) {
        config.headers["authorization"] = authToken.value;
        return config;
    }

    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    if (authHeader) {
        config.headers["authorization"] = authHeader;
    }

    if (!config.headers["authorization"]) {
        throw new Error("Unauthorized");
    }

    return config;
}
