"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuSubItem
} from "#/components";
import Link from "next/link";
import { SideBarItem } from "#/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, Settings, LogOut, Bell, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "#/libs/utils";
import { logout } from "#/actions";
import { Locale } from "#/i18n";

export default function AppSidebar({ items, lang }: { items: SideBarItem[]; lang: Locale }) {
  return (
    <Sidebar variant="floating">
      <SidebarHeader />
      <SidebarContent className="px-2">
        <SidebarList items={items} />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <UserProfile lang={lang} />
      </SidebarFooter>
    </Sidebar>
  );
}

function UserProfile({ lang }: { lang: Locale }) {
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
          <ChevronsUpDown className="h-4 w-4" />
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
        <DropdownMenuItem className="text-red-500" onClick={() => logout(lang)}>
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
      {items.map(({ name, href, Icon, subMenu }) => {
        const isActive = !!href && pathname.endsWith(href);

        if (subMenu && subMenu.length) {
          return (
            <SidebarGroup key={name}>
              <SidebarGroupLabel asChild>
                <span>
                  {/* <Icon className="h-2 w-2 mr-2" /> */}
                  {name}
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent className="border-l border-muted mt-1 px-2">
                <SidebarList items={subMenu} isSubmenu />
              </SidebarGroupContent>
            </SidebarGroup>
          );
        }

        if (!href) {
          return null;
        }

        return (
          <SidebarMenuSubItem key={name} className="list-none">
            <SidebarMenuButton asChild isActive={isActive}>
              {isActive ? (
                <span className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </span>
              ) : (
                <Link
                  href={href}
                  className={cn("flex items-center gap-2 text-sm", { "text-muted-foreground": isActive })}
                >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        );
      })}
    </>
  );
}
