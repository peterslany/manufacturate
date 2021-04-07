import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Fade,
  Flex,
  IconButton,
  Input,
  Progress,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "..";
import { useColorVariations, useLocale } from "../../hooks";

export interface SearchbarProps {
  className?: string;
  loading?: boolean;
  onSearch: (query: string | undefined) => void;
  placeholder?: string;
  searchImmediately?: true;
  value?: string;
  variant?: "dashed";
}

function Searchbar({
  variant,
  className,
  placeholder,
  value,
  onSearch,
  searchImmediately,
  loading,
}: SearchbarProps): ReactElement {
  const { Message } = useLocale();

  const [red] = useColorVariations(["red"]);

  const [isFocused, setIsFocused] = useState(false);

  const [inputText, setInputText] = useState<string | undefined>(value);

  useEffect(() => {
    setInputText(value);
  }, [value]);

  const searchbarRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    if (searchImmediately) {
      onSearch(event.target.value);
    }
  };

  const handleSearchIconClick = () => {
    if (isEmpty(inputText) && searchbarRef.current) {
      // sets focus if the query is empty
      searchbarRef.current.focus();
    }
    onSearch(inputText);
  };

  const handleClearInput = () => {
    onSearch(undefined);
    setInputText(undefined);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchIconClick();
      }}
    >
      <Flex
        layerStyle={`outline16${isFocused ? "Focused" : ""}`}
        className={className}
        borderStyle={variant || "solid"}
        borderWidth="2px"
        align="center"
        w="fit-content"
        direction={searchImmediately ? "row-reverse" : "row"}
        position="relative"
      >
        <Input
          w={["240px", "420px"]}
          pl={searchImmediately ? 0 : "12px"}
          pr="4px"
          bg="none"
          border="none"
          _focus={{}}
          ref={searchbarRef}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          role="textbox"
          placeholder={placeholder}
          _placeholder={{ color: "inherit", opacity: 0.6 }}
          value={inputText || ""}
          onChange={handleInputChange}
        />
        <Box {...(searchImmediately && { order: -1, mx: 2 })}>
          <Fade in={!isEmpty(inputText)} unmountOnExit>
            <IconButton
              color={red.fg}
              _hover={{ bg: "transparent", color: red.bg }}
              size="xs"
              bg="transparent"
              aria-label={Message.CLEAR_QUERY}
              onClick={handleClearInput}
            >
              <CloseIcon fontSize="xs" />
            </IconButton>
          </Fade>
        </Box>
        {searchImmediately ? (
          <SearchIcon w="40px" />
        ) : (
          <Button
            type="submit"
            borderRadius="16px"
            borderLeftRadius="0"
            onClick={handleSearchIconClick}
            w="40px"
            isDisabled={loading}
            {...(variant === "dashed" && {
              borderLeft: "2px dashed",
              background: "transparent",
            })}
          >
            <SearchIcon />
          </Button>
        )}
        <Progress
          position="absolute"
          bottom="0"
          borderBottomRadius="16px"
          left="4px"
          display={loading ? "block" : "none"}
          h="4px"
          w="calc(100% - 8px)"
          bg="transparent"
          colorScheme="gray"
          isIndeterminate
        />
      </Flex>
    </form>
  );
}

export default chakra(Searchbar);
