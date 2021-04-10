import {
  Box,
  Center,
  Flex,
  Heading,
  ScaleFade,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { ReactElement } from "react";
import {
  Button,
  Head,
  Pagination,
  ProductCategories,
  UrlParamSearchbar,
} from "../../components";
import { ApiUrl, PAGE_SIZE } from "../../constants";
import { useGet, useLocale, useSmallScreen, useUrlParam } from "../../hooks";
import { URLParamValue } from "../../types";
import { RatingsListData } from "../../types/ratings";
import {
  arrayify,
  getProductCategoryLabel,
  parseInteger,
  parseString,
} from "../../utils";
import RatingsCategoryModal from "./RatingsCategoryModal";
import RatingsListHeader from "./RatingsListHeader";
import RatingsListItem from "./RatingsListItem";

interface Props {
  initialRatingsData: RatingsListData;
}

function Ratings({ initialRatingsData }: Props): ReactElement {
  const isSmallScreen = useSmallScreen();

  const [categories, setCategories] = useUrlParam("category");
  const [sortBy, setSortBy] = useUrlParam("sortBy");
  const [sortOrder, setSortOrder] = useUrlParam("sortOrder");
  const [page, setPage] = useUrlParam("page");

  const contentBg = useColorModeValue("gray.900A10", "gray.50A10");

  const { data, loading } = useGet<RatingsListData>(ApiUrl.RATINGS, {
    includeQueryString: true,
    initialValue: initialRatingsData,
  });

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
      arrayify(categories).filter((value) => value !== categoryValue)
    );
  };

  const items = (
    data?.items || []
  ).map(({ _id, name, rating: { overall: rating } }) => (
    <RatingsListItem
      href={`/ratings/${_id}`}
      key={_id}
      name={name}
      rating={rating}
      loading={loading}
    />
  ));

  return (
    <Flex direction={["column", "column", "row"]}>
      <Head title={Message.RATINGS} metaDescription={Message.META_RATINGS} />
      {/* left panel */}

      <Box
        display={["none", null, "block"]}
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

      <Box w="full" p={[4, 8, 0]} pl={[4, 8, 16]}>
        <Heading my={[2, 5]} size="lg">
          {Message.RATINGS}
        </Heading>
        <UrlParamSearchbar
          loading={loading}
          mb={5}
          placeholder={Message.MANUFACTURER_NAME}
        />
        <ScaleFade in={!isEmpty(categories) || isSmallScreen} unmountOnExit>
          <Box mb={5}>
            {Message.CATEGORIES}
            <Box
              layerStyle="outline"
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
              {arrayify<string>(categories).map((value) => (
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
        </ScaleFade>
        <Box bg={[null, null, contentBg]}>
          <RatingsListHeader
            {...{
              sortBy,
              sortOrder,
              setSortBy,
              setSortOrder,
            }}
          />
          {isEmpty(items) ? (
            <Box m={[0, 0, 4]} fontSize="lg">
              {Message.NO_ITEMS}
            </Box>
          ) : (
            items
          )}
          <Center>
            <Pagination
              mb="4"
              selectedPage={parseInteger(parseString(page)) || 1}
              onPageChange={(pageNumber) => setPage(pageNumber.toString())}
              totalPages={Math.ceil((data?.count || 0) / PAGE_SIZE)}
            />
          </Center>
        </Box>
      </Box>
    </Flex>
  );
}

export default Ratings;
