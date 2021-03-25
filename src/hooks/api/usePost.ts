import { RequestMethod } from "../../constants";
import useRequest, { UseRequestOptions, UseRequestResult } from "./useRequest";

const usePost = <T>(
  url: string,
  options?: UseRequestOptions<T>
): UseRequestResult<T> => useRequest(url, RequestMethod.POST, options);

export default usePost;
