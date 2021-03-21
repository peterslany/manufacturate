// interface RatingUnit {}

import { ObjectId } from "mongodb";
import { Locale } from "../constants";
import { SimpleLocaleMessage } from "./locale";

interface BasicRatingUnit {
  animals: number;
  ecology: number;
  ethics: number;
  health: number;
  total: number;
}

interface RatingUnit<T> extends BasicRatingUnit {
  description: T;
  lastChange: string | Date;
}

export interface SubCategoryRatingUnit<T> extends RatingUnit<T> {
  categoryName: string;
}

export interface BasicRating {
  _id: string;
  name: string;
  rating: {
    overall: BasicRatingUnit;
  };
}

interface Rating<T> {
  _id: string;
  authors: string[];
  name: string;
  rating: {
    overall: RatingUnit<T>;
    subCategories: SubCategoryRatingUnit<T>[];
  };
}

export type RatingLocalized = Rating<string>;

export type RatingFull = Rating<SimpleLocaleMessage>;

export type RatingsListData = { count: number; ratings: BasicRating[] };

// TODO: refactor - move to its own file or smthing
// edition.cnn.com/2021/03/21/media/donald-trump-social-media-network/index.html

export type BlogpostsData = { count: number; ratings: BlogpostBase[] };

export interface BlogpostBase {
  _id: ObjectId;
  author: string;
  date: string | Date;
  locale: Locale;
  subTitle: string;
  thumbnailUrl: string;
  title: string;
  urlPathSegment: string;
}
export interface Blogpost extends BlogpostBase {
  content: string;
}

export interface ChangeRequest<C, T> {
  _id: ObjectId;
  author: string;
  date: string | Date;
  newValue: C;
  note?: string;
  type: T;
}

export type RatingChangeRequest = ChangeRequest<RatingFull, "rating">;

export type BlogpostChangeRequest = ChangeRequest<Blogpost, "blogpost">;

export type GeneralChangeRequest = ChangeRequest<
  RatingFull | Blogpost,
  "rating" | "blogpost"
>;

interface ChangeRequestApproveObject<T> {
  changeRequestId: ObjectId;
  newValue: T;
}

export type ChangeRequestApproveRating = ChangeRequestApproveObject<RatingFull>;
export type ChangeRequestApproveBlogpost = ChangeRequestApproveObject<Blogpost>;
