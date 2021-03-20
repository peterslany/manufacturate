import { isString } from "lodash";
import { PAGE_SIZE, RatingsSortFields, SortOrder } from "../../constants";
import { parseInteger } from "../../utils/common";
import { ratingsSortableFields } from "../constants/db";
import { getRatingsFieldPath } from "../utils/db";
import database from "./db";

export const a = 1;

export const getRatingsList = async (
  name?: string,
  sortBy?: RatingsSortFields,
  sortOrder?: SortOrder,
  productCategories?: string | string[],
  pageNumber?: number
) => {
  const categories: string[] | undefined =
    productCategories && isString(productCategories)
      ? [productCategories]
      : (productCategories as string[]);

  const filter = {
    ...(name && { name: { $regex: `(?i)(?:$|^| )${name}` } }),
    ...(categories && {
      $or: categories.map((category) => ({
        "rating.subCategories": { $elemMatch: { categoryName: category } },
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
    .collection("ratings")
    .find(filter)
    .project(projections)
    .sort(sort)
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  const count = await db.collection("ratings").find(filter).count();

  return { ratings, count };
};

// TODO add return type: RatingDetail
export const getRatingDetail = async (name?: string) => {
  const { db } = await database();

  return db.collection("ratings").findOne({ _id: name }) || null;
};
