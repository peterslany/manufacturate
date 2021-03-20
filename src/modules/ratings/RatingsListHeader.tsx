import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormLabel,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import {
  HEADER_HEIGHT,
  LocaleMessages,
  RatingCategory,
  ratingSubcategories,
  SortOrder,
} from "../../constants";
import { useLocale, useSmallScreen } from "../../hooks";
import { LocaleMessage, URLParamValue } from "../../types";

interface Props {
  setSortBy: (newValue: URLParamValue) => void;
  setSortOrder: (newValue: URLParamValue) => void;
  sortBy: URLParamValue;
  sortOrder: URLParamValue;
}

function RatingsListHeader({
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const listHeaderBg = useColorModeValue("glassLight", "glassDark");

  const { localizeMessage, Message } = useLocale();
  // TODO add sort type
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(
        sortOrder === SortOrder.ASCENDING
          ? SortOrder.DESCENDING
          : SortOrder.ASCENDING
      );
    } else {
      setSortBy(field);
    }
  };

  // TODO add sort type value to value
  function RatingsListHeadItem({
    label,
    width,
    value,
    pl = 0,
    maxW,
    align,
  }: {
    align?: "center" | undefined;
    label: LocaleMessage;
    maxW?: string;
    pl?: number;
    value: any;
    width: string;
  }) {
    return (
      <Flex
        key={value}
        w={width}
        maxW={maxW}
        pl={pl}
        justifyContent={align}
        alignItems="center"
      >
        <Text
          fontWeight="semibold"
          display="flex"
          wordBreak="break-all"
          _hover={{
            textDecoration: "underline",
            textDecorationColor: "green",
          }}
          {...(sortBy === value ? { textDecoration: "underline" } : {})}
          cursor="pointer"
          onClick={() => handleSort(value)}
        >
          {localizeMessage(label)}
        </Text>
        {sortBy === value && (
          <ChevronDownIcon
            transform={
              (sortOrder === SortOrder.ASCENDING && "rotate(180deg)") || "none"
            }
          />
        )}
      </Flex>
    );
  }

  return isSmallScreen ? (
    /* TODO: refactor for correct labels for accessability, put into own file and component
            together with table head for desktop version */
    <>
      <FormLabel htmlFor="sortBy">Zoradit podla</FormLabel>
      <Flex>
        <Select
          layerStyle="outline"
          name="sortBy"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(event.target.value)
          }
        >
          <option value={RatingCategory.TOTAL}>{Message.RATING}</option>
          <option value="manufacturer_name">{Message.MANUFACTURER_NAME}</option>
          {ratingSubcategories.map(({ label, subcategory }) => (
            <option key={subcategory} value={subcategory}>
              {localizeMessage(label)}
            </option>
          ))}
        </Select>
        <Select
          layerStyle="outline"
          name="sortMode"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setSortOrder(event.target.value)
          }
        >
          <option value={SortOrder.DESCENDING}>Zostupne</option>
          <option value={SortOrder.ASCENDING}>Vzostupne</option>
        </Select>
      </Flex>
    </>
  ) : (
    <Box
      layerStyle={listHeaderBg}
      mt="-1px"
      py="4"
      px="8"
      display="flex"
      flexWrap="nowrap"
      position="sticky"
      top={HEADER_HEIGHT}
      zIndex="1"
    >
      <RatingsListHeadItem
        label={LocaleMessages.RATING}
        value={RatingCategory.TOTAL}
        width="14%"
        maxW="115px"
      />
      <RatingsListHeadItem
        label={LocaleMessages.MANUFACTURER_NAME}
        value="manufacturer_name"
        width="30%"
        pl={2}
      />
      <Flex w="56%" justify="space-between">
        {ratingSubcategories.map(({ label, subcategory }) => (
          <RatingsListHeadItem
            key={subcategory}
            label={label}
            value={subcategory}
            width="25%"
            align="center"
          />
        ))}
      </Flex>
    </Box>
  );
}

export default RatingsListHeader;
