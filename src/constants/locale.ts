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
  ALERT_CHANGE_REQUESTS_WAITING: {
    en: "There are change requests waiting for approval",
    sk: "V systéme sú zmeny čakajúce na schválenie",
  },
  ALERT_SAVING_CHANGES_WILL_DELETE_CATEGORY: {
    en: "Saving changes will delete rating data for category: ",
    sk: "Uložením zmien sa vymažú dáta pre hodnotenie kategórie: ",
  },
  APPROVE_CHANGE_REQUEST: {
    en: "Approve change request",
    sk: "Schváliť požiadavku na zmenu",
  },
  ASCENDING: {
    en: "Ascending",
    sk: "Vzostupne",
  },
  BASIC_INFORMATION: {
    en: "Basic information",
    sk: "Základné informácie",
  },
  BLOG: {
    en: "Blog",
    sk: "Blog",
  },
  BLOGPOST: {
    en: "Blogpost",
    sk: "Príspevok na blogu",
  },
  CANCEL: {
    en: "Cancel",
    sk: "Zrušiť",
  },
  CATEGORIES: {
    en: "Categories",
    sk: "Kategórie",
  },
  CHOOSE_SUBCATEGORIES: {
    en: "Choose subcategories",
    sk: "Vybrať podkategórie",
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
  DELETE: {
    en: "Delete",
    sk: "Odstrániť",
  },
  DELETE_SUBCATEGORY: {
    en: "Delete subcategory",
    sk: "Odstránenie podkategórie",
  },
  DESCENDING: {
    en: "Descending",
    sk: "Zostupne",
  },
  DESCRIPTION: {
    en: "Description",
    sk: "Popis",
  },
  BLOGPOST_NAME: {
    en: "Blogpost name",
    sk: "Názov príspevku",
  },
  BLOGPOST_URL_PATH_SEGMENT: {
    en: "URL path segment",
    sk: "URL segment prístupovej cesty",
  },
  BLOGPOST_THUMBNAIL_URL: {
    en: "Thumbnail URL",
    sk: "URL titulnej fotky",
  },
  SUB_TITLE: {
    en: "Subtitle",
    sk: "Podnadpis",
  },
  NO_ITEMS: {
    en: "No items",
    sk: "Žiadne položky",
  },
  LOGGING_IN_FAILED: {
    sk:
      "Prihlásenie sa nepodarilo, zadali ste nesprávnu kombináciu mena a hesla.",
    en:
      "Logging in failed, you entered wrong combination of username and password.",
  },
  TOGGLE_COLOR_MODE: {
    en: "Toggle color mode",
    sk: "Prepnúť farebný mód",
  },
  LOGIN_TEAM_MEMBER: {
    sk: "Prihlásenie člena tímu",
    en: "Team member log-in",
  },
  CURENTLY_LOGGED_IN_AS: {
    en: "You are currently logged in as:",
    sk: "Momentálne si prihlásený/á pod účtom:",
  },
  LANGUAGE: {
    en: "Language",
    sk: "Jazyk",
  },
  CHANGE_REQUEST: {
    en: "Change request",
    sk: "Požiadavka na zmenu",
  },
  CONTENT: {
    en: "Content",
    sk: "Obsah",
  },

  DIALOG_APPROVE_CHANGE_REQUEST: {
    en:
      "Do you want to approve change request for ^?^ It will update public page with corresponding content.",
    sk:
      "Praješ si schváliť požiadavku na zmenu ^?^ Týmto úkonom sa zmení verejne dostupná stránka so súvisiacim obsahom.",
  },
  DASHBOARD_DESCRIPTION: {
    sk: "Tu môžeš vytvárať a upravovať hodnotenia a blogy",
    en: "You can create and edit ratings and blogpost here",
  },
  LOADING: {
    en: "Loading",
    sk: "Načítavanie",
  },
  DIALOG_DELETE_SUBCATEGORY: {
    en:
      "Are you sure you want to delete subcategory ^?^ Doing so will ^ permanently delete ^ all of its data.",
    sk:
      "Si si istý, že chceš odstrániť podkategóriu ^?^ Týmto úkonom sa ^ permanentne vymažú ^ všetky súvisiace dáta.",
  },
  DIALOG_PROMOTE_TO_ADMINISTRATOR: {
    en: "Are you sure you want to make user ^ an administrator?",
    sk: "Si si istý, že chceš užívateľa ^ povýšiť na správcu?",
  },
  DIALOG_DELETE_CONTENT: {
    en:
      "Are you sure you want to delete ^ ?^ Doing so will ^delete publicly available page^ with this ^ and it will be reverted into change request stage.",
    sk:
      "Si si istý, že chceš odstrániť ^ ?^ Týmto úkonom sa ^vymaže verejne dostupná stránka^ a ^ bude vrátený do fázy požiadavky na zmenu.",
  },
  DIALOG_DELETE_CHANGE_REQUEST: {
    en: "Are you sure you want to delete change request for ^ with id ^ ?",
    sk: "Si si istý, že chceš odstrániť požiadavku na zmenu pre ^ s id ^?",
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
  ID_URL_PATH_SEGMENT: {
    en: "ID (URL path segment)",
    sk: "ID (URL segment prístupovej cesty)",
  },
  INFO_ACCOUNT_CHANGES_SAVED: {
    en: "Account changes saved.",
    sk: "Zmeny v účte boli uložené.",
  },
  INFO_CHANGE_REQUEST_APPROVED: {
    en: "Change request was approved.",
    sk: "Požiadavka na zmenu bola schválená.",
  },
  INFO_CHANGE_REQUEST_DELETED: {
    en: "Change request was deleted.",
    sk: "Požiadavka na zmenu bola odstránená.",
  },
  INFO_CONTENT_REVERTED: {
    en: "Content was deleted and reverted to change request.",
    sk: "Obsah bol odstránený a vrátený do fázy požiadavky na zmenu.",
  },
  INFO_CHANGE_REQUEST_CREATED: {
    en: "Change request created.",
    sk: "Požiadavka na zmenu bola vytvorená.",
  },
  INFO_CHANGE_REQUEST_SAVED: {
    en: "Change request saved.",
    sk: "Požiadavka na zmenu bola uložená.",
  },
  INFO_USER_ACCOUNT_CREATED: {
    en: "User account successfully created.",
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
  NOTE: {
    en: "Note",
    sk: "Poznámka",
  },
  OVERALL: {
    en: "Overall",
    sk: "Spolu",
  },
  PASSWORD: {
    en: "Password",
    sk: "Heslo",
  },
  PASSWORD_AGAIN: {
    en: "Password again",
    sk: "Heslo znova",
  },
  PROMOTE: {
    en: "Promote",
    sk: "Povýšiť",
  },
  ADMINISTRATION: {
    en: "Administration",
    sk: "Administratíva",
  },
  PROMOTE_TO_ADMINISTRATOR: {
    en: "Promote to administrator",
    sk: "Povýšiť na správcu",
  },
  VIEW: {
    en: "View",
    sk: "Zobraziť",
  },
  SORTED_BY_DATE: {
    en: "Sorted by date",
    sk: "Zoradené podľa dátumu",
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
  SEARCH_BY_NAME: {
    en: "Search by name",
    sk: "Hľadať podľa názvu",
  },
  SEARCH_BY_NAME_OR_CONTENT: {
    en: "Search by name or content",
    sk: "Hľadať podľa názvu alebo obsahu",
  },
  SEARCH_BY_NAME_OR_ID: {
    en: "Search by name or ID",
    sk: "Hľadať podľa názvu alebo ID",
  },
  MY_ACCOUNT: {
    sk: "Môj účet",
    en: "My account",
  },
  MY_CHANGE_REQUESTS: {
    en: "My change requests",
    sk: "Moje požiadavky na zmenu",
  },
  WAITING_CHANGE_REQUESTS: {
    en: "Change requests waiting for approval",
    sk: "Zmeny čakajúce na schválenie",
  },
  SORT_BY: {
    en: "Sort by",
    sk: "Zoradiť podľa",
  },
  SORT_ORDER: {
    en: "Order",
    sk: "Poradie",
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
