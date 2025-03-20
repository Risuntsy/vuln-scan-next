export interface SideBarItem {
  name: string;
  href?: string;
  Icon: React.ElementType;
  subMenu?: SideBarItem[];
}
