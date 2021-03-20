import { useRouter } from "next/router";
import { useMemo } from "react";
import { Locale, LocaleMessages } from "../constants";
import {
  LocaleMessage,
  LocalizedMessages,
  LocalizedMessageValue,
} from "../types";

export const useLocale = (): {
  Message: LocalizedMessages;
  locale: Locale;
  localizeMessage: (message: LocaleMessage) => LocalizedMessageValue;
} => {
  const { locale: routerLocale } = useRouter();

  if (!Object.values(Locale).includes(routerLocale as Locale)) {
    throw new Error(
      `Locale ${routerLocale} not found in Locale enum definition!`
    );
  }

  const locale = routerLocale as Locale;

  const Message = useMemo(
    () =>
      Object.keys(LocaleMessages).reduce(
        (result, message) => ({
          ...result,
          [message]:
            LocaleMessages[message as keyof typeof LocaleMessages][locale],
        }),
        {}
      ) as LocalizedMessages,
    [locale]
  );

  const localizeMessage = (message: LocaleMessage): LocalizedMessageValue =>
    message[locale];

  return { locale, localizeMessage, Message };
};
export default useLocale;
