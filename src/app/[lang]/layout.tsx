import type { Metadata } from "next";
import "#/styles/globals.css";
import { geistSans } from "#/styles/fonts";
import { notoSansSC } from "#/styles/fonts";
import { geistMono } from "#/styles/fonts";
import { ThemeProvider } from "#/components/theme-provider";
import { AuthProvider } from "#/contexts/auth-context";

import { NotificationProvider } from "#/contexts/notification-context";
import { SidebarProvider } from "#/components/ui/sidebar";
import { Locale, locales } from "#/i18n";

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
      <body className={`${notoSansSC.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NotificationProvider>
            <AuthProvider lang={lang}>
              <SidebarProvider>
                <div className="flex w-full">{children}</div>
              </SidebarProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
