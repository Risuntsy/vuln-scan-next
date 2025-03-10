"use client";

import { AppSidebar, SidebarTrigger } from "#/components";
import { useAuth } from "#/contexts/auth-context";

import { menuItems } from "#/consts/menu";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <AppSidebar items={menuItems} />
      <main className="flex-1 overflow-y-auto bg-background">
        <SidebarTrigger />
        {children}
      </main>
    </>
  );
}
