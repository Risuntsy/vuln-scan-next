import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale, Locale } from "./config";
import { NextRequest } from "next/server";

export function getLanguagesFromHeader(request: NextRequest): Locale {

  return "zh-cn";

  // let languages: string[] = [];

  // const acceptLanguage = (request.cookies.get("NEXT_LOCALE")?.value || request.headers.get("Accept-Language"))?.toLowerCase();

  // if (acceptLanguage) {
  //   const negotiatorHeaders = { "accept-language": acceptLanguage };
  //   languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // }

  // return match(languages, locales, defaultLocale);
}

export function isValidPathname(pathname: string) {
  return locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
}
