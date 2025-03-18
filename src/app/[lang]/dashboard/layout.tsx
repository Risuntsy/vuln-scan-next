"use client";

import { AppSidebar, SidebarProvider } from "#/components";
import { useAuth } from "#/contexts/auth-context";
import { menuItems } from "#/config/routes/menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar items={menuItems} />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
