/* eslint-disable import/no-cycle */
import { Locale, LocaleMessages } from "../constants/locale";

export type LocaleMessage = {
  [key in Locale]: string;
};
// | { [key in Locale]: (...args: unknown[]) => string };

export type LocalizedMessageValue = string; // | ((...args: unknown[]) => string);

export type LocalizedMessages = {
  [key in keyof typeof LocaleMessages]: LocalizedMessageValue;
};

export const asLocaleMessages = <T>(
  messages: { [K in keyof T]: LocaleMessage }
): { [K in keyof T]: LocaleMessage } => messages;

export type SimpleLocaleMessage = { [key in Locale]: string };
