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
import React, { useState } from "react";
import { ApiUrl } from "../../constants";
import { useGet, useLocale } from "../../hooks";
import { BlogpostsListData, RatingsListData } from "../../types";
import Button from "../Button";
import Searchbar from "./Searchbar";

function HeaderSearch({}: Props): ReactElement {
  const { Message } = useLocale();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const glass = useColorModeValue("glassLight", "glassDark");

  const overlayBg = useColorModeValue("gray.50A99", "gray.900A99");

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

  const items = [ratings, blogposts].map((data, index) => (
    <Box m="4" key={index}>
      {data?.items.map((item) => (
        <Box layerStyle="dashed">{item.name}</Box>
      ))}
    </Box>
  ));
  // TODO: add debounce to search, create components for blogposts and ratings
  return (
    <>
      <Button layerStyle="outline16" p={0} onClick={onOpen}>
        <SearchIcon />
      </Button>
      <Modal
        // headerContent={Message.SEARCH}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay bg={overlayBg}>
          <ModalCloseButton />
        </ModalOverlay>

        <ModalContent layerStyle={glass} w="fit-content" borderRadius="16px">
          <Searchbar
            searchImmediately
            placeholder={Message.SEARCH}
            onSearch={setSearchQuery}
          />
          {noItems ? <Box m="4">{Message.NO_ITEMS}</Box> : items}
        </ModalContent>
      </Modal>
    </>
  );
}

export default HeaderSearch;
