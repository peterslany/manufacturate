import { isString } from "lodash";
import { PAGE_SIZE, RatingsSortFields, SortOrder } from "../../constants";
import {
  ChangeRequestApproveRating,
  RatingFull,
  RatingsListData,
} from "../../types/ratings";
import { parseInteger } from "../../utils/common";
import { ratingsSortableFields } from "../constants/db";
import { getRatingsFieldPath } from "../utils/db";
import database from "./db";

export const getRatingsList = async (
  name?: string,
  sortBy?: RatingsSortFields,
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
    .find(query)
    .project(projections)
    .sort(sort)
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  const count = await db.collection("ratings").find(query).count();

  return { ratings, count };
};

export const getRatingDetail = async (
  name?: string
): Promise<RatingFull | null> => {
  const { db } = await database();

  return db.collection("ratings").findOne({ _id: name });
};

// Approves rating change requests: puts new rating into ratings collection
// and deletes corresponding change request from change_requests collection
export const approveRating = async (
  { newValue, changeRequestId }: ChangeRequestApproveRating,
  manufacturerName: string
): Promise<void> => {
  const { db, client } = await database();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      await db
        .collection("ratings")
        .replaceOne({ _id: manufacturerName }, newValue, {
          upsert: true,
          session,
        });

      await db
        .collection("change_requests")
        .deleteOne({ _id: changeRequestId }, { session });
    });

    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const hideRating = async (name: string): Promise<void> => {
  const { db, client } = await database();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const rating = await db.collection("ratings").findOne({ _id: name });
      if (!rating) {
        throw new Error(`Rating with name ${name} not found.`);
      }

      const newChangeRequest = {
        author: "system",
        date: new Date(),
        newValue: rating,
        note: "Rating hidden from public.",
        type: "rating",
      };

      await db
        .collection("change_requests")
        .insertOne(newChangeRequest, { session });
      await db.collection("ratings").deleteOne({ _id: name }, { session });
    });
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
