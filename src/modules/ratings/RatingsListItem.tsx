import { Box, Center, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { withLink } from "../../components/Link";
import { RatingCategory, ratingSubcategories } from "../../constants";
import { useSmallScreen } from "../../hooks";
import { getListItemRatingColor } from "./utils";

const RATING_TEST_DATA_TO_BE_REMOVED = {
  rating: {
    TOTAL: 5.5,
    HEALTH: 6.8,
    ECO: 5.6,
    ANIMALS: 4.4,
    ETHICS: 5.2,
  },
};

interface Props {}

interface RatingBoxProps {
  category: RatingCategory;
  value: number;
  smallerSize?: boolean;
}

function RatingBox({
  category,
  value,
  smallerSize,
}: RatingBoxProps): ReactElement {
  const color = useColorModeValue(
    getListItemRatingColor(false, category),
    getListItemRatingColor(true, category)
  );

  const size = smallerSize ? 12 : 16;
  const fontSize = smallerSize ? "xl" : "2xl";
  return (
    <Center
      w={size}
      h={size}
      // bgGradient={`linear(to-br, ${getRatingBg(category)})`}
      border="1px dashed"
      borderColor={color}
      borderRadius="full"
    >
      <Text fontSize={fontSize} fontWeight="black" color={color}>
        {value}
      </Text>
    </Center>
  );
}

function RatingsListItem({}: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const smallScreenBg = useColorModeValue("gray.900A10", "gray.50A10");
  return isSmallScreen ? (
    <Box borderRadius={48} bg={smallScreenBg} mb={4} border="1px solid">
      <Flex
        justify="space-around"
        align="center"
        borderBottom="1px solid"
        p="4"
      >
        <RatingBox value={7.6} category={RatingCategory.TOTAL} />
        <Text fontWeight="semibold" fontSize="lg" pl="8px" w="70%">
          Manufacturer Slovakia
        </Text>
      </Flex>
      <Flex wrap="wrap" p="2" pt="0">
        {ratingSubcategories.map(({ subcategory, label }) => (
          <Center
            key={subcategory}
            w="25%"
            justifyContent="space-between"
            p="4"
            flexDirection="column"
            fontSize="sm"
          >
            <RatingBox
              smallerSize
              value={RATING_TEST_DATA_TO_BE_REMOVED.rating[subcategory]}
              category={subcategory}
            />
            {label}
          </Center>
        ))}
      </Flex>
    </Box>
  ) : (
    <Box
      mt={15}
      m={4}
      layerStyle="outline"
      p="4"
      display="flex"
      alignItems="center"
      cursor="pointer"
      _groupHover={{
        boxShadow: "0 0 0 2px",
        transition: "300ms",
      }}
    >
      <Box w="14%" maxW="115px">
        <RatingBox
          category={RatingCategory.TOTAL}
          value={RATING_TEST_DATA_TO_BE_REMOVED.rating.TOTAL}
        />
      </Box>
      <Text fontWeight="semibold" fontSize="lg" pl="8px" w="30%">
        Manufacturer Slovakia
      </Text>
      <Flex w="56%" justify="space-between">
        {ratingSubcategories.map(({ subcategory }) => (
          <Center key={subcategory} w="25%">
            <RatingBox
              category={subcategory}
              value={RATING_TEST_DATA_TO_BE_REMOVED.rating[subcategory]}
            />
          </Center>
        ))}
      </Flex>
    </Box>
  );
}

export default withLink(RatingsListItem);
