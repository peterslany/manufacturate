import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ExpandedIndex,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import MDRenderer from "../../../components/MDRenderer/MDRenderer";
import {
  HEADER_HEIGHT,
  ProductCategory,
  ProductSuperCategory,
} from "../../../constants";
import { useLocale } from "../../../hooks";
import { LocaleMessage, RatingUnit } from "../../../types";
import { arrayify } from "../../../utils";
import RatingBars from "./RatingBars";

interface Props {
  expandedSubCategories: number[];
  setExpandedSubCategories: React.Dispatch<React.SetStateAction<number[]>>;
  subCategories: {
    categories: {
      label: LocaleMessage;
      rating: RatingUnit<string>;
      value: ProductCategory;
    }[];
    label: LocaleMessage;
    mainCategory: ProductSuperCategory;
  }[];
  subCategoryValues: ProductCategory[];
}

function RatingDetailSubCategories({
  subCategories,
  subCategoryValues,
  expandedSubCategories,
  setExpandedSubCategories,
}: Props): ReactElement {
  const { Message, localizeMessage } = useLocale();

  const [firstBg, secondBg] = useColorModeValue(
    ["gray.50", "gray.200"],
    ["gray.600", "gray.700"]
  );

  return (
    <>
      <Heading mt={[2, 4]}>{Message.CATEGORIES}</Heading>
      <Accordion
        reduceMotion
        allowToggle
        allowMultiple
        index={expandedSubCategories}
        onChange={(index: ExpandedIndex) =>
          setExpandedSubCategories(arrayify<number>(index))
        }
      >
        {subCategories.map(({ mainCategory, label, categories }) => (
          <Box mb={[2, 4, 8]} key={mainCategory}>
            <Heading size="md" mb="2">
              {localizeMessage(label)}
            </Heading>
            {categories.map(({ value, label: subCategoryLabel, rating }) => (
              <Box my="2" position="relative" key={value}>
                {/* #hash anchor with negative value to offset header height */}
                <Box
                  h="0"
                  position="absolute"
                  id={value}
                  top={HEADER_HEIGHT.map((height) => -height)}
                />
                <AccordionItem
                  layerStyle="outline16"
                  bgColor={
                    subCategoryValues.indexOf(value) % 2 === 1
                      ? firstBg
                      : secondBg
                  }
                >
                  <AccordionButton
                    fontSize="lg"
                    py={[2, 4]}
                    borderRadius="16px"
                    _focus={{
                      layerStyle: "focus",
                    }}
                    _expanded={{
                      borderBottom: "1px solid",
                      borderBottomRadius: 0,
                    }}
                    transition="none"
                  >
                    <Flex justify="space-between" w="full">
                      {localizeMessage(subCategoryLabel)}
                      <AccordionIcon />
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel>
                    <Flex
                      justify="space-between"
                      direction={["column-reverse", "column-reverse", "row"]}
                      p={[2, 4, 8]}
                    >
                      <MDRenderer>{rating.description}</MDRenderer>
                      <RatingBars
                        isSmall
                        flexGrow={1}
                        ml={[0, 0, 4]}
                        mb={[4, 4, 0]}
                        rating={rating}
                      />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Box>
            ))}
          </Box>
        ))}
      </Accordion>
    </>
  );
}

export default RatingDetailSubCategories;
