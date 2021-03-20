import { LocaleMessage } from "../types/locale";

/* eslint-disable import/prefer-default-export */
enum ProductSupercategory {
  BEAUTY = "BEAUTY",
  FRAGRANCE = "FRAGRANCE",
  HAIR = "HAIR",
  SKIN = "SKIN",
}

export const allProductCategories: {
  categories: {
    label: LocaleMessage;
    value: string;
  }[];
  label: LocaleMessage;
  mainCategory: ProductSupercategory;
}[] = [
  {
    mainCategory: ProductSupercategory.HAIR,
    label: {
      sk: "Vlasy a ochlpenie",
      en: "Hair",
    },
    categories: [
      {
        label: {
          sk: "Úprava",
          en: "Styling",
        },
        value: "hair_styling",
      },
      {
        label: { sk: "Čistiace", en: "Cleansing" },
        value: "hair_cleansing",
      },
      {
        label: { sk: "Ochlpenie tváre", en: "Facial hair" },
        value: "hair_facial",
      },
    ],
  },
  {
    mainCategory: ProductSupercategory.SKIN,
    label: { sk: "Koža", en: "Skin" },
    categories: [
      {
        label: { sk: "Ochrana proti slnku", en: "Sun protection" },
        value: "skin_sunProtection",
      },
      {
        label: { sk: "Čistiace", en: "Cleansing" },
        value: "skin_cleansing",
      },
      {
        label: { sk: "Vyživujúce", en: "Nourishing" },
        value: "skin_nourishing",
      },
      {
        label: { sk: "Liečivé", en: "Treatment" },
        value: "skin_treatment",
      },
      {
        label: { sk: "Detské", en: "Baby" },
        value: "skin_baby",
      },
    ],
  },
  {
    mainCategory: ProductSupercategory.BEAUTY,
    label: { sk: "Krása", en: "Beauty" },
    categories: [
      {
        label: { sk: "Nechty", en: "Nails" },
        value: "beauty_nails",
      },
      {
        label: { sk: "Tvár / make-up", en: "Face / make-up" },
        value: "beauty_face",
      },
      {
        label: { sk: "Pery", en: "Lips" },
        value: "beauty_lips",
      },
      {
        label: { sk: "Oči", en: "Eyes" },
        value: "beauty_eyes",
      },
      {
        label: { sk: "Ostatné", en: "Other" },
        value: "beauty_other",
      },
    ],
  },
  {
    mainCategory: ProductSupercategory.FRAGRANCE,
    label: { sk: "Vône", en: "Fragrance" },
    categories: [
      {
        label: { sk: "Deodoranty", en: "Deodorants" },
        value: "fragrance_deodorant",
      },
      {
        label: { sk: "Parfumy", en: "Parfumes" },
        value: "fragrance_parfume",
      },
    ],
  },
];

export enum RatingCategory {
  ANIMALS = "animals",
  ECOLOGY = "ecology",
  ETHICS = "ethics",
  HEALTH = "health",
  TOTAL = "total",
}

export const ratingSubcategories = [
  {
    subcategory: RatingCategory.HEALTH,
    label: { sk: "Zdravie", en: "Health" },
  },
  {
    subcategory: RatingCategory.ECOLOGY,
    label: { sk: "Ekológia", en: "Ecology" },
  },
  {
    subcategory: RatingCategory.ANIMALS,
    label: { sk: "Zvieratá", en: "Animals" },
  },
  { subcategory: RatingCategory.ETHICS, label: { sk: "Etika", en: "Ethics" } },
];

export type RatingsSortFields = "manufacturer_name" | RatingCategory;
