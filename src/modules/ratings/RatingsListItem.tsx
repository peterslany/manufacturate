import {
  Box,
  Center,
  Flex,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { withLink } from "../../components/Link";
import { RatingCategory, ratingSubcategories } from "../../constants";
import { useLocale, useSmallScreen } from "../../hooks";
import { BasicRatingUnit } from "../../types";
import { roundRating } from "../../utils";
import { getRatingCategoryColor } from "./utils";

interface Props {
  loading?: boolean;
  name: string;
  rating: BasicRatingUnit;
}

interface RatingBoxProps {
  category: RatingCategory;
  loading?: boolean;
  smallerSize?: boolean;
  value: number;
}

function RatingBox({
  category,
  value,
  smallerSize,
  loading,
}: RatingBoxProps): ReactElement {
  const color = useColorModeValue(
    getRatingCategoryColor(false, category),
    getRatingCategoryColor(true, category)
  );
  const size = smallerSize ? 12 : 16;
  const fontSize = smallerSize ? "xl" : "2xl";
  return (
    <Skeleton
      isLoaded={!loading}
      endColor={color}
      height={size}
      w={size}
      borderRadius="full"
    >
      <Center
        w={size}
        h={size}
        // bgGradient={`linear(to-br, ${getRatingBg(category)})`}
        border="1px dashed"
        borderColor={color}
        borderRadius="full"
      >
        <Text fontSize={fontSize} fontWeight="black" color={color}>
          {roundRating(value)}
        </Text>
      </Center>
    </Skeleton>
  );
}

function RatingsListItem({ name, rating, loading }: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const { localizeMessage } = useLocale();
  const smallScreenBg = useColorModeValue("gray.900A10", "gray.50A10");
  const smallScreenHeading = useColorModeValue(
    { bg: "gray.50A99", borderColor: "#00000030" },
    { bg: "gray.900A99", borderColor: "#ffffff30" }
  );
  return isSmallScreen ? (
    <Box borderRadius={48} bg={smallScreenBg} my={4} border="1px solid">
      <Flex
        justify="space-around"
        align="center"
        borderBottom="1px solid"
        borderColor={smallScreenHeading.borderColor}
        bg={smallScreenHeading.bg}
        borderTopRadius={48}
        p="3"
      >
        <RatingBox
          loading={loading}
          value={rating.total}
          category={RatingCategory.TOTAL}
        />
        <Skeleton isLoaded={!loading} pl="8px" w="70%">
          <Text fontWeight="semibold" fontSize="xl">
            {name}
          </Text>
        </Skeleton>
      </Flex>
      <Flex wrap="wrap" p="2" pt="0">
        {ratingSubcategories.map(({ subCategory: subcategory, label }) => (
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
              value={rating[subcategory]}
              category={subcategory}
              loading={loading}
            />
            {localizeMessage(label)}
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
      transition="box-shadow 300ms ease-in-out"
      _groupHover={{
        boxShadow: "0 0 0 2px",
      }}
    >
      <Box w="14%" maxW="115px">
        <RatingBox
          loading={loading}
          category={RatingCategory.TOTAL}
          value={rating?.total}
        />
      </Box>
      <Skeleton isLoaded={!loading} pl="8px" w="30%">
        <Text fontWeight="semibold" fontSize="lg">
          {name}
        </Text>
      </Skeleton>
      <Flex w="56%" justify="space-between">
        {ratingSubcategories.map(({ subCategory: subcategory }) => (
          <Center key={subcategory} w="25%">
            <RatingBox
              loading={loading}
              category={subcategory}
              value={rating?.[subcategory]}
            />
          </Center>
        ))}
      </Flex>
    </Box>
  );
}

export default withLink<Props>(RatingsListItem);
