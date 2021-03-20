import { isString } from "lodash";

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
