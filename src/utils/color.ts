import { ResponsiveValue } from "@chakra-ui/react";

export const getColorValue = (color: string): number => {
  try {
    return parseInt(color.split(".")[1], 10);
  } catch {
    throw new TypeError(
      `Color ${color} is not in valid format: '[string].[integer]'!`
    );
  }
};

export const getColorName = (color: string): string => color.split(".")[0];

export const addToColor = (
  color: string | ResponsiveValue<string>,
  value: number
): string =>
  `${getColorName(color as string)}.${getColorValue(color as string) + value}`;

export default 1;
