import { Box } from "@chakra-ui/react";
import { compact, flatten, isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { allProductCategories, ProductCategory } from "../../../constants";
import { RatingLocalized } from "../../../types";
import RatingDetailOverview from "./RatingDetailOverview";
import RatingDetailSubCategories from "./RatingDetailSubCategories";

interface Props {
  data: RatingLocalized;
}

function RatingDetail({ data }: Props): ReactElement {
  const { asPath } = useRouter();

  const subCategories = compact(
    allProductCategories.map(({ mainCategory, label, categories }) => {
      const includedCategories = compact(
        categories.map(
          ({ value, label: subCategoryLabel }) =>
            data.rating.subCategories[value] && {
              value,
              label: subCategoryLabel,
              rating: data.rating.subCategories[value],
            }
        )
      );
      if (isEmpty(includedCategories)) {
        return null;
      }
      return { mainCategory, label, categories: includedCategories };
    })
  );

  const subCategoryValues = flatten(
    subCategories.map(({ categories }) => categories.map(({ value }) => value))
  );

  const [expandedSubCategories, setExpandedSubCategories] = useState<number[]>([
    subCategoryValues.indexOf(asPath.split("#")[1] as ProductCategory),
  ]);

  return (
    <Box layerStyle="layout" sx={{ scrollBehavior: "smooth" }}>
      <RatingDetailOverview
        {...{
          setExpandedSubCategories,
          data,
          subCategories,
          subCategoryValues,
        }}
      />
      <RatingDetailSubCategories
        {...{
          expandedSubCategories,
          setExpandedSubCategories,
          subCategories,
          subCategoryValues,
        }}
      />
    </Box>
  );
}

export default RatingDetail;
