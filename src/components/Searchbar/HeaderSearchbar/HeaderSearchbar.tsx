import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { ReactElement, useCallback, useState } from "react";
import { ApiUrl, Path } from "../../../constants";
import { useGet, useLocale } from "../../../hooks";
import {
  BasicRating,
  BlogpostBase,
  BlogpostsListData,
  RatingsListData,
} from "../../../types";
import Button from "../../Button";
import Searchbar from "../Searchbar";
import SearchResult from "./SearchResult";

function HeaderSearch(): ReactElement {
  const { Message } = useLocale();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const glass = useColorModeValue("glassLight", "glassDark");
  const overlayShadowColor = useColorModeValue("#000000", "#ffffff");

  const [searchQuery, setSearchQuery] = useState<string>();

  const { data: ratings, loading: loadingRatings } = useGet<RatingsListData>(
    searchQuery && `${ApiUrl.RATINGS}?search=${searchQuery}`
  );

  const {
    data: blogposts,
    loading: loadingBlogposts,
  } = useGet<BlogpostsListData>(
    searchQuery && `${ApiUrl.BLOGPOSTS}?search=${searchQuery}`
  );

  const noItems = blogposts?.count === 0 && ratings?.count === 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchQueryChange = useCallback(
    debounce(setSearchQuery, 350),
    []
  );

  const items = (
    <Box maxH="70vh" overflowY="auto">
      {(ratings?.count || 0) > 0 && (
        <SearchResult<BasicRating>
          name={Message.RATINGS}
          items={ratings?.items || []}
          getHref={(item: BasicRating) => `${Path.RATINGS}/${item._id}`}
          loading={loadingRatings}
          onClick={onClose}
        />
      )}
      {(blogposts?.count || 0) > 0 && (
        <SearchResult<BlogpostBase>
          name={Message.BLOG}
          items={blogposts?.items || []}
          getHref={(item: BlogpostBase) =>
            `${Path.BLOG}/${item.urlPathSegment}`
          }
          loading={loadingBlogposts}
          onClick={onClose}
        />
      )}
    </Box>
  );

  return (
    <>
      <Button
        aria-label={Message.SEARCH}
        layerStyle="outline16"
        p={0}
        onClick={onOpen}
      >
        <SearchIcon aria-label={Message.SEARCH} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay layerStyle={glass}>
          <ModalCloseButton />
        </ModalOverlay>

        <ModalContent
          boxShadow={`0 0 50px -20px ${overlayShadowColor}`}
          layerStyle={glass}
          w="min-content"
          borderRadius="16px"
        >
          <Searchbar
            searchImmediately
            placeholder={Message.SEARCH}
            onSearch={handleSearchQueryChange}
            loading={loadingRatings || loadingBlogposts}
          />

          {noItems ? <Box m="4">{Message.NO_ITEMS}</Box> : items}
        </ModalContent>
      </Modal>
    </>
  );
}

export default HeaderSearch;
