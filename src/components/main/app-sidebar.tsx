import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem
} from "#/components";
import Link from "next/link";
import { SideBarItem } from "#/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";

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

function SidebarList({ items, isSubmenu = false }: { items: SideBarItem[]; isSubmenu?: boolean }) {
  return (
    <>
      {items.map(({ name, href, Icon, submenu }) =>
        href ? (
          isSubmenu ? (
            <SidebarMenuSubItem key={name} className="list-none">
              <SidebarMenuButton asChild>
                <Link href={href}>
                  <Icon />
                  {name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          ) : (
            <SidebarMenuItem key={name} className="list-none">
              <SidebarMenuButton asChild>
                <Link href={href}>
                  <Icon />
                  {name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ) : (
          submenu && (
            <Collapsible defaultOpen className="group/collapsible" key={name}>
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    {name}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarList items={submenu} isSubmenu />
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        )
      )}
    </>
  );
}
