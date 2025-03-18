import type { Metadata } from "next";
import "#/styles/globals.css";
import { notoSansSC } from "#/styles/fonts";
import { ThemeProvider } from "#/components/theme-provider";
import { AuthProvider } from "#/contexts/auth-context";

import { NotificationProvider } from "#/contexts/notification-context";
import { Locale, locales } from "#/i18n";
import { cn } from "#/libs/utils";

export const metadata: Metadata = {
  title: "漏洞扫描系统",
  description: "一个全面的漏洞扫描和资产管理系统"
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn(notoSansSC.variable, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NotificationProvider>
            <AuthProvider lang={lang}>{children}</AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
