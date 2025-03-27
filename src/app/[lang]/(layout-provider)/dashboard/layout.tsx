"use client";

import { AppSidebar, useSidebar } from "#/components";
import { menuItems } from "#/routes";
import { Locale } from "#/i18n";
import { use } from "react";

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = use(params);
  return (
    <>
      <AppSidebar lang={lang} items={menuItems} />
      {/* boundry */}
      {/* <div className={cn("w-0 border-r-2 border-r-border", open ? "block" : "hidden")} /> */}
      <main className="flex-1">
        <div className="w-full">{children}</div>
      </main>
    </>
  );
}
