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
import {
  useGet,
  useLocale,
  usePut,
  useSmallScreen,
  useUrlParam,
} from "../../hooks";
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

  const { send } = usePut("ratings/iness-rocher");
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
      <button
        type="button"
        onClick={() =>
          send({
            changeRequestId: "6057ae56c6ad29407a75bf1b",
            newValue: {
              _id: "iness-rocher",
              name: "Yves Rocher",
              rating: {
                overall: {
                  lastChange: new Date(),
                  total: 7.4,
                  health: 6.3,
                  ecology: 8.8,
                  animals: 5.2,
                  ethics: 9.2,
                  description: {
                    sk:
                      "Yves rocher vyraba kozmetiku najma z prirodnych zloziek...",
                    en:
                      "Yves rocher uses mainly natural ingredients in its personal care products...",
                  },
                },
                subCategories: [
                  {
                    categoryName: "hair_cleansing",
                    lastChange: new Date(),
                    total: 8.8,
                    health: 9.3,
                    ecology: 7.5,
                    animals: 5.2,
                    ethics: 9.2,
                    description: {
                      sk: "- produkty maju nereaktivne zlozenie",
                      en:
                        "- products contain toxic compounds that can irritate skin and kill good bacteria",
                    },
                  },
                  {
                    categoryName: "beauty_eyes",
                    lastChange: new Date(),
                    total: 6.8,
                    health: 8.2,
                    ecology: 6.9,
                    animals: 5.2,
                    ethics: 9.2,
                    description: {
                      sk: "- produkty maju nereaktivne zlozenie",
                      en:
                        "- products contain toxic compounds that can irritate skin and kill good bacteria",
                    },
                  },
                  {
                    categoryName: "skin_nourishing",
                    lastChange: new Date(),
                    total: 6.2,
                    health: 5.4,
                    ecology: 7.3,
                    animals: 5.5,
                    ethics: 9.2,
                    description: {
                      sk:
                        "- niekotre latky nie su prirodneho povodu a mozu sposobit alergicku reakciu",
                      en:
                        "- some of the ingredients can cause allergic reaction and skin irritation",
                    },
                  },
                ],
              },
              authors: ["petos"],
            },
          })
        }
      >
        req
      </button>
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
