import { flatten } from "lodash";
import { LocaleMessage } from "../types/locale";
import { Locale, LocaleMessages } from "./locale";

export enum ProductSuperCategory {
  BEAUTY = "BEAUTY",
  FRAGRANCE = "FRAGRANCE",
  HAIR = "HAIR",
  SKIN = "SKIN",
}

export enum ProductCategory {
  BEAUTY_EYES = "beauty_eyes",
  BEAUTY_FACE = "beauty_face",
  BEAUTY_LIPS = "beauty_lips",
  BEAUTY_NAILS = "beauty_nails",
  BEAUTY_OTHER = "beauty_other",
  FRAGRANCE_DEODORANT = "fragrance_deodorant",
  FRAGRANCE_PARFUME = "fragrance_parfume",
  HAIR_CLEANSING = "hair_cleansing",
  HAIR_FACIAL = "hair_facial",
  HAIR_STYLING = "hair_styling",
  SKIN_BABY = "skin_baby",
  SKIN_CLEANSING = "skin_cleansing",
  SKIN_NOURISHING = "skin_nourishing",
  SKIN_SUN_PROTECTION = "skin_sunProtection",
  SKIN_TREATEMENT = "skin_treatment",
}

export const productCategoryValues = Object.values(ProductCategory);

export const allProductCategories: {
  categories: {
    label: LocaleMessage;
    value: ProductCategory;
  }[];
  label: LocaleMessage;
  mainCategory: ProductSuperCategory;
}[] = [
  {
    mainCategory: ProductSuperCategory.HAIR,
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
        value: ProductCategory.HAIR_STYLING,
      },
      {
        label: { sk: "Čistiace", en: "Cleansing" },
        value: ProductCategory.HAIR_CLEANSING,
      },
      {
        label: { sk: "Ochlpenie tváre", en: "Facial hair" },
        value: ProductCategory.HAIR_FACIAL,
      },
    ],
  },
  {
    mainCategory: ProductSuperCategory.SKIN,
    label: { sk: "Koža", en: "Skin" },
    categories: [
      {
        label: { sk: "Ochrana proti slnku", en: "Sun protection" },
        value: ProductCategory.SKIN_SUN_PROTECTION,
      },
      {
        label: { sk: "Čistiace", en: "Cleansing" },
        value: ProductCategory.SKIN_CLEANSING,
      },
      {
        label: { sk: "Vyživujúce", en: "Nourishing" },
        value: ProductCategory.SKIN_NOURISHING,
      },
      {
        label: { sk: "Liečivé", en: "Treatment" },
        value: ProductCategory.SKIN_TREATEMENT,
      },
      {
        label: { sk: "Detské", en: "Baby" },
        value: ProductCategory.SKIN_BABY,
      },
    ],
  },
  {
    mainCategory: ProductSuperCategory.BEAUTY,
    label: { sk: "Krása", en: "Beauty" },
    categories: [
      {
        label: { sk: "Nechty", en: "Nails" },
        value: ProductCategory.BEAUTY_NAILS,
      },
      {
        label: { sk: "Tvár / make-up", en: "Face / make-up" },
        value: ProductCategory.BEAUTY_FACE,
      },
      {
        label: { sk: "Pery", en: "Lips" },
        value: ProductCategory.BEAUTY_LIPS,
      },
      {
        label: { sk: "Oči", en: "Eyes" },
        value: ProductCategory.BEAUTY_EYES,
      },
      {
        label: { sk: "Ostatné", en: "Other" },
        value: ProductCategory.BEAUTY_OTHER,
      },
    ],
  },
  {
    mainCategory: ProductSuperCategory.FRAGRANCE,
    label: { sk: "Vône", en: "Fragrance" },
    categories: [
      {
        label: { sk: "Deodoranty", en: "Deodorants" },
        value: ProductCategory.FRAGRANCE_DEODORANT,
      },
      {
        label: { sk: "Parfumy", en: "Parfumes" },
        value: ProductCategory.FRAGRANCE_PARFUME,
      },
    ],
  },
];

export const allProductCategoriesFlattened = flatten(
  allProductCategories.map(({ categories, label: mainCategoryLabel }) =>
    categories.map(({ value, label }) => ({
      value,
      label: Object.keys(label).reduce(
        (res, locale) => ({
          ...res,
          [locale]: `${mainCategoryLabel[locale as Locale]} - ${
            label[locale as Locale]
          }`,
        }),
        {} as LocaleMessage
      ),
    }))
  )
);

export enum RatingCategory {
  ANIMALS = "animals",
  ECOLOGY = "ecology",
  ETHICS = "ethics",
  HEALTH = "health",
  TOTAL = "total",
}

export const ratingSubcategories = [
  {
    subCategory: RatingCategory.HEALTH,
    label: { sk: "Zdravie", en: "Health" },
  },
  {
    subCategory: RatingCategory.ECOLOGY,
    label: { sk: "Ekológia", en: "Ecology" },
  },
  {
    subCategory: RatingCategory.ANIMALS,
    label: { sk: "Zvieratá", en: "Animals" },
  },
  { subCategory: RatingCategory.ETHICS, label: { sk: "Etika", en: "Ethics" } },
];

export const allRatingCategories = [
  { subCategory: RatingCategory.TOTAL, label: LocaleMessages.TOTAL },
  ...ratingSubcategories,
];
