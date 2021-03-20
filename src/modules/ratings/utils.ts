import { find, flatten } from "lodash";
import { allProductCategories, Locale, RatingCategory } from "../../constants";
import { LocaleMessage } from "../../types";

/* eslint-disable import/prefer-default-export */
export const getListItemRatingColor = (
  dark: boolean,
  category: RatingCategory
): string => {
  switch (category) {
    case RatingCategory.HEALTH:
      return !dark ? "red.600" : "red.200";
    case RatingCategory.ECOLOGY:
      return !dark ? "green.700" : "green.200";
    case RatingCategory.ANIMALS:
      return !dark ? "blue.600" : "blue.200";
    case RatingCategory.ETHICS:
      return !dark ? "yellow.700" : "yellow.300";
    case RatingCategory.TOTAL:
    default:
      return !dark ? "gray.700" : "gray.100";
  }
};

export const getProductCategoryLabel = (categoryValue: string): LocaleMessage =>
  find(flatten(allProductCategories.map(({ categories }) => categories)), {
    value: categoryValue,
  })?.label ||
  (Object.keys(Locale).reduce(
    (res, locale) => ({ [locale]: "", ...res }),
    {}
  ) as LocaleMessage);
