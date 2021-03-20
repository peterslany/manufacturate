/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { RequestMethod } from "../../constants";
import { URLParamValue } from "../../types";
import useRequest, { UseRequestOptions, UseRequestResult } from "./useRequest";

interface UseGetOptions<T> extends UseRequestOptions<T> {
  // use when need to specify which URL params should fetch depend on
  refreshDependencies: URLParamValue[];
}

const useGet = <T>(
  url: string | undefined,
  options?: UseGetOptions<T>
): UseRequestResult<T> => {
  // automatically adds current query string to request URL
  const { asPath } = useRouter();

  const queryString = asPath.match(/\?.*/)?.[0] || "";

  const fullUrl = useMemo(() => `${url}${queryString}`, [
    ...(options?.refreshDependencies || [queryString]),
    url,
  ]);

  const { data, loading, error, send } = useRequest(
    fullUrl,
    RequestMethod.GET,
    options
  );

  useEffect(() => {
    if (url) send();
  }, [send, url]);

  return { data, loading, error, send };
};

export default useGet;
