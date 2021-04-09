import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { uniq } from "lodash";
import React, { ReactElement } from "react";
import MDRenderer from "../../../components/MDRenderer/MDRenderer";
import { ProductCategory, ProductSuperCategory } from "../../../constants";
import { useColorVariations, useLocale } from "../../../hooks";
import { LocaleMessage, RatingLocalized, RatingUnit } from "../../../types";
import { formatDateLong } from "../../../utils";
import RatingBars from "./RatingBars";

interface Props {
  data: RatingLocalized;
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

function RatingDetailOverview({
  data,
  setExpandedSubCategories,
  subCategoryValues,
  subCategories,
}: Props): ReactElement {
  const { Message, localizeMessage, locale } = useLocale();

  const [gray] = useColorVariations(["gray"]);

  return (
    <Grid
      p={[4, 8]}
      templateAreas={[
        '"heading" "rating" "categories-description"',
        '"heading heading" "rating categories-description"',
      ]}
      gap={[4, 8, 12]}
      bgColor={gray.bg}
    >
      <Box gridArea="heading">
        <Flex align="center" justify="space-between">
          <Heading size="lg">{data.name}</Heading>
          {formatDateLong(data.date, locale)}
        </Flex>
        <Divider opacity="0.2" mt="2" borderBottom="1px solid" />
      </Box>
      <Box gridArea="rating">
        <RatingBars rating={data.rating.overall} />
      </Box>
      <Box gridArea="categories-description" overflow="hidden">
        <Heading>{Message.CATEGORIES}</Heading>
        <Flex justify="space-between" wrap="wrap">
          {subCategories.map(({ mainCategory, label, categories }) => (
            <Box w="200px" p="2" key={mainCategory}>
              <Text fontWeight="bold" textTransform="uppercase">
                {localizeMessage(label)}
              </Text>
              {categories.map(({ label: subCategoryLabel, value }) => (
                <Flex
                  align="center"
                  my="1"
                  overflowWrap="break-word"
                  key={value}
                >
                  <CheckCircleIcon
                    aria-label={Message.ARIA_LABEL_CATEGORY}
                    mr="1"
                  />
                  <Link
                    onClick={() =>
                      setExpandedSubCategories((prev) =>
                        uniq([...prev, subCategoryValues.indexOf(value)])
                      )
                    }
                    href={`#${value}`}
                  >
                    {localizeMessage(subCategoryLabel)}
                  </Link>
                </Flex>
              ))}
            </Box>
          ))}
        </Flex>
        <Divider opacity="0.2" my="8" borderBottom="1px solid" />

        <MDRenderer>{data.rating.overall.description}</MDRenderer>
      </Box>
    </Grid>
  );
}

export default RatingDetailOverview;
