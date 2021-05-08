import { useColorModeValue } from "@chakra-ui/react";

const useColorVariations = (colors: string[]): { bg: string; fg: string }[] => {
  const shade = useColorModeValue([600, 200], [200, 600]);

  const variateColor = (color: string) => ({
    fg: `${color}.${shade[0]}`,
    bg: `${color}.${shade[1]}`,
  });

  const result = colors.map((color) => variateColor(color));

  return result;
};
export default useColorVariations;
