/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { uniq } from "lodash";
import {
  ApiUrl,
  ChangeRequestFormMode,
  ContentType,
  ProductCategory,
  RequestMethod,
} from "../../../constants";
import { RatingFull } from "../../../types";

export const contentTypeApiUrl = (contentType: ContentType): ApiUrl => {
  switch (contentType) {
    case ContentType.RATING:
      return ApiUrl.RATINGS;
    case ContentType.BLOGPOST:
      return ApiUrl.BLOGPOSTS;
  }
};

export const getDataUrl = (
  mode: ChangeRequestFormMode,
  contentType: ContentType,
  changeRequestId?: string,
  contentId?: string
): string | undefined => {
  switch (mode) {
    case ChangeRequestFormMode.CREATE_FROM_CONTENT:
      return `${contentTypeApiUrl(contentType)}/${contentId}`;
    case ChangeRequestFormMode.EDIT:
      return `${ApiUrl.CHANGE_REQUESTS}/${changeRequestId}`;
    case ChangeRequestFormMode.CREATE_NEW:
      return undefined;
  }
};

export const getSendUrlAndMethod = (
  mode: ChangeRequestFormMode,
  changeRequestId?: string
): [string, RequestMethod] => {
  let sendUrl: string = ApiUrl.CHANGE_REQUESTS;

  if (mode === ChangeRequestFormMode.EDIT && changeRequestId) {
    sendUrl = `${sendUrl}/${changeRequestId}`;
  }

  const sendMethod =
    mode === ChangeRequestFormMode.EDIT
      ? RequestMethod.PUT
      : RequestMethod.POST;

  return [sendUrl, sendMethod];
};

export const generateRatingMetadata = (
  currentContent: RatingFull,
  newContent: RatingFull,
  author?: string
): { authors: string[]; subCategories?: ProductCategory[] } => ({
  subCategories: newContent?.rating?.subCategories
    ? (Object.keys(newContent.rating.subCategories) as ProductCategory[])
    : undefined,
  authors: uniq([
    ...((currentContent as RatingFull)?.authors || []),
    ...(author ? [author] : []),
  ]),
});
