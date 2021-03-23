import { NextApiResponse } from "next";
import { Locale } from "../../constants";
import { ResponseError, SimpleLocaleMessage } from "../../types";
import {
  RatingFull,
  RatingLocalized,
  SubCategoryRatingUnit,
} from "../../types/ratings";
import { parseString } from "../../utils/common";

export const asLocale = (language?: string | string[]) => {
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
  rating: RatingFull,
  locale: Locale
): RatingLocalized => {
  const result: RatingLocalized = {
    ...rating,
    rating: {
      ...rating.rating,
      overall: {
        ...rating.rating.overall,
        description: rating.rating.overall.description[locale],
      },
      subCategories: rating.rating.subCategories.map(
        ({
          description,
          ...rest
        }: SubCategoryRatingUnit<SimpleLocaleMessage>) => ({
          ...rest,
          description: description[locale],
        })
      ),
    },
  };

  return result;
};

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
