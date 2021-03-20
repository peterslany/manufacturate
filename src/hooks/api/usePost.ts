export default 1;
// import { useCallback, useState } from "react";
// import { useAlert } from "..";
// import { CommonObject } from "../../types";
// import { ResponseError } from "../../types/api";
// import { UseRequestOptions, UseRequestResult } from "./useRequest";

// const usePost = <T>(
//   url: string,
//   options?: UseRequestOptions<T>
// ): UseRequestResult<T> => {
//   const [result, setResult] = useState<T | undefined>(options?.initialValue);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<ResponseError>();

//   const errorAlert = useAlert("error");

//   const post = useCallback(
//     async (body: CommonObject) => {
//       setLoading(true);
//       // const data = await makeRequest<T>(url, RequestMethod.POST, onError, body);
//       // if (data) setResult(data);
//       setLoading(false);
//     },
//     [onError, url]
//   );
//   return { data: result, loading, error, post };
// };

// export default usePost;
