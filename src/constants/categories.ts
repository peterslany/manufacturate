/* eslint-disable import/prefer-default-export */
enum ProductSupercategory {
  HAIR = "HAIR",
  SKIN = "SKIN",
  BEAUTY = "BEAUTY",
  FRAGRANCE = "FRAGRANCE",
}

export const allProductCategories: {
  mainCategory: ProductSupercategory;
  label: string;
  categories: {
    label: string;
    value: string;
  }[];
}[] = [
  {
    mainCategory: ProductSupercategory.HAIR,
    label: "Vlasy a ochlpenie",
    categories: [
      {
        label: "Úprava",
        value: "hair_styling",
      },
      {
        label: "Čistiace",
        value: "hair_cleaning",
      },
      {
        label: "Ochlpenie tváre",
        value: "hair_facial",
      },
    ],
  },
  {
    mainCategory: ProductSupercategory.SKIN,
    label: "Koža",
    categories: [
      {
        label: "Ochrana proti slnku",
        value: "skin_sunProtection",
      },
      {
        label: "Čistiace",
        value: "skin_cleansing",
      },
      {
        label: "Vyživujúce",
        value: "skin_nourishing",
      },
      {
        label: "Liečivé",
        value: "skin_treatment",
      },
      {
        label: "Detské",
        value: "skin_baby",
      },
    ],
  },
  {
    mainCategory: ProductSupercategory.BEAUTY,
    label: "Krása",
    categories: [
      {
        label: "Nechty",
        value: "beauty_nails",
      },
      {
        label: "Tvár / make-up",
        value: "beauty_face",
      },
      {
        label: "Pery",
        value: "beauty_lips",
      },
      {
        label: "Oči",
        value: "beauty_eyes",
      },
      {
        label: "Ostatné",
        value: "beauty_other",
      },
    ],
  },
  {
    mainCategory: ProductSupercategory.FRAGRANCE,
    label: "Vône",
    categories: [
      {
        label: "Deodoranty",
        value: "fragrance_deodorant",
      },
      {
        label: "Parfumy",
        value: "fragrance_parfume",
      },
    ],
  },
];
