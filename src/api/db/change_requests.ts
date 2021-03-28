import { ObjectId } from "mongodb";
import { ChangeRequestType } from "../../constants";
import { Blogpost, GeneralChangeRequest, RatingFull } from "../../types";
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
  type?: ChangeRequestType
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
  console.log(newChangeRequest);
  await db.collection(Collection.CHANGE_REQUESTS).insertOne(newChangeRequest);
};

// Approves change requests: puts new content into its public collection
// and deletes corresponding change request from change_requests collection
export const approveChangeRequest = async <T extends Blogpost | RatingFull>(
  changeRequestId: string,
  id: T extends Blogpost ? ObjectId : string,
  type: T extends Blogpost
    ? ChangeRequestType.BLOGPOST
    : ChangeRequestType.RATING
): Promise<void> => {
  const collectionName =
    type === ChangeRequestType.BLOGPOST
      ? Collection.BLOGPOSTS
      : Collection.RATINGS;

  const { db, client } = await database();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const { content } = await db
        .collection(Collection.CHANGE_REQUESTS)
        .findOne({ _id: new ObjectId(changeRequestId) });

      if (type === ChangeRequestType.BLOGPOST) {
        content._id = new ObjectId(content._id);
      }

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
};

export const reverseToChangeRequest = async <T extends Blogpost | RatingFull>(
  id: T extends Blogpost ? ObjectId : string,
  type: T extends Blogpost
    ? ChangeRequestType.BLOGPOST
    : ChangeRequestType.RATING,
  username: string
): Promise<void> => {
  const collectionName =
    type === ChangeRequestType.BLOGPOST
      ? Collection.BLOGPOSTS
      : Collection.RATINGS;

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
};
