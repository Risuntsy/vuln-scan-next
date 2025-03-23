"use client";

import { AppSidebar, useSidebar } from "#/components";
import { menuItems } from "#/routes";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar items={menuItems} />
      {/* boundry */}
      {/* <div className={cn("w-0 border-r-2 border-r-border", open ? "block" : "hidden")} /> */}
      <main className="flex-1">
        <div className="w-full">
          {children}
        </div>
      </main>
    </>
  );
}
