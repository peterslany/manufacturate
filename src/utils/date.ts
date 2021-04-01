import { Locale } from "../constants";

export const formatDateShort = (date: string, locale: Locale): string =>
  new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

export const formatDateLong = (date: string, locale: Locale): string =>
  new Date(date).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
