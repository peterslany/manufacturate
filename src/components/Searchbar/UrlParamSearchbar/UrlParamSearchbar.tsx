import { chakra } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { ReactElement } from "react";
import { Path } from "../../../constants";
import { useUrlParam } from "../../../hooks";
import { parseString } from "../../../utils";
import Searchbar, { SearchbarProps } from "../Searchbar";

interface Props extends Omit<SearchbarProps, "onSearch" | "value"> {
  disableEmptyQuery?: boolean;
  redirectPath?: Path;
}
// Searchbar component which sets URL query string "search"
function UrlParamSearchbar({
  disableEmptyQuery,
  redirectPath,
  ...props
}: Props): ReactElement {
  const [search, setSearch] = useUrlParam("search", redirectPath);

  const handleSearch = (query: string | undefined) => {
    if (!isEmpty(query) || !disableEmptyQuery) {
      setSearch(query);
    }
  };

  return (
    <Searchbar
      {...{ ...props, value: parseString(search), onSearch: handleSearch }}
    />
  );
}

export default chakra(UrlParamSearchbar);
