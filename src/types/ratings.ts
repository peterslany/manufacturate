// interface RatingUnit {}

import { ProductCategory, RatingCategory } from "../constants";
import { SimpleLocaleMessage } from "./locale";

interface BasicRatingUnit {
  animals: number;
  ecology: number;
  ethics: number;
  health: number;
  total: number;
}

export interface RatingUnit<T> extends BasicRatingUnit {
  description: T;
}

export type SubCategoriesRating<T> = {
  [key in ProductCategory]: RatingUnit<T>;
};

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
  date: string;
  name: string;
  rating: {
    overall: RatingUnit<T>;
    subCategories: SubCategoriesRating<T>;
  };
  subCategories: ProductCategory[];
}

export type RatingLocalized = Rating<string>;

export type RatingFull = Rating<SimpleLocaleMessage>;

export type RatingsListData = { count: number; ratings: BasicRating[] };

export type RatingsSortableFields = "manufacturer_name" | RatingCategory;
