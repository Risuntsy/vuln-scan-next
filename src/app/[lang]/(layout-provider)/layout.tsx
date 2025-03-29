import { SidebarProvider, ThemeProvider, TooltipProvider } from "#/components";

export default async function LayoutProvider({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    );
}
