// eslint-disable-next-line import/no-cycle
import { asLocaleMessages } from "../types/locale";

export enum Locale {
  en = "en",
  sk = "sk",
}

export const LocaleMessages = asLocaleMessages({
  ERROR_DEFAULT_MESSAGE: {
    en: "Oops, something went wrong.",
    sk: "Oops, niečo sa pokazilo.",
  },
  LOG_IN: {
    en: "Log in",
    sk: "Prihlásiť sa",
  },
  LOG_OUT: {
    en: "Log out",
    sk: "Odhlásiť sa",
  },
  RATING: {
    en: "Rating",
    sk: "Hodnotenie",
  },
  MANUFACTURER_NAME: {
    en: "Manufacturer's name",
    sk: "Názov výrobcu",
  },

  RATINGS: {
    en: "Ratings",
    sk: "Hodnotenia",
  },

  CATEGORIES: {
    en: "Categories",
    sk: "Kategórie",
  },
  HOME: {
    en: "Home",
    sk: "Domov",
  },
  ABOUT: {
    en: "About",
    sk: "O projekte",
  },
  METHODOLOGY: {
    en: "Methodology",
    sk: "Metodológia",
  },
  DASHBOARD: {
    en: "Dashboard",
    sk: "Ovládací panel",
  },
  SETTINGS: {
    en: "Settings",
    sk: "Nastavenia",
  },
  HOMEPAGE_MAIN_TEXT: {
    sk:
      "Fair about care je neziskový projekt, ktorý poskytuje objektívne hodnotenia výrobcov kozmetiky pre všetkých.",
    en: "Fair about care is project ....",
  },
});
