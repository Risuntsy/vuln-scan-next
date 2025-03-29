import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";
import { extractLang, getLanguagesFromHeader, Locale } from "#/i18n";
import { useLanguageRoute } from "./routes";

export async function middleware(request: NextRequest) {
    // i18n
    let lang: Locale | undefined = extractLang(request.nextUrl.pathname);
    if (!lang) {
        const locale = getLanguagesFromHeader(request);

        const newUrl = new URL(`/${locale}${request.nextUrl.pathname}`, request.url);
        newUrl.search = request.nextUrl.search;

        return NextResponse.redirect(newUrl);
    }

    const r = useLanguageRoute(lang);

    // // auth
    // const token = request.cookies.get("token")?.value || request.headers.get("authorization");

    // if (request.url.endsWith("/login") && token) {
    //   if (await checkAuth({ token })) {
    //     return NextResponse.redirect(new URL(r(DASHBOARD_ROUTE), request.url));
    //   }
    // }

    // if (!token && !isInWhiteList(request.url)) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next();
}

function isInWhiteList(pathname: string) {
    const whiteList = ["/login", "/register", "/"];

    return whiteList.some((item) => pathname.endsWith(item));
}

export const config: MiddlewareConfig = {
    matcher: [
        // 排除不需要国际化的路径
        "/((?!api|_next/static|_next/image|avatars|favicon.ico).*)"
    ]
};
