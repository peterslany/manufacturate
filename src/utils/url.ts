import { compact, isArray } from "lodash";
import { URLParamValue } from "../types/url";

export const urlParamToArray = (value: URLParamValue) =>
  isArray(value) ? value : compact([value]);
