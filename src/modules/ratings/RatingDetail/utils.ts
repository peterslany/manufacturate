import {
  allRatingCategories,
  Locale,
  LocaleMessages,
} from "../../../constants";
import { RatingLocalized } from "../../../types";

const generateMetaDescription = (
  data: RatingLocalized,
  locale: Locale
): string =>
  `${LocaleMessages.RATING[locale]} - ${data.name}: ${
    LocaleMessages.TOTAL[locale]
  } ${data.rating.overall.total}, ${allRatingCategories.map(
    ({ subCategory, label }) =>
      `${label[locale]} ${data.rating.overall[subCategory]}`
  )}`;

export default generateMetaDescription;
