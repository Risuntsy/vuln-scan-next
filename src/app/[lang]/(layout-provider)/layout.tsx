import { SidebarProvider } from "#/components";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}

