// interface RatingUnit {}

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
  lastChange: string;
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
