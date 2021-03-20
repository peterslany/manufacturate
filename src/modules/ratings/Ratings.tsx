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
import React, { ReactElement, useState } from "react";
import {
  Button,
  Pagination,
  ProductCategories,
  Searchbar,
} from "../../components";
import { allProductCategories, ApiUrl, PAGE_SIZE } from "../../constants";
import { useGet, useLocale, useSmallScreen, useUrlParam } from "../../hooks";
import { URLParamValue } from "../../types";
import { RatingsListData } from "../../types/ratings";
import { urlParamToArray } from "../../utils";
import RatingsCategoryModal from "./RatingsCategoryModal";
import RatingsListHeader from "./RatingsListHeader";
import RatingsListItem from "./RatingsListItem";
import { getProductCategoryLabel } from "./utils";

interface Props {
  // TODO:add Ratings type
  initialRatingsData: RatingsListData;
}

function Ratings({}: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const [categories, setCategories] = useUrlParam("category");
  const [sortBy, setSortBy] = useUrlParam("sortBy");
  const [sortOrder, setSortOrder] = useUrlParam("sortOrder");
  const [page, setPage] = useUrlParam("page");

  const [ratingBy, setRatingBy] = useState<string | undefined>(
    isString(categories) ? categories : undefined
  );

  const contentBg = useColorModeValue("gray.900A10", "gray.50A10");

  // TODO: change data assignment to initialvalue from props
  const {
    data: { ratings, count } = { ratings: [], count: 0 },
  } = useGet<RatingsListData>(ApiUrl.RATINGS);

  const { Message, localizeMessage } = useLocale();

  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onClose: onCategoryModalClose,
  } = useDisclosure();

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
    ratings || []
  ).map(({ _id, name, rating: { overall: rating } }) => (
    <RatingsListItem
      href={`/ratings/${_id}`}
      key={_id}
      linkText={name}
      name={name}
      rating={rating}
    />
  ));

  return (
    <Flex direction={["column", "column", "row"]}>
      {!isSmallScreen && (
        <Box
          p={2}
          pl={4}
          bg={contentBg}
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
          {Message.RATINGS}
        </Heading>
        <Searchbar
          mb={5}
          showFullSearchbar
          borderWidth={2}
          totalWidth={["240px", "420px"]}
          scrollOnSearch={false}
        />

        <Box mb={5}>
          {Message.CATEGORIES}
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
                bg="transparent"
                color="inherit"
                variant="outline"
                borderRadius="16px"
                m="1"
              >
                <TagLabel>
                  {localizeMessage(getProductCategoryLabel(value))}
                </TagLabel>
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
              ({ label, categories: subcategories, mainCategory }) => (
                <optgroup
                  key={mainCategory}
                  label={localizeMessage(label) as string}
                >
                  {subcategories.map(({ label: subcategoryLabel, value }) => (
                    <option key={value} value={value}>
                      {localizeMessage(subcategoryLabel)}
                    </option>
                  ))}
                </optgroup>
              )
            )}
          </Select>
        </Box>
        <Box
          {...(!isSmallScreen && {
            bg: contentBg,
          })}
        >
          <RatingsListHeader
            {...{
              sortBy,
              sortOrder,
              setSortBy,
              setSortOrder,
            }}
          />
          {items}
          <Center>
            <Pagination
              mb="4"
              selectedPage={JSON.parse(isString(page) ? page : "1")}
              onPageChange={(pageNumber) => setPage(pageNumber.toString())}
              totalPages={Math.ceil((count || 0) / PAGE_SIZE)}
            />
          </Center>
        </Box>
      </Box>
    </Flex>
  );
}

export default Ratings;
