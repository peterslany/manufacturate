import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Button from "../Button/Button";

interface HeaderSearchbarProps {
  showSearchbar: boolean;
  setShowSearchbar: Dispatch<SetStateAction<boolean>>;
}

function HeaderSearchbar({
  showSearchbar,
  setShowSearchbar,
}: HeaderSearchbarProps): ReactElement {
  const searchbarRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearchbar((prev) => !prev);
    if (searchbarRef.current && !showSearchbar) {
      searchbarRef.current.focus();
    }
  };

  return (
    <Flex
      layerStyle={`${showSearchbar ? "outline" : ""}${
        isFocused ? "Focused" : ""
      }`}
      borderRadius={16}
      transition="border-radius 500ms ease-in-out"
    >
      <Input
        w={showSearchbar ? "120px" : 0}
        pl={showSearchbar ? "12px" : 0}
        pr={showSearchbar ? "4px" : 0}
        border="none"
        _focus={{}}
        ref={searchbarRef}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
      <Button
        layerStyle="outline"
        p={0}
        borderRadius={16}
        onClick={handleSearchIconClick}
        {...(showSearchbar
          ? { borderTop: "none", borderBottom: "none", borderRight: "none" }
          : {})}
      >
        <SearchIcon />
      </Button>
    </Flex>
  );
}

export default HeaderSearchbar;
