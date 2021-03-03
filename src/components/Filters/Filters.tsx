import {
  Box,
  Checkbox,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { allProductCategories } from "../../constants";
import useUrlParam from "../../hooks/useUrlParam";

interface Props {}

function Filters({}: Props): ReactElement {
  const [selected, setCategories] = useUrlParam("category");

  const handleChange = (categoryName: string) => {
    const currentCategories =
      typeof selected === "string" ? [selected] : selected || [];
    if (selected?.includes(categoryName)) {
      setCategories(
        currentCategories.filter(
          (category: string) => category !== categoryName
        )
      );
    } else {
      setCategories([...currentCategories, categoryName]);
    }
  };

  const checkboxBorder = useColorModeValue("gray.700", "gray.200");
  const checkboxColorScheme = useColorModeValue("green", "green");
  return (
    <Flex direction="column">
      {allProductCategories.map(({ label, categories }) => (
        <Box key={label} mb={2}>
          <Heading size="md">{label}</Heading>
          {categories.map(({ label: categoryLabel, value }) => (
            <Flex align="center" mb={1} ml={1} key={value}>
              <Checkbox
                colorScheme={checkboxColorScheme}
                borderColor={checkboxBorder}
                onChange={() => handleChange(value)}
                isChecked={Boolean(selected?.includes(value))}
                mr={1}
              />
              {categoryLabel}
            </Flex>
          ))}
        </Box>
      ))}
    </Flex>
  );
}

export default Filters;
