export const defaultLocale = "zh-cn";
export const locales = ["zh-cn", "en-us"] as const;

export type Locale = typeof locales[number];
