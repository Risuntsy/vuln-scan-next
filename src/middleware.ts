import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";
import { getLanguagesFromHeader, isValidPathname } from "#/i18n";

export function middleware(request: NextRequest) {
  const locale = getLanguagesFromHeader(request);

  console.log(locale);

  if (isValidPathname(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const newUrl = new URL(`/${locale}${request.nextUrl.pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}



export const config: MiddlewareConfig = {
  matcher: [
    // 排除不需要国际化的路径
    "/((?!api|_next/static|_next/image|avatars|favicon.ico).*)"
  ]
};
