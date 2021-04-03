/* eslint-disable import/prefer-default-export */
import { ApiUrl, SortOrder } from "../../constants";

export const getUrlEndpoint = (
  itemsEndpoint: ApiUrl,
  searchQuery?: string,
  selectedPage?: number,
  dateSort?: boolean,
  sortOrder?: SortOrder,
  all?: boolean
): string =>
  `${itemsEndpoint}?${
    searchQuery ? `search=${searchQuery}&` : ""
  }page=${selectedPage}&${
    dateSort ? `sortBy=date&sortOrder=${sortOrder}&` : ""
  }${all ? "all=true" : ""}`;
