export interface SideBarItem {
  name: string;
  href?: string;
  Icon: React.ElementType;
  subMenu?: SideBarItem[];
}

export type CommonAction<T = any> = () => Promise<ResponseEntity<T>> | ResponseEntity<T> | T;

export type ResponseEntity<T> = {
  code: number;
  message: string;
  data: T;
};
