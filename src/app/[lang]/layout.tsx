import type { Metadata } from "next";
import "#/styles/globals.css";
import { notoSansSC } from "#/styles/fonts";
import { Locale, locales } from "#/i18n";
import { cn } from "#/libs/utils";
import { NotificationProvider } from "#/contexts/notification-context";

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
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
