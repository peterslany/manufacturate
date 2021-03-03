import { Path } from "../constants/path";

export type HeaderItemSubMenuBodyItem = {
  label: string;
} & (
  | { value: string; items?: never }
  | { value?: never; items: HeaderItemSubMenuBodyItem[] }
);

export interface HeaderItemSubMenuBody {
  label: string;
  parameter: string;
  items: HeaderItemSubMenuBodyItem[];
}

export interface HeaderItemSubMenuType {
  header: HeaderItemType;
  body: HeaderItemSubMenuBody;
}
export interface HeaderItemType {
  label: string;
  path: Path;
  onlyInDrawer?: boolean;
  subMenu?: HeaderItemSubMenuType;
}
