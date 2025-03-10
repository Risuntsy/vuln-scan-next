export interface SideBarItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  submenu?: SideBarItem[];
}
