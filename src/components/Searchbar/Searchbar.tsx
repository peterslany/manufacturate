import { SearchIcon } from "@chakra-ui/icons";
import { chakra, Flex, Input, useBreakpointValue } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "..";
import { Path } from "../../constants";
import { useSmallScreen, useUrlParam } from "../../hooks";

interface SearchbarProps {
  onShowTextFieldCallback?: () => void;
  totalWidth?: (number | string)[];
  showFullSearchbar?: boolean;
  variant?: "dashed";
  className?: string;
  scrollOnSearch?: boolean;
}

function Searchbar({
  onShowTextFieldCallback,
  totalWidth,
  showFullSearchbar,
  variant,
  className,
  scrollOnSearch = true,
}: SearchbarProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  const [show, setShowSearchbar] = useState(false);

  const [query, setQuery] = useUrlParam("search", Path.RATINGS, scrollOnSearch);

  const [inputText, setInputText] = useState<string | undefined>(
    typeof query === "string" ? query : undefined
  );
  useEffect(() => {
    setInputText(typeof query === "string" ? query : undefined);
  }, [query]);

  const searchbarRef = useRef<HTMLInputElement>(null);

  const isSmallScreen = useSmallScreen();

  const showInput = showFullSearchbar || !isSmallScreen || show;

  const inputWidth = useBreakpointValue({
    base: "140px",
    sm: "170px",
    md: "200px",
  });

  const buttonDashed = variant === "dashed" && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderStyle: "dashed",
    borderWidth: 2,
  };

  const handleSearchIconClick = () => {
    setShowSearchbar((prev) => !prev);
    if (showInput) setQuery(isEmpty(inputText) ? undefined : inputText);

    // sets focus
    if (searchbarRef.current && !showInput) {
      searchbarRef.current.focus();
    }
    if (onShowTextFieldCallback) {
      onShowTextFieldCallback();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchIconClick();
      }}
      name="Vyhľadávanie"
    >
      <Flex
        borderWidth={1}
        layerStyle={`${showInput ? "outline" : ""}${
          isFocused ? "Focused" : ""
        }`}
        transition="border 500ms ease-in-out"
        className={className}
        borderRadius="16px"
        w="fit-content"
      >
        <Input
          w={showInput ? totalWidth || inputWidth : 0}
          pl={showInput ? "12px" : 0}
          pr={showInput ? "4px" : 0}
          border="none"
          _focus={{}}
          ref={searchbarRef}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          role="textbox"
          placeholder="Nazov výrobcu"
          value={inputText || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputText(event.target.value)
          }
        />
        <Button
          type="submit"
          layerStyle="outline"
          borderRadius="16px"
          p={0}
          onClick={handleSearchIconClick}
          {...buttonDashed}
          {...(showInput
            ? { borderTop: "none", borderBottom: "none", borderRight: "none" }
            : {})}
          {...(showFullSearchbar && { borderWidth: 2 })}
        >
          <SearchIcon />
        </Button>
      </Flex>
    </form>
  );
}

export default chakra(Searchbar);
