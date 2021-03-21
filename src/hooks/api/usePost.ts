import { RequestMethod } from "../../constants";
import useRequest, { UseRequestOptions, UseRequestResult } from "./useRequest";

// TODO : test
const usePost = <T>(
  url: string,
  options?: UseRequestOptions<T>
): UseRequestResult<T> => useRequest(url, RequestMethod.POST, options);

export default usePost;
