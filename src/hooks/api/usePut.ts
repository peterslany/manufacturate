import { RequestMethod } from "../../constants";
import useRequest, { UseRequestOptions, UseRequestResult } from "./useRequest";

// TODO : test
const usePut = <T>(
  url: string,
  options?: UseRequestOptions<T>
): UseRequestResult<T> => useRequest(url, RequestMethod.PUT, options);

export default usePut;
