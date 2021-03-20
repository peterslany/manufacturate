import { HeaderItemType } from "../types/header";
import { allProductCategories } from "./categories";
import { LocaleMessages } from "./locale";
import { Path } from "./path";

export const publicHeaderItems: HeaderItemType[] = [
  {
    label: LocaleMessages.HOME,
    path: Path.ROOT,
    onlyInDrawer: true,
  },
  {
    label: LocaleMessages.RATINGS,
    path: Path.RATINGS,
    subMenu: {
      header: {
        label: LocaleMessages.RATINGS,
        path: Path.RATINGS,
      },
      body: {
        label: LocaleMessages.CATEGORIES,
        parameter: "category",
        items: allProductCategories.map(({ label, categories }) => ({
          label,
          items: categories,
        })),
      },
    },
  },
  {
    label: LocaleMessages.ABOUT,
    path: Path.ABOUT,
  },
  {
    label: LocaleMessages.METHODOLOGY,
    path: Path.METHODOLOGY,
  },
];

export const authHeaderItems: HeaderItemType[] = [
  { label: LocaleMessages.DASHBOARD, path: Path.AUTH_DASHBOARD },
  { label: LocaleMessages.SETTINGS, path: Path.AUTH_SETTINGS },
];

export const HEADER_HEIGHT = [16, 16, 24];
