import { HeaderItemType } from "../types";
import Path from "./path";

export const headerItems: HeaderItemType[] = [
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
        items: [
          {
            label: "Vlasy",
            items: [
              {
                label: "Vyziva",
                value: "hair_nourishment",
              },
              {
                label: "Cistiace",
                value: "hair_cleaning",
              },
            ],
          },
          {
            label: "Koza",
            items: [
              {
                label: "Cistiace",
                value: "skin_cleaning",
              },
            ],
          },
        ],
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
export default headerItems;

export const HEADER_HEIGHT = [16, 16, 24];
