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
import { HEADER_HEIGHT, ratingSubcategories } from "../../constants";
import { useSmallScreen } from "../../hooks";
import { URLParamValue } from "../../types";

interface Props {
  sortBy: URLParamValue;
  sortMode: URLParamValue;
  setSortBy: (newValue: URLParamValue) => void;
  setSortMode: (newValue: URLParamValue) => void;
}

function RatingsListHeader({
  sortBy,
  sortMode,
  setSortBy,
  setSortMode,
}: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const listHeaderBg = useColorModeValue("glassLight", "glassDark");

  // TODO add sort type
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortMode(sortMode === "asc" ? "desc" : "asc");
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
    label: string;
    width: string;
    value: any;
    pl?: number;
    maxW?: string;
    align?: "center" | undefined;
  }) {
    return (
      <Flex
        key={label}
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
          {label}
        </Text>
        {sortBy === value && (
          <ChevronDownIcon
            transform={(sortMode === "asc" && "rotate(180deg)") || "none"}
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
          <option value="RATING">Hodnotenie</option>
          <option value="NAME">Názov</option>
          {ratingSubcategories.map(({ label, subcategory }) => (
            <option key={subcategory} value={subcategory}>
              {label}
            </option>
          ))}
        </Select>
        <Select
          layerStyle="outline"
          name="sortMode"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setSortMode(event.target.value)
          }
        >
          <option value="ASC">Vzostupne</option>
          <option value="DESC">Zostupne</option>
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
    >
      <RatingsListHeadItem
        label="Hodnotenie"
        value="RATING"
        width="14%"
        maxW="115px"
      />
      <RatingsListHeadItem label="Názov" value="NAME" width="30%" pl={2} />
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
