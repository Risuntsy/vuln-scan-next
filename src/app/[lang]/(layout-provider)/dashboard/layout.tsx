"use client";

import { AppSidebar, useSidebar } from "#/components";
import { useAuth } from "#/contexts/auth-context";
import { menuItems } from "#/config/routes/menu";
import { cn } from "#/libs/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { open } = useSidebar();

  if (!user) {
    return null;
  }

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
