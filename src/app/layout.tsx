import type { Metadata } from "next";
import "#/styles/globals.css";
import { geistSans } from "#/styles/fonts";
import { notoSansSC } from "#/styles/fonts";
import { geistMono } from "#/styles/fonts";
import { ThemeProvider } from "#/components/theme-provider";
import { AuthProvider } from "#/contexts/auth-context";

import { NotificationProvider } from "#/contexts/notification-context";
import { SidebarProvider } from "#/components/ui/sidebar";

export const metadata: Metadata = {
  title: "漏洞扫描系统",
  description: "一个全面的漏洞扫描和资产管理系统"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NotificationProvider>
            <AuthProvider>
              <SidebarProvider>
                <div className="flex-1 ">
                  <div className="flex h-screen overflow-hidden">{children}</div>
                </div>
              </SidebarProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
