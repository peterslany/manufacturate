// eslint-disable-next-line import/no-cycle
import { asLocaleMessages } from "../types/locale";

export enum Locale {
  en = "en",
  sk = "sk",
}

export const LocaleMessages = asLocaleMessages({
  ABOUT: {
    en: "About",
    sk: "O projekte",
  },
  ACCOUNT_SETTINGS: {
    en: "Account settings",
    sk: "Nastavenia účtu",
  },
  ADMINISTRATOR: {
    en: "Administrator",
    sk: "Správca",
  },
  CANCEL: {
    en: "Cancel",
    sk: "Zrušiť",
  },
  CATEGORIES: {
    en: "Categories",
    sk: "Kategórie",
  },
  OVERALL: {
    en: "Overall",
    sk: "Spolu",
  },
  CONFIRM: {
    en: "Confirm",
    sk: "Potvrdiť",
  },
  CREATE: {
    en: "Create",
    sk: "Vytvoriť",
  },
  DASHBOARD: {
    en: "Dashboard",
    sk: "Ovládací panel",
  },
  DESCRIPTION: {
    en: "Description",
    sk: "Popis",
  },
  DIALOG_PROMOTE_TO_ADMINISTRATOR_BODY: {
    en: "Are you sure you want to make user ^ an administrator?",
    sk: "Si si istý, že chceš užívateľa ^ povýšiť na správcu?",
  },
  DIALOG_PROMOTE_TO_ADMINISTRATOR_HEADER: {
    en: "Promote to administrator",
    sk: "Povýšiť na správcu",
  },
  ERROR_DEFAULT_MESSAGE: {
    en: "Oops, something went wrong.",
    sk: "Oops, niečo sa pokazilo.",
  },
  ERROR_FORM_MAX_VALUE_10: {
    en: "Maximum value allowed is 10.",
    sk: "Maximálna povolená hodnota je 10.",
  },
  ERROR_FORM_MIN_VALUE_0: {
    en: "Minimum value allowed is 0.",
    sk: "Minimálna povolená hodnota je 0.",
  },
  ERROR_FORM_MUST_HAVE_AT_LEAST_8_CHARACTERS: {
    en: "Password must have at least 8 characters.",
    sk: "Heslo musí obsahovať aspoň 8 znakov.",
  },
  ERROR_FORM_PASSWORDS_DONT_MATCH: {
    en: "Passwords don't match.",
    sk: "Heslá sa nezhodujú",
  },
  ERROR_FORM_REQUIRED_FIELD: {
    en: "This field is required.",
    sk: "Toto pole je povinné.",
  },
  ERROR_FORM_USERNAME_USED: {
    en: "This username is already used.",
    sk: "Toto užívateľské meno sa už používa.",
  },
  HOME: {
    en: "Home",
    sk: "Domov",
  },
  HOMEPAGE_MAIN_TEXT: {
    en: "Fair about care is project ....",
    sk:
      "Fair about care je neziskový projekt, ktorý poskytuje objektívne hodnotenia výrobcov kozmetiky pre všetkých.",
  },
  INFO_ACCOUNT_CHANGES_SAVED: {
    en: "Account changes saved.",
    sk: "Zmeny v účte boli uložené.",
  },
  INFO_USER_ACCOUNT_SUCCESSFULLY_CREATED: {
    en: "User accoutn successfully created.",
    sk: "Užívateľský účet bol úspešne vytvorený.",
  },
  LOG_IN: {
    en: "Log in",
    sk: "Prihlásiť sa",
  },
  LOG_OUT: {
    en: "Log out",
    sk: "Odhlásiť sa",
  },
  MANUFACTURER_NAME: {
    en: "Manufacturer's name",
    sk: "Názov výrobcu",
  },
  METHODOLOGY: {
    en: "Methodology",
    sk: "Metodológia",
  },
  NEW_PASSWORD: {
    en: "New password",
    sk: "Nové heslo",
  },
  NEW_PASSWORD_AGAIN: {
    en: "New password again",
    sk: "Nové heslo znova",
  },
  NEW_USER_ACCOUNT: {
    en: "New user account",
    sk: "Nový užívateľský účet",
  },
  PASSWORD: {
    en: "Password",
    sk: "Heslo",
  },
  PASSWORD_AGAIN: {
    en: "Password again",
    sk: "Heslo znova",
  },
  RATING: {
    en: "Rating",
    sk: "Hodnotenie",
  },
  RATINGS: {
    en: "Ratings",
    sk: "Hodnotenia",
  },
  SAVE_CHANGES: {
    en: "Save changes",
    sk: "Uložiť zmeny",
  },
  SEARCH_BY_USERNAME: {
    en: "Search by username",
    sk: "Hľadať podľa užívateľského mena",
  },
  SETTINGS: {
    en: "Settings",
    sk: "Nastavenia",
  },
  TOTAL: {
    en: "Total",
    sk: "Celkovo",
  },
  USERNAME: {
    en: "Username",
    sk: "Užívateľské meno",
  },
  USERS_ADMINISTRATION: {
    en: "Users administration",
    sk: "Správa užívateľov",
  },
  WELCOME: {
    en: "Welcome",
    sk: "Vitaj",
  },
});
