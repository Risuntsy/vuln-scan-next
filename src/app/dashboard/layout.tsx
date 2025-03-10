"use client";

import { AppSidebar } from "#/components";
import { useAuth } from "#/contexts/auth-context";

import { menuItems } from "#/consts/menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }


  return (
    <>
      <AppSidebar items={menuItems} />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </>
  );
}
