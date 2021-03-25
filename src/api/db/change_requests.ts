import { ObjectId } from "mongodb";
import {
  Blogpost,
  ChangeRequestApproveObject,
  GeneralChangeRequest,
  RatingFull,
} from "../../types";
import { Collection } from "../constants";
import database from "./db";

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
    .replaceOne({ _id: new ObjectId(id) }, newChangeRequest);
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
  type?: "blogpost" | "rating"
): Promise<GeneralChangeRequest[]> => {
  const { db } = await database();

  const query = { ...(getAll && { author: username }), ...(type && { type }) };

  return db
    .collection(Collection.CHANGE_REQUESTS)
    .find(query)
    .limit(0)
    .toArray();
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
  { newValue, changeRequestId }: ChangeRequestApproveObject<T>,
  id: T extends Blogpost ? ObjectId : string,
  type: T extends Blogpost ? "blogpost" : "rating"
): Promise<void> => {
  const collectionName =
    type === "blogpost" ? Collection.BLOGPOSTS : Collection.RATINGS;

  const { db, client } = await database();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      await db.collection(collectionName).replaceOne({ _id: id }, newValue, {
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
};

export const reverseToChangeRequest = async <T extends Blogpost | RatingFull>(
  id: T extends Blogpost ? ObjectId : string,
  type: T extends Blogpost ? "blogpost" : "rating",
  username: string
): Promise<void> => {
  const collectionName =
    type === "blogpost" ? Collection.BLOGPOSTS : Collection.RATINGS;

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
        newValue: currentObject,
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
};
