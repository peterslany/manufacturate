import {
  Box,
  Checkbox,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { allProductCategories } from "../../constants";
import { useLocale } from "../../hooks";
import { URLParamValue } from "../../types";

interface Props {
  categories: URLParamValue;
  setCategories: (newValue: URLParamValue) => void;
}

function ProductCategories({ categories, setCategories }: Props): ReactElement {
  const handleChange = (categoryName: string) => {
    const currentCategories =
      typeof categories === "string" ? [categories] : categories || [];

    if (categories?.includes(categoryName)) {
      setCategories(
        currentCategories.filter(
          (category: string) => category !== categoryName
        )
      );
    } else {
      setCategories([...currentCategories, categoryName]);
    }
  };

  const { localizeMessage } = useLocale();

  const checkboxBorder = useColorModeValue("gray.700", "gray.200");
  const checkboxColorScheme = useColorModeValue("green", "green");
  return (
    <Flex direction="column" mt={2}>
      {allProductCategories.map(
        ({ label, categories: subCategories, mainCategory }) => (
          <Box key={mainCategory} mb={2}>
            <Heading size="md">{localizeMessage(label)}</Heading>
            {subCategories.map(({ label: categoryLabel, value }) => (
              <Flex
                key={value}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  handleChange(value);
                }}
                align="center"
                mb={1}
                ml={1}
                w="fit-content"
                cursor="pointer"
              >
                <Checkbox
                  isChecked={Boolean(categories?.includes(value))}
                  colorScheme={checkboxColorScheme}
                  borderColor={checkboxBorder}
                  mr={1}
                />
                {localizeMessage(categoryLabel)}
              </Flex>
            ))}
          </Box>
        )
      )}
    </Flex>
  );
}

export default ProductCategories;
