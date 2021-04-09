import { Box, chakra, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { allRatingCategories, RatingCategory } from "../../../constants";
import { useLocale } from "../../../hooks";
import { RatingUnit } from "../../../types";
import { roundRating } from "../../../utils";
import { getRatingCategoryColor } from "../utils";

interface RatingBarsProps {
  className?: string;
  isSmall?: boolean;
  rating: RatingUnit<string>;
}

function RatingBars({ rating, className, isSmall }: RatingBarsProps) {
  const { localizeMessage } = useLocale();
  const { colorMode } = useColorMode();

  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateBars(true));
  }, []);

  const sizeConfig = {
    height: {
      total: isSmall ? [10, 14] : [16, 20],
      subCategories: isSmall ? [8, 12] : [12, 16],
    },
    fontSize: {
      total: isSmall ? ["2xl", "3xl"] : ["3xl", "4xl"],
      subCategories: isSmall ? ["xl", "2xl"] : ["2xl", "3xl"],
    },
  };
  return (
    <Box maxW="580px" className={className}>
      {allRatingCategories.map(({ subCategory, label }, index) => (
        <Box
          key={subCategory}
          mb={isSmall ? 1 : [1, 2]}
          h={
            subCategory === RatingCategory.TOTAL
              ? sizeConfig.height.total
              : sizeConfig.height.subCategories
          }
          color={colorMode === "dark" ? "black" : "white"}
          position="relative"
          bgColor={colorMode === "dark" ? "gray.50" : "gray.500"}
          borderRadius="16px"
        >
          <Box
            top="0"
            bgColor={getRatingCategoryColor(colorMode === "dark", subCategory)}
            position="absolute"
            transition={`width ${
              1000 + 300 * index
            }ms cubic-bezier(0.65, 0, 0.35, 1)`}
            w={animateBars ? `${rating[subCategory] * 10}%` : 0}
            h={
              subCategory === RatingCategory.TOTAL
                ? sizeConfig.height.total
                : sizeConfig.height.subCategories
            }
            borderRadius="16px"
            value={rating[subCategory] * 10}
          />
          <Flex
            position="relative"
            zIndex="1"
            justify="space-between"
            align="center"
            w="full"
            h="full"
            px="4"
            top="0"
            fontWeight="black"
          >
            <Text
              fontSize={
                subCategory === RatingCategory.TOTAL
                  ? sizeConfig.fontSize.total
                  : sizeConfig.fontSize.subCategories
              }
              mr="4"
            >
              {localizeMessage(label)}
            </Text>
            <Text
              fontSize={
                subCategory === RatingCategory.TOTAL
                  ? sizeConfig.fontSize.total
                  : sizeConfig.fontSize.subCategories
              }
            >
              {roundRating(rating[subCategory])}/10
            </Text>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default chakra(RatingBars);
