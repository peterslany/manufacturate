import { find } from "lodash";
import { allProductCategoriesFlattened, Locale } from "../constants";
import { LocaleMessage } from "../types";

export const getProductCategoryLabel = (categoryValue: string): LocaleMessage =>
  find(allProductCategoriesFlattened, { value: categoryValue })?.label ||
  (Object.keys(Locale).reduce(
    (res, locale) => ({ [locale]: "", ...res }),
    {}
  ) as LocaleMessage);
