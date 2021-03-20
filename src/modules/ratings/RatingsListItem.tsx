import { Box, Center, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { withLink } from "../../components/Link";
import { RatingCategory, ratingSubcategories } from "../../constants";
import { useLocale, useSmallScreen } from "../../hooks";
import { getListItemRatingColor } from "./utils";

interface Props {
  name: string;
  rating: any;
}

interface RatingBoxProps {
  category: RatingCategory;
  smallerSize?: boolean;
  value: number;
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

function RatingsListItem({ name, rating }: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const { localizeMessage } = useLocale();
  const smallScreenBg = useColorModeValue("gray.900A10", "gray.50A10");
  return isSmallScreen ? (
    <Box borderRadius={48} bg={smallScreenBg} mb={4} border="1px solid">
      <Flex
        justify="space-around"
        align="center"
        borderBottom="1px solid"
        p="4"
      >
        <RatingBox value={rating.total} category={RatingCategory.TOTAL} />
        <Text fontWeight="semibold" fontSize="lg" pl="8px" w="70%">
          {name}
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
              value={rating[subcategory]}
              category={subcategory}
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
        <RatingBox category={RatingCategory.TOTAL} value={rating?.total} />
      </Box>
      <Text fontWeight="semibold" fontSize="lg" pl="8px" w="30%">
        {name}
      </Text>
      <Flex w="56%" justify="space-between">
        {ratingSubcategories.map(({ subcategory }) => (
          <Center key={subcategory} w="25%">
            <RatingBox category={subcategory} value={rating?.[subcategory]} />
          </Center>
        ))}
      </Flex>
    </Box>
  );
}

export default withLink<Props>(RatingsListItem);
