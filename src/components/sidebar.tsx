// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "#/libs/utils";
// import { Button } from "#/components/ui/button";
// import { useAuth } from "#/contexts/auth-context";
// import {
//   BarChart3,
//   Bug,
//   Database,
//   Fingerprint,
//   Globe,
//   Home,
//   Layers,
//   LogOut,
//   Network,
//   Settings,
//   Shield,
//   UserIcon
// } from "lucide-react";
// import {
//   ASSETS_DOMAINS_ROUTE,
//   ASSETS_IPS_ROUTE,
//   ASSETS_WEBS_ROUTE,
//   DASHBOARD_ROUTE,
//   FINGERPRINTS_ROUTE,
//   STATISTICS_ROUTE,
//   SETTINGS_ROUTE,
//   VULNERABILITIES_ROUTE,
//   PROJECTS_ROUTE
// } from "#/consts";

// const sidebarItems = [
//   { name: "仪表盘", href: DASHBOARD_ROUTE, icon: Home },
//   { name: "扫描任务", href: PROJECTS_ROUTE, icon: Shield },
//   {
//     name: "资产管理",
//     icon: Database,
//     submenu: [
//       { name: "域名资产", href: ASSETS_DOMAINS_ROUTE, icon: Globe },
//       { name: "IP资产", href: ASSETS_IPS_ROUTE, icon: Network },
//       { name: "Web资产", href: ASSETS_WEBS_ROUTE, icon: Layers }
//     ]
//   },
//   { name: "漏洞库", href: VULNERABILITIES_ROUTE, icon: Bug },
//   { name: "指纹库", href: FINGERPRINTS_ROUTE, icon: Fingerprint },
//   { name: "统计分析", href: STATISTICS_ROUTE, icon: BarChart3 },
//   { name: "系统设置", href: SETTINGS_ROUTE, icon: Settings }
// ];



// type SidebarItem = (typeof sidebarItems)[number];

// function SidebarItem({ item, className }: { item: SidebarItem; className?: string }) {
//   const pathname = usePathname();

//   if (!item.href) {
//     return (
//       <div key={item.name}>
//         <div key={item.name} className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground">
//           <item.icon className="w-5 h-5 mr-2" />
//           {item.name}
//         </div>
//         {item.submenu?.map((subitem) => <SidebarItem className="pl-1 space-y-1" key={subitem.href} item={subitem} />)}
//       </div>
//     );
//   } else {
//     return (
//       <Link key={item.href} href={item.href} className={className}>
//         <Button
//           variant="ghost"
//           className={cn(
//             "w-full justify-start",
//             pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
//           )}
//         >
//           <item.icon className="w-5 h-5 mr-2" />
//           {item.name}
//         </Button>
//       </Link>
//     );
//   }
// }

// export function Sidebar() {
//   const { user, logout } = useAuth();

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col w-64 border-r bg-card">
//       <div className="p-4 border-b">
//         <h1 className="text-xl font-bold">漏洞扫描系统</h1>
//       </div>
//       <div className="flex-1 py-4 overflow-y-auto">
//         <nav className="px-2 space-y-1">
//           {sidebarItems.map((item, index) => (
//             <SidebarItem key={"sidebar-item-" + index} item={item} />
//           ))}
//         </nav>
//       </div>
//       <div className="p-4 border-t">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="bg-accent p-2 rounded-full">
//             <UserIcon className="w-5 h-5" />
//           </div>
//           <div>
//             <div className="font-medium">{user.name}</div>
//             <div className="text-xs text-muted-foreground">{user.role === "admin" ? "管理员" : "用户"}</div>
//           </div>
//         </div>
//         <Button variant="outline" className="w-full justify-start" onClick={logout}>
//           <LogOut className="w-4 h-4 mr-2" />
//           登出
//         </Button>
//       </div>
//     </div>
//   );
// }
