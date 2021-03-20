import { Locale, RequestMethod } from "../constants";
import { CommonObject } from "../types";
import { ResponseError } from "../types/api";

export const makeRequest = async <T extends unknown>(
  url: string,
  method: RequestMethod,
  onErrorCallback: (e: ResponseError) => void,
  locale: Locale,
  body?: CommonObject,
  onSuccessCallback?: () => void
): Promise<T | null> => {
  try {
    const response = await fetch(`/api/${url}`, {
      method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Accept-Language": locale,
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

    return response.json();
  } catch (error) {
    // TODO maybe replace with some generic error message 'something went wrong..'
    onErrorCallback({ status: 0, message: error.message });
    return null;
  }
};

// export const post = (
//   url: string,
//   body: CommonObject,
//   onErrorCallback: (err: ResponseError) => void
// ) => {};
