"use client";

import {
  Button,
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, User, Settings, LogOut, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useAuth } from "#/contexts/auth-context";
import { cn } from "#/libs/utils";
import { usePathname } from "next/navigation";
import { log } from "console";

export function AppSidebar({ items }: { items: SideBarItem[] }) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="px-2">
        <SidebarList items={items} />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}

function UserProfile() {
  const auth = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between w-full cursor-pointer hover:bg-muted/50 rounded-md p-1">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/1000" alt="用户头像" />
              <AvatarFallback>管理员</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">管理员</span>
              <span className="text-xs text-muted-foreground">admin@example.com</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>个人资料</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>账户设置</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 h-4 w-4" />
          <span>通知中心</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={auth.logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarList({ items, isSubmenu = false }: { items: SideBarItem[]; isSubmenu?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {items.map(({ name, href, Icon, submenu }) => {
        const isActive = !!href && pathname.endsWith(href);
        // 单个菜单项
        if (href) {
          return isSubmenu ? (
            <SidebarMenuSubItem key={name} className="list-none">
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={href} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          ) : (
            <SidebarMenuItem key={name} className="list-none">
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={href} className="flex items-center gap-3 text-sm">
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }

        // 带子菜单的菜单组
        if (submenu) {
          return (
            <Collapsible key={name} defaultOpen>
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <span>
                    {/* <Icon className="h-2 w-2 mr-2" /> */}
                    {name}
                  </span>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent className=" border-l border-muted mt-1">
                    <SidebarList items={submenu} isSubmenu />
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        }

        return null;
      })}
    </>
  );
}
