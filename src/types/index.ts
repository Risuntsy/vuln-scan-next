export interface SideBarItem {
  name: string;
  href?: string;
  Icon: React.ElementType;
  submenu?: SideBarItem[];
}
