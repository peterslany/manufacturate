/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RequestMethod } from "../../constants";
import useRequest, { UseRequestOptions, UseRequestResult } from "./useRequest";

interface UseGetOptions<T> extends UseRequestOptions<T> {
  // if true, hook automatically includes full query string to requests
  // and refetches data on every query string change
  includeQueryString?: boolean;
}

// if URL is undefined, request is not sent,
// otherwise it is sent on every URL change and on every modification
// of query string if no refreshDependecies option is specified;
// data can be refreshed (refetched) by using send callback
const useGet = <T>(
  url: string | undefined,
  options?: UseGetOptions<T>
): UseRequestResult<T> => {
  // automatically adds current query string to request URL
  const { asPath } = useRouter();
  const queryString = asPath.match(/\?.*/)?.[0] || "";
  const fullUrl = options?.includeQueryString
    ? `${url}${queryString}`
    : url || "";

  const { data, loading, error, send } = useRequest(
    fullUrl,
    RequestMethod.GET,
    options
  );

  // initial fetching of data is disallowed when initialValue is provided
  const [disallowSend, setDisallowSend] = useState<boolean>(
    Boolean(options?.initialValue) &&
      (!options?.includeQueryString || isEmpty(queryString))
  );

  useEffect(() => {
    if (!disallowSend) {
      if (url) {
        send();
      }
    } else {
      setDisallowSend(false);
    }
  }, [send, url]);

  return { data, loading, error, send };
};

export default useGet;
