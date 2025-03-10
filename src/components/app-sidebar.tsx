import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton
} from "#/components";
import Link from "next/link";
import { SideBarItem } from "#/types";



export function AppSidebar({ items }: { items: SideBarItem[] }) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarList items={items} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function SidebarList({ items }: { items: SideBarItem[] }) {
  return (
    <>
      {items.map((item) =>
        item.href ? (
          <SidebarMenuButton key={item.name} asChild>
            <Link href={item.href}>
              <item.icon />
              {item.name}
            </Link>
          </SidebarMenuButton>
        ) : (
          <SidebarGroup key={item.name}>
            <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              {item.submenu?.map((subItem) =>
                subItem.href ? (
                  <SidebarMenuButton key={subItem.name} asChild>
                    <Link href={subItem.href}>
                      <subItem.icon />
                      {subItem.name}
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarGroup key={subItem.name}>
                    <SidebarGroupLabel>{subItem.name}</SidebarGroupLabel>
                  </SidebarGroup>
                )
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        )
      )}
    </>
  );
}


