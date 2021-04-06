import { compact, isArray, isString, round } from "lodash";

export const parseInteger = (value?: string): number | undefined => {
  if (!value) return undefined;
  try {
    return parseInt(value, 10);
  } catch {
    return undefined;
  }
};

export const parseString = (value: unknown): string | undefined =>
  isString(value) ? value : undefined;

export const roundRating = (value: number): string =>
  round(value, 1).toFixed(1);

export const arrayify = <T>(value: T | T[] | undefined): T[] =>
  isArray(value) ? value : compact([value]);
