import { ObjectId } from "mongodb";
import fetch from "node-fetch";
import { ContentType, Locale, PAGE_SIZE, SortOrder } from "../../constants";
import {
  Blogpost,
  ChangeRequestsListData,
  GeneralChangeRequest,
  RatingFull,
} from "../../types";
import { parseInteger } from "../../utils";
import { Collection } from "../constants";
import database from "./db";

const fireGet = (type: ContentType, id: string) => {
  if (type === ContentType.BLOGPOST) {
    const [locale, slug] = id.split("~");
    fetch([process.env.NEXTAUTH_URL, locale, "blog", slug].join("/"));
  } else {
    Object.values(Locale).forEach((locale: Locale) =>
      fetch([process.env.NEXTAUTH_URL, locale, "ratings", id].join("/"))
    );
  }
};

export const deleteChangeRequest = async (id: string): Promise<void> => {
  const { db } = await database();

  await db
    .collection(Collection.CHANGE_REQUESTS)
    .deleteOne({ _id: new ObjectId(id) });
};

export const updateChangeRequest = async (
  id: string,
  newChangeRequest: GeneralChangeRequest
): Promise<void> => {
  const { db } = await database();

  await db
    .collection(Collection.CHANGE_REQUESTS)
    .replaceOne(
      { _id: new ObjectId(id) },
      { ...newChangeRequest, _id: new ObjectId(newChangeRequest._id) }
    );
};

export const getChangeRequest = async (
  id: string
): Promise<GeneralChangeRequest | null> => {
  const { db } = await database();

  return db
    .collection(Collection.CHANGE_REQUESTS)
    .findOne({ _id: new ObjectId(id) });
};

export const getChangeRequests = async (
  username: string,
  getAll: boolean,
  type?: ContentType,
  search?: string,
  pageNumber?: number,
  sortOrder?: SortOrder
): Promise<ChangeRequestsListData> => {
  const { db } = await database();

  const query = {
    ...(!getAll && { author: username }),
    ...(type && { type }),
    ...(search && {
      $or: [
        { "content.name": { $regex: `(?i)(?:$|^| )${search}` } },
        { "content._id": { $regex: `(?i)(?:$|^| )${search}` } },
        { _id: { $regex: `(?i)(?:$|^| )${search}` } },
      ],
    }),
  };

  const projections = [
    "content._id",
    "content.name",
    "type",
    "date",
    "author",
  ].reduce((result, field) => ({ ...result, [field]: 1 }), {});

  const sort = { date: parseInteger(sortOrder || SortOrder.DESCENDING) };

  const items = await db
    .collection(Collection.CHANGE_REQUESTS)
    .find(query)
    .project(projections)
    .sort(sort)
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  const count = await db
    .collection(Collection.CHANGE_REQUESTS)
    .find(query)
    .count();

  return { items, count };
};

export const createChangeRequest = async (
  newChangeRequest: GeneralChangeRequest
): Promise<void> => {
  const { db } = await database();

  await db.collection(Collection.CHANGE_REQUESTS).insertOne(newChangeRequest);
};

// Approves change requests: puts new content into its public collection
// and deletes corresponding change request from change_requests collection
export const approveChangeRequest = async <T extends Blogpost | RatingFull>(
  changeRequestId: string,
  id: string,
  type: T extends Blogpost ? ContentType.BLOGPOST : ContentType.RATING
): Promise<void> => {
  const collectionName =
    type === ContentType.BLOGPOST ? Collection.BLOGPOSTS : Collection.RATINGS;

  const { db, client } = await database();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const changeRequest = await db
        .collection(Collection.CHANGE_REQUESTS)
        .findOne({ _id: new ObjectId(changeRequestId) });

      const { content } = changeRequest;

      await db.collection(collectionName).replaceOne({ _id: id }, content, {
        upsert: true,
        session,
      });

      await db
        .collection(Collection.CHANGE_REQUESTS)
        .deleteOne({ _id: new ObjectId(changeRequestId) }, { session });
    });

    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  setTimeout(() => fireGet(type, id), 500);
};

export const reverseToChangeRequest = async <T extends Blogpost | RatingFull>(
  id: string,
  type: T extends Blogpost ? ContentType.BLOGPOST : ContentType.RATING,
  username: string
): Promise<void> => {
  const collectionName =
    type === ContentType.BLOGPOST ? Collection.BLOGPOSTS : Collection.RATINGS;

  const { db, client } = await database();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const currentObject = await db
        .collection(collectionName)
        .findOne({ _id: id });

      if (!currentObject) {
        throw new Error(`${type} with _id ${id} not found.`);
      }

      const newChangeRequest = {
        author: username,
        date: new Date().toISOString(),
        content: currentObject,
        note: `Content of type ${type} reversed from public side to change request by ${username}.`,
        type,
      };

      await db
        .collection(Collection.CHANGE_REQUESTS)
        .insertOne(newChangeRequest, { session });
      await db.collection(collectionName).deleteOne({ _id: id }, { session });
    });

    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  // regeneration with updated data
  // TODO LATER: when on-demand regeneration through API is available in Next.js, use that
  setTimeout(() => fireGet(type, id), 500);
};
