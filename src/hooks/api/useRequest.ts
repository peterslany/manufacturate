import { useCallback, useState } from "react";
import { useAlert, useLocale } from "..";
import { RequestMethod } from "../../constants";
import { CommonObject } from "../../types";
import { ResponseError } from "../../types/api";
import { makeRequest } from "../../utils";

// TODO: move outside this file
export interface UseRequestOptions<T> {
  errorLabelMapper?: (err: ResponseError) => string;
  initialValue?: T;
  successMessage?: string;
}
export type UseRequestResult<T> = {
  data: T | undefined;
  error?: ResponseError;
  loading: boolean;
  send: (body?: CommonObject) => void;
};

const useRequest = <T>(
  url: string,
  method: RequestMethod,
  options?: UseRequestOptions<T>
): UseRequestResult<T> => {
  const [result, setResult] = useState<T | undefined>(options?.initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResponseError>();

  const errorAlert = useAlert("error");
  // todo complete success message
  // const successAlert = useAlert("success");

  const { locale, Message } = useLocale();

  const handleError = useCallback(
    (err: ResponseError) => {
      setError(err);
      const message =
        err.status === 0
          ? (Message.ERROR_DEFAULT_MESSAGE as string)
          : `${err.status}: ${err.message}`;
      errorAlert(message);
    },
    [Message.ERROR_DEFAULT_MESSAGE, errorAlert]
  );

  // const onSuccess = () => null; // TODO

  const send = useCallback(
    async (body?: CommonObject) => {
      setLoading(true);
      const data = await makeRequest<T>(url, method, handleError, locale, body);
      if (data) setResult(data);
      setLoading(false);
    },
    [url, method, handleError, locale]
  );

  return { data: result, loading, error, send };
};

export default useRequest;
