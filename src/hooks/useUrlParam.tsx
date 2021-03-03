import { useRouter } from "next/router";
import { Path } from "../constants";

type paramType = string | string[] | undefined;

const useUrlParam = (
  paramName: string,
  redirectPath?: Path
): [paramType, (newValue: paramType) => void] => {
  const {
    query: { [paramName]: parameter, ...otherParams },
    push,
    pathname,
  } = useRouter();

  const setValue = (newValue: paramType) =>
    push({
      pathname: redirectPath || pathname,
      query: {
        ...otherParams,
        ...(newValue && { [paramName]: newValue }),
      },
    });

  return [parameter, setValue];
};

export default useUrlParam;
