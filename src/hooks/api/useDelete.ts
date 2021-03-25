import { RequestMethod } from "../../constants";
import useRequest, { UseRequestOptions, UseRequestResult } from "./useRequest";

const useDelete = <T>(
  url: string,
  options?: UseRequestOptions<T>
): UseRequestResult<T> => useRequest(url, RequestMethod.DELETE, options);

export default useDelete;
