import { useCallback, useState } from "react";
import { useAlert, useLocale } from "..";
import { RequestMethod } from "../../constants";
import { CommonObject } from "../../types";
import { ResponseError } from "../../types/api";
import { makeRequest } from "../../utils";

// TODO: move outside this file
export interface UseRequestOptions<T> {
  disableCache?: boolean;
  disableDefaultErrorMessage?: boolean;
  errorLabelMapper?: (err: ResponseError) => string;
  initialValue?: T;
  onSuccessCallback?: () => void;
  successMessage?: string;
}
export type UseRequestResult<T> = {
  data: T | undefined;
  error: ResponseError | undefined;
  loading: boolean;
  send: (body?: CommonObject) => void;
};

const useRequest = <T>(
  url: string,
  method: RequestMethod,
  options?: UseRequestOptions<T>
): UseRequestResult<T> => {
  const [data, setData] = useState<T | undefined>(options?.initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResponseError>();

  const errorAlert = useAlert("error");

  const successAlert = useAlert("success");

  const { locale, Message } = useLocale();

  const onError = useCallback(
    (err: ResponseError) => {
      setError(err);
      if (!options?.disableDefaultErrorMessage) {
        const message =
          err.status === 0
            ? (Message.ERROR_DEFAULT_MESSAGE as string)
            : `${err.status}: ${err.message}`;
        errorAlert(message);
      }
    },
    [
      Message.ERROR_DEFAULT_MESSAGE,
      errorAlert,
      options?.disableDefaultErrorMessage,
    ]
  );

  const onSuccess = useCallback(() => {
    setError(undefined);
    if (options?.successMessage) {
      successAlert(options.successMessage);
    }
    if (options?.onSuccessCallback) {
      options.onSuccessCallback();
    }
  }, [options?.onSuccessCallback, options?.successMessage, successAlert]);

  const send = useCallback(
    async (body?: CommonObject) => {
      setLoading(true);
      const response = await makeRequest<T>(
        url,
        method,
        onError,
        locale,
        body,
        onSuccess,
        options?.disableCache
      );
      if (response) {
        setData(response);
      }
      setLoading(false);
    },
    [url, method, onError, locale, onSuccess, options?.disableCache]
  );

  return { data, loading, error, send };
};

export default useRequest;
