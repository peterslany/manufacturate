import { SearchIcon } from "@chakra-ui/icons";
import {
  BoxProps,
  chakra,
  Flex,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Path } from "../../constants";
import useSmallScreen from "../../hooks/useSmallScreen";
import useUrlParam from "../../hooks/useUrlParam";
import Button from "../Button/Button";

interface SearchbarProps extends BoxProps {
  onShowTextFieldCallback?: () => void;
  totalWidth?: (number | string)[];
  showFullSearchbar?: boolean;
  variant?: "dashed";
  className?: string;
}

function Searchbar({
  onShowTextFieldCallback,
  totalWidth,
  showFullSearchbar,
  variant,
  className,
}: SearchbarProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  const [show, setShowSearchbar] = useState(false);

  const [query, setQuery] = useUrlParam("search", Path.RATINGS);

  const [inputText, setInputText] = useState<string | undefined>(
    query as string
  );

  useEffect(() => {
    setInputText(query as string);
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
    setQuery(isEmpty(inputText) ? undefined : inputText);

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
        borderRadius={16}
        transition="border 500ms ease-in-out"
        className={className}
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
          p={0}
          borderRadius={16}
          onClick={handleSearchIconClick}
          {...buttonDashed}
          {...(showInput
            ? { borderTop: "none", borderBottom: "none", borderRight: "none" }
            : {})}
        >
          <SearchIcon />
        </Button>
      </Flex>
    </form>
  );
}

export default chakra(Searchbar);
