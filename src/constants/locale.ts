// eslint-disable-next-line import/no-cycle
import { asLocaleMessages } from "../types/locale";

export enum Locale {
  en = "en",
  sk = "sk",
}

export const LocaleMessages = asLocaleMessages({
  404: {
    en:
      "Uh-oh, the page you are trying to access does not exist... 😔 But don't worry, you can always ^return home.",
    sk:
      "Ajaj, stránka, ktorú sa snažíš navšívíť neexistuje... 😔 No nezúfaj, vždy sa môžeš ^vrátiť domov.",
  },
  ABOUT: {
    en: "About",
    sk: "O projekte",
  },
  ACCOUNT_SETTINGS: {
    en: "Account settings",
    sk: "Nastavenia účtu",
  },
  ADMINISTRATION: {
    en: "Administration",
    sk: "Administratíva",
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
  ALL_RATINGS: {
    en: "All ratings",
    sk: "Všetky hodnotenia",
  },
  APPROVE_CHANGE_REQUEST: {
    en: "Approve change request",
    sk: "Schváliť požiadavku na zmenu",
  },
  ARIA_LABEL_ARROW: {
    en: "Arrow",
    sk: "Šípka",
  },
  ARIA_LABEL_CATEGORY: {
    en: "Category",
    sk: "Kategória",
  },
  ARIA_LABEL_CHEVRON: {
    en: "Chevron",
    sk: "Krokva",
  },
  ARIA_LABEL_MENU: {
    en: "Menu",
    sk: "Menu",
  },
  ASCENDING: {
    en: "Ascending",
    sk: "Vzostupne",
  },
  AUTHORIZING_USER: {
    en: "Authorizing user",
    sk: "Autorizácia užívateľa",
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
  BLOGPOST_NAME: {
    en: "Blogpost name",
    sk: "Názov príspevku",
  },
  BLOGPOST_THUMBNAIL_URL: {
    en: "Thumbnail URL",
    sk: "URL titulnej fotky",
  },
  BLOGPOST_URL_PATH_SEGMENT: {
    en: "URL path segment",
    sk: "URL segment prístupovej cesty",
  },
  CANCEL: {
    en: "Cancel",
    sk: "Zrušiť",
  },
  CATEGORIES: {
    en: "Categories",
    sk: "Kategórie",
  },
  CHANGE_REQUEST: {
    en: "Change request",
    sk: "Požiadavka na zmenu",
  },
  CHOOSE: {
    en: "Choose",
    sk: "Vybrať",
  },
  CHOOSE_SUBCATEGORIES: {
    en: "Choose subcategories",
    sk: "Vybrať podkategórie",
  },
  CLEAR_QUERY: {
    en: "Clear query",
    sk: "Vymazať hľadaný výraz",
  },
  CONFIRM: {
    en: "Confirm",
    sk: "Potvrdiť",
  },
  CONTACT_US: {
    en: "Contact us",
    sk: "Kontakt",
  },
  CONTENT: {
    en: "Content",
    sk: "Obsah",
  },
  CREATE: {
    en: "Create",
    sk: "Vytvoriť",
  },
  CURENTLY_LOGGED_IN_AS: {
    en: "You are currently logged in as:",
    sk: "Momentálne si prihlásený/á pod účtom:",
  },
  DASHBOARD: {
    en: "Dashboard",
    sk: "Ovládací panel",
  },
  DASHBOARD_DESCRIPTION: {
    en: "You can create and edit ratings and blogpost here",
    sk: "Tu môžeš vytvárať a upravovať hodnotenia a blogy",
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
  DIALOG_APPROVE_CHANGE_REQUEST: {
    en:
      "Do you want to approve change request for ^?^ It will update public page with corresponding content.",
    sk:
      "Praješ si schváliť požiadavku na zmenu ^?^ Týmto úkonom sa zmení verejne dostupná stránka so súvisiacim obsahom.",
  },
  DIALOG_DELETE_CHANGE_REQUEST: {
    en: "Are you sure you want to delete change request for ^ with id ^?",
    sk: "Si si istý, že chceš odstrániť požiadavku na zmenu pre ^ s id ^?",
  },
  DIALOG_DELETE_CONTENT: {
    en:
      "Are you sure you want to delete ^ ?^ Doing so will ^delete publicly available page^ with this ^ and it will be reverted into change request stage.",
    sk:
      "Si si istý, že chceš odstrániť ^ ?^ Týmto úkonom sa ^vymaže verejne dostupná stránka^ a ^ bude vrátený do fázy požiadavky na zmenu.",
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
  ERROR_DEFAULT_MESSAGE: {
    en: "Oops, something went wrong.",
    sk: "Oops, niečo sa pokazilo.",
  },
  ERROR_FORM_INVALID_URL_PATH_SEGMENT: {
    en: 'Only letters, numbers and hyphens "-" are allowed. ',
    sk: 'Sú povolené iba písmená, číslice a spojovník "-".',
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
  ERROR_FORM_RATING_HAS_TO_CONTAIN_CATEGORY: {
    en: "Each rating has to contain at least one category.",
    sk: "Každé hodnotenie musí obsahovať aspoň 1 kategóriu.",
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
    en: "Evidence-based ratings of personal care product manufacturers.",
    sk: "Objektívne hodnotenia výrobcov kozmetiky na jednom mieste.",
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
  INFO_CHANGE_REQUEST_CREATED: {
    en: "Change request created.",
    sk: "Požiadavka na zmenu bola vytvorená.",
  },
  INFO_CHANGE_REQUEST_DELETED: {
    en: "Change request was menudeleted.",
    sk: "Požiadavka na zmenu bola odstránená.",
  },
  INFO_CHANGE_REQUEST_SAVED: {
    en: "Change request saved.",
    sk: "Požiadavka na zmenu bola uložená.",
  },
  INFO_CONTENT_REVERTED: {
    en: "Content was deleted and reverted to change request.",
    sk: "Obsah bol odstránený a vrátený do fázy požiadavky na zmenu.",
  },
  INFO_USER_ACCOUNT_CREATED: {
    en: "User account successfully created.",
    sk: "Užívateľský účet bol úspešne vytvorený.",
  },
  LANGUAGE: {
    en: "Language",
    sk: "Jazyk",
  },
  LOADING: {
    en: "Loading",
    sk: "Načítavanie",
  },
  LOG_IN: {
    en: "Log in",
    sk: "Prihlásiť sa",
  },
  LOG_OUT: {
    en: "Log out",
    sk: "Odhlásiť sa",
  },
  LOGGING_IN_FAILED: {
    en:
      "Logging in failed, you entered wrong combination of username and password.",
    sk:
      "Prihlásenie sa nepodarilo, zadal/a si nesprávnu kombináciu mena a hesla.",
  },
  LOGIN_TEAM_MEMBER: {
    en: "Team member log-in",
    sk: "Prihlásenie člena tímu",
  },
  MANUFACTURER_NAME: {
    en: "Manufacturer's name",
    sk: "Názov výrobcu",
  },
  META_ABOUT: {
    en:
      "Fair about care is a non-commercial project providing evidence-based ratings of personal care product manufacturers to everyone.",
    sk:
      "Fair about care je neziskový projekt, ktorý poskytuje objektívne hodnotenia výrobcov kozmetiky pre všetkých.",
  },
  META_BLOG: {
    en: "Latest articles from Fair About Care blog.",
    sk: "Najnovšie články z blogu Fair About Care.",
  },
  META_HOME: {
    en:
      "Fair rating of personal care products manufacturers available to everyone for free.",
    sk: "Férové hodnotenia výrobcov kozmetiky dostupné pre všetkých.",
  },
  META_METHODOLOGY: {
    en: "// TODO ",
    sk: "// TODO ",
  },
  META_PRIVACY_POLICY: {
    en: "// TODO ",
    sk: "// TODO ",
  },
  META_RATINGS: {
    en: "Search and sorting of personal care product manufacturers rating.",
    sk: "Vyhľadávanie a zoraďovanie hodnotení výrobcov kozmetiky.",
  },
  METHODOLOGY: {
    en: "Methodology",
    sk: "Metodológia",
  },
  MY_ACCOUNT: {
    en: "My account",
    sk: "Môj účet",
  },
  MY_CHANGE_REQUESTS: {
    en: "My change requests",
    sk: "Moje požiadavky na zmenu",
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
  NO_ITEMS: {
    en: "No items were found.",
    sk: "Žiadne položky neboli nájdené.",
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
  PRIVACY_POLICY: {
    en: "Privacy policy",
    sk: "Zásady ochrany osobných údajov ",
  },
  PROMOTE: {
    en: "Promote",
    sk: "Povýšiť",
  },
  PROMOTE_TO_ADMINISTRATOR: {
    en: "Promote to administrator",
    sk: "Povýšiť na správcu",
  },
  RATING: {
    en: "Rating",
    sk: "Hodnotenie",
  },
  RATINGS: {
    en: "Ratings",
    sk: "Hodnotenia",
  },
  READ_MORE: {
    en: "Read more",
    sk: "Čítať viac",
  },
  SAVE_CHANGES: {
    en: "Save changes",
    sk: "Uložiť zmeny",
  },
  SEARCH: {
    en: "Search",
    sk: "Hľadať",
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
  SEARCH_BY_USERNAME: {
    en: "Search by username",
    sk: "Hľadať podľa užívateľského mena",
  },
  SEARCH_MANUFACTURER: {
    en: "Search the manufacturer",
    sk: "Vyhľadaj výrobcu",
  },
  SORT_BY: {
    en: "Sort by",
    sk: "Zoradiť podľa",
  },
  SORT_ORDER: {
    en: "Order",
    sk: "Poradie",
  },
  SORTED_BY_DATE: {
    en: "Sorted by date",
    sk: "Zoradené podľa dátumu",
  },
  SUB_TITLE: {
    en: "Subtitle",
    sk: "Podnadpis",
  },
  TOGGLE_COLOR_MODE: {
    en: "Toggle color mode",
    sk: "Prepnúť farebný mód",
  },
  TOTAL: {
    en: "Total",
    sk: "Celkovo",
  },
  UNAUTHORIZED_ACCESS: {
    en: "Unauthorized access",
    sk: "Neautorizovaný prístup",
  },
  UNAUTHORIZED_ACCESS_TEXT: {
    en:
      "You are trying to access non-public page without authorization, ^go home^ or ^log in^.",
    sk:
      "Snažíš sa o prístup na neverejnú stránku, pre ktorý nemáš autorizáciu, možeš ^ísť domov^ alebo ^sa prihlásiť^.",
  },
  USERNAME: {
    en: "Username",
    sk: "Užívateľské meno",
  },
  USERS_ADMINISTRATION: {
    en: "Users administration",
    sk: "Správa užívateľov",
  },
  VIEW: {
    en: "View",
    sk: "Zobraziť",
  },
  WAITING_CHANGE_REQUESTS: {
    en: "Change requests waiting for approval",
    sk: "Zmeny čakajúce na schválenie",
  },
  WELCOME: {
    en: "Welcome",
    sk: "Vitaj",
  },
});
