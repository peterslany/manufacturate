import { HeaderItemType } from "../types";
import { allProductCategories } from "./categories";
import { Path } from "./path";

export const publicHeaderItems: HeaderItemType[] = [
  {
    label: "Domov",
    path: Path.ROOT,
    onlyInDrawer: true,
  },
  {
    label: "Hodnotenia",
    path: Path.RATINGS,
    subMenu: {
      header: {
        label: "Všetky hodnotenia",
        path: Path.RATINGS,
      },
      body: {
        label: "Kategórie",
        parameter: "category",
        items: allProductCategories.map(({ label, categories }) => ({
          label,
          items: categories,
        })),
      },
    },
  },
  {
    label: "O projekte",
    path: Path.ABOUT,
  },
  {
    label: "Ako hodnotime",
    path: Path.METHODOLOGY,
  },
];

export const authHeaderItems: HeaderItemType[] = [
  { label: "Ovládací panel", path: Path.AUTH_DASHBOARD },
  { label: "Nastavenia", path: Path.AUTH_SETTINGS },
];

export const HEADER_HEIGHT = [16, 16, 24];
