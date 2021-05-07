import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Select } from "../../components";
import {
  HEADER_HEIGHT,
  LocaleMessages,
  RatingCategory,
  ratingSubcategories,
  SortOrder,
} from "../../constants";
import { useLocale } from "../../hooks";
import {
  LocaleMessage,
  RatingsSortableFields,
  URLParamValue,
} from "../../types";

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
  const { localizeMessage, Message } = useLocale();

  const listHeaderColors = useColorModeValue(
    ["gray.700", "gray.50"],
    ["gray.300", "gray.900"]
  );

  const handleSort = (field: RatingsSortableFields) => {
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

  function RatingsListHeadItem({
    label,
    w,
    value,
    pl = 0,
    maxW,
    justify,
  }: {
    justify?: "center" | undefined;
    label: LocaleMessage;
    maxW?: string;
    pl?: number | string;
    value: RatingsSortableFields;
    w: string;
  }) {
    return (
      <Flex
        {...{
          key: value,
        }}
        w={w}
        maxW={maxW}
        pl={pl}
        justify={justify}
        align="center"
      >
        <Text
          {...{
            onClick: () => handleSort(value),
          }}
          fontWeight="semibold"
          display="flex"
          wordBreak="break-all"
          _hover={{
            textDecoration: "underline",
            textDecorationColor: "green",
          }}
          textDecoration={sortBy === value ? "underline" : undefined}
          cursor="pointer"
          role="button"
          tabIndex={0}
          _focus={{ layerStyle: "focus", outline: "none" }}
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

  const sortByOptions = [
    {
      label: Message.RATING,
      value: RatingCategory.TOTAL,
    },
    {
      label: Message.MANUFACTURER_NAME,
      value: "manufacturer_name",
    },
    ...ratingSubcategories.map(({ label, subCategory }) => ({
      label: localizeMessage(label),
      value: subCategory,
    })),
  ];

  const sortOrderOptions = [
    {
      label: Message.ASCENDING,
      value: SortOrder.ASCENDING,
    },
    {
      label: Message.DESCENDING,
      value: SortOrder.DESCENDING,
    },
  ];
  return (
    <>
      <Flex
        display={["flex", null, "none"]}
        justify="space-between"
        mb="4"
        wrap="wrap"
      >
        <Select<string>
          name="sortBy"
          options={sortByOptions}
          onChange={setSortBy}
          label={Message.SORT_BY}
          hasUndefinedValue
        />
        <Select<SortOrder>
          name="sortOrder"
          options={sortOrderOptions}
          onChange={setSortOrder}
          label={Message.SORT_ORDER}
          hasUndefinedValue
        />
      </Flex>

      <Flex
        bg={listHeaderColors[0]}
        color={listHeaderColors[1]}
        mt="-1px"
        py="4"
        px="8"
        display={["none", null, "flex"]}
        wrap="nowrap"
        position="sticky"
        top={HEADER_HEIGHT}
        zIndex="1"
      >
        <RatingsListHeadItem
          {...{
            label: LocaleMessages.RATING,
            value: RatingCategory.TOTAL,
          }}
          w="14%"
          maxW="115px"
        />
        <RatingsListHeadItem
          {...{
            label: LocaleMessages.MANUFACTURER_NAME,
            value: "manufacturer_name",
          }}
          w="30%"
          pl="2"
        />
        <Flex w="56%" justify="space-between">
          {ratingSubcategories.map(({ label, subCategory: subcategory }) => (
            <RatingsListHeadItem
              key={subcategory}
              {...{
                label,
                value: subcategory,
              }}
              w="25%"
              justify="center"
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export default RatingsListHeader;
