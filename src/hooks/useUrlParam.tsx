import { useRouter } from "next/router";
import { Path } from "../constants";
import { URLParamValue } from "../types";

const useUrlParam = (
  paramName: string,
  redirectPath?: Path,
  scroll = false
): [URLParamValue, (newValue: URLParamValue) => void] => {
  const {
    query: { [paramName]: parameter, ...otherParams },
    push,
    pathname,
  } = useRouter();

  const setValue = (newValue: URLParamValue) =>
    push(
      {
        pathname: redirectPath || pathname,
        query: {
          ...otherParams,
          ...(newValue && { [paramName]: newValue }),
        },
      },
      undefined,
      { scroll }
    );

  return [parameter, setValue];
};

export default useUrlParam;
