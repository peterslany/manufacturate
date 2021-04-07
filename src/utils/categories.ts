import { find } from "lodash";
import { allProductCategoriesFlattened, Locale } from "../constants";
import { LocaleMessage } from "../types";

// eslint-disable-next-line import/prefer-default-export
export const getProductCategoryLabel = (categoryValue: string): LocaleMessage =>
  (find(allProductCategoriesFlattened, {
    value: categoryValue,
  }) as { label: LocaleMessage } | undefined)?.label ||
  (Object.keys(Locale).reduce(
    (res, locale) => ({ [locale]: "", ...res }),
    {}
  ) as LocaleMessage);
