import {
  Box,
  Center,
  Flex,
  Heading,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { isString } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination";
import ProductCategories from "../../components/ProductCategories";
import Searchbar from "../../components/Searchbar";
import { allProductCategories } from "../../constants";
import useSmallScreen from "../../hooks/useSmallScreen";
import useUrlParam from "../../hooks/useUrlParam";
import { URLParamValue } from "../../types/url";
import { urlParamToArray } from "../../utils/url";
import RatingsCategoryModal from "./RatingsCategoryModal";
import RatingsListHeader from "./RatingsListHeader";
import RatingsListItem from "./RatingsListItem";
import { getProductCategoryLabel } from "./utils";

interface Props {}

function Ratings({}: Props): ReactElement {
  //   const isSmallerScreen = useSmallScreen();

  //   const FilterContainer = FiltersModal;
  const [searchQuery] = useUrlParam("search");
  const [categories, setCategories] = useUrlParam("category");
  const [sortBy, setSortBy] = useUrlParam("sortBy");
  const [sortMode, setSortMode] = useUrlParam("sortMode");
  const [page, setPage] = useUrlParam("page");

  const [ratingBy, setRatingBy] = useState<string | undefined>(
    isString(categories) ? categories : undefined
  );

  const contentBg = useColorModeValue(
    "linear(to-b,gray.900A05, gray.900A20)",
    "linear(to-b, gray.50A05, gray.50A20)"
  );

  const isSmallScreen = useSmallScreen();

  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onClose: onCategoryModalClose,
  } = useDisclosure();

  useEffect(() => {
    console.log(
      "REFETCH DATA",
      JSON.stringify({ searchQuery, categories, sortBy, sortMode, page })
    );
  }, [searchQuery, categories, sortBy, sortMode, page]);

  const handleModalConfirm = (newCategories: URLParamValue) => {
    setCategories(newCategories);
    onCategoryModalClose();
  };

  const handleRemoveCategory = (categoryValue: string) => {
    setCategories(
      urlParamToArray(categories).filter((value) => value !== categoryValue)
    );
  };

  const items = (
    <>
      <RatingsListItem />
      <RatingsListItem />
      <RatingsListItem />
    </>
  );
  return (
    <Flex direction={["column", "column", "row"]}>
      {!isSmallScreen && (
        <Box
          p={2}
          pl={4}
          bgGradient={contentBg}
          pb={24}
          h="min-content"
          width="280px"
          borderBottomRightRadius="420px"
        >
          <ProductCategories {...{ categories, setCategories }} />
        </Box>
      )}
      <Box w="full" p={[4, 8, 0]} pl={[4, 8, 16]}>
        <Heading my={[2, 5]} size="lg">
          Hodnotenia
        </Heading>
        <Searchbar
          mb={5}
          showFullSearchbar
          borderWidth={2}
          totalWidth={["240px", "420px"]}
          scrollOnSearch={false}
        />

        <Box mb={5}>
          Kategórie
          <Box
            border="1px solid"
            borderColor="initial"
            borderRadius={24}
            p="1"
            w="fit-content"
            display="flex"
            flexWrap="wrap"
          >
            {isSmallScreen && (
              <>
                <Button layerStyle="outline" onClick={onCategoryModalOpen}>
                  Vybrať
                </Button>
                <RatingsCategoryModal
                  {...{
                    isOpen: isCategoryModalOpen,
                    onClose: onCategoryModalClose,
                    categories,
                    onConfirm: handleModalConfirm,
                  }}
                />
              </>
            )}
            {urlParamToArray(categories).map((value) => (
              <Tag
                key={value}
                size="md"
                borderRadius="24px"
                bg="transparent"
                color="inherit"
                variant="outline"
                m="1"
              >
                <TagLabel>{getProductCategoryLabel(value)}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveCategory(value)} />
              </Tag>
            ))}
          </Box>
        </Box>
        <Box>
          Hodnotenie podla?
          <Select
            value={ratingBy}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setRatingBy(event.target.value)
            }
          >
            <option value="all"> Vsetky</option>
            {allProductCategories.map(
              ({ label, categories: subcategories }) => (
                <optgroup key={label} label={label}>
                  {subcategories.map(({ label: subcategoryLabel, value }) => (
                    <option key={value} value={value}>
                      {subcategoryLabel}
                    </option>
                  ))}
                </optgroup>
              )
            )}
          </Select>
        </Box>
        <Box {...(!isSmallScreen && { bgGradient: contentBg })}>
          <RatingsListHeader
            {...{ sortBy, sortMode, setSortBy, setSortMode }}
          />
          {items}
          <Center>
            <Pagination
              mb="4"
              selectedPage={JSON.parse(isString(page) ? page : "1")}
              onPageChange={(pageNumber) => setPage(pageNumber.toString())}
              totalPages={11}
            />
          </Center>
        </Box>
      </Box>
    </Flex>
  );
}

export default Ratings;
