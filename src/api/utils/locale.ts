import { Locale } from "../../constants";
import { LocaleMessage, SimpleLocaleMessage } from "../../types";
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

// TODO: add rating type
export const localizeRatingData = (rating?: any, locale: Locale) => {
  const result = rating;
  result.rating.overall.description = result.rating.overall.description[locale];
  result.rating.subCategories = result.rating.subCategories.map(
    ({ description, ...rest }: { description: LocaleMessage }) => ({
      ...rest,
      description: description[locale],
    })
  );
  return result;
};

const localizeMessage = (message: SimpleLocaleMessage, locale: Locale) =>
  message[locale];

export const localizeError = (statusCode: number, locale: Locale) => {
  const message: SimpleLocaleMessage = (() => {
    switch (statusCode) {
      case 403:
        return {
          sk: "Na požadovanú operáciu nemáš oprávnenie.",
          en: "You don't have authorization for that operation",
        };
      default:
        return {
          sk: "Pri získavaní dát nastala chyba.",
          en: "Error happened while retrieving data.",
        };
    }
  })();
  return localizeMessage(message, locale);
};
