import { Locale, RequestMethod } from "../constants";
import { CommonObject } from "../types";
import { ResponseError } from "../types/api";

export const makeRequest = async <T extends unknown>(
  url: string,
  method: RequestMethod,
  onErrorCallback: (e: ResponseError) => void,
  locale: Locale,
  body?: CommonObject,
  onSuccessCallback?: () => void,
  disableCache?: boolean
): Promise<T | null> => {
  try {
    const response = await fetch(`/api/${url}`, {
      method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Accept-Language": locale,
        ...(disableCache && { "Cache-Control": "no-store" }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      onErrorCallback({
        status: response.status,
        message: (await response.json()).message,
      });
      return null;
    }
    if (onSuccessCallback) onSuccessCallback();

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    onErrorCallback({ status: 0, message: error.message });
    return null;
  }
};
