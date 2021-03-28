import { NextApiResponse } from "next";
import { Locale, ProductCategory } from "../../constants";
import {
  RatingFull,
  RatingLocalized,
  ResponseError,
  SimpleLocaleMessage,
  SubCategoriesRating,
} from "../../types";
import { parseString } from "../../utils";

export const asLocale = (language?: string | string[]): Locale => {
  const lang = parseString(language);
  switch (lang) {
    case Locale.en:
      return Locale.en;
    case Locale.sk:
      return Locale.sk;
    default:
      return Locale.en;
  }
};

export const localizeRatingData = (
  data: RatingFull,
  locale: Locale
): RatingLocalized => ({
  ...data,
  rating: {
    ...data.rating,
    overall: {
      ...data.rating.overall,
      description: data.rating.overall.description[locale],
    },
    subCategories: Object.keys(data.rating.subCategories).reduce(
      (result, subCategory) => ({
        ...result,
        [subCategory]: {
          ...data.rating.subCategories[subCategory as ProductCategory],
          description:
            data.rating.subCategories[subCategory as ProductCategory]
              .description[locale],
        },
      }),
      {} as SubCategoriesRating<string>
    ),
  },
});

const localizeMessage = (message: SimpleLocaleMessage, locale: Locale) =>
  message[locale];

export const localizedError = (
  statusCode: number,
  locale: Locale
): ResponseError => {
  const message: SimpleLocaleMessage = (() => {
    switch (statusCode) {
      case 400:
        return {
          en: "Invalid request, check what you are sending.",
          sk: "Neplatná požiadavka, skontroluj čo zasielaš.",
        };
      case 403:
        return {
          en: "You are not authorized for that operation.",
          sk: "Na požadovanú operáciu nemáš oprávnenie.",
        };
      case 404:
        return {
          en: "Item not found.",
          sk: "Požadovaná položka sa nenašla.",
        };
      case 405:
        return {
          en: "Request method not allowed.",
          sk: "Metóda požiadavky nie je povolená.",
        };
      case 422:
        return {
          en: "Received data are in invalid form.",
          sk: "Prijaté dáta nie sú v správnom tvare.",
        };
      default:
        return {
          en: "Error happened while working with data.",
          sk: "Pri operácii s dátami nastala chyba.",
        };
    }
  })();
  return { status: statusCode, message: localizeMessage(message, locale) };
};

export const sendLocalizedError = (
  res: NextApiResponse,
  statusCode: number,
  locale: Locale
): void => {
  const error = localizedError(statusCode, locale);
  res.status(statusCode).json(error);
};
