import { isString } from "lodash";
import { PAGE_SIZE, SortOrder } from "../../constants";
import {
  RatingFull,
  RatingsListData,
  RatingsSortableFields,
} from "../../types";
import { parseInteger } from "../../utils";
import { Collection, ratingsSortableFields } from "../constants";
import { getRatingsFieldPath } from "../utils";
import database from "./db";

export const getRatingsList = async (
  name?: string,
  sortBy?: RatingsSortableFields,
  sortOrder?: SortOrder,
  productCategories?: string | string[],
  pageNumber?: number
): Promise<RatingsListData> => {
  const categories: string[] | undefined =
    productCategories && isString(productCategories)
      ? [productCategories]
      : (productCategories as string[]);

  const query = {
    ...(name && { name: { $regex: `(?i)(?:$|^| )${name}` } }),
    ...(categories && {
      $or: categories.map((category) => ({
        subCategories: { $elemMatch: { $eq: category } },
      })),
    }),
  };

  const projections = ratingsSortableFields.reduce(
    (result, field) => ({
      ...result,
      [field]: 1,
    }),
    {}
  );

  const sort = sortBy
    ? {
        [getRatingsFieldPath(sortBy)]: parseInteger(
          sortOrder || SortOrder.DESCENDING
        ),
      }
    : {};

  const { db } = await database();

  const ratings = await db
    .collection(Collection.RATINGS)
    .find(query)
    .project(projections)
    .sort(sort)
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  const count = await db.collection(Collection.RATINGS).find(query).count();

  return { items: ratings, count };
};

export const getRatingDetail = async (
  name?: string
): Promise<RatingFull | null> => {
  const { db } = await database();

  return db.collection(Collection.RATINGS).findOne({ _id: name });
};

export const getAllRatingsIds = async (): Promise<{ _id: string }[]> => {
  const { db } = await database();

  return db
    .collection(Collection.RATINGS)
    .find()
    .project({ _id: 1 })
    .limit(0)
    .toArray();
};
