import { Path } from "../constants/path";
import { LocaleMessage } from "./locale";

export type HeaderItemSubMenuBodyItem = {
  label: LocaleMessage;
} & (
  | { items?: never; value: string }
  | { items: HeaderItemSubMenuBodyItem[]; value?: never }
);

export interface HeaderItemSubMenuBody {
  items: HeaderItemSubMenuBodyItem[];
  label: LocaleMessage;
  parameter: string;
}

export interface HeaderItemSubMenuType {
  body: HeaderItemSubMenuBody;
  header: HeaderItemType;
}
export interface HeaderItemType {
  label: LocaleMessage;
  onlyInDrawer?: boolean;
  path: Path;
  subMenu?: HeaderItemSubMenuType;
}
