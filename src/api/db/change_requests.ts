import { ObjectId } from "mongodb";
import { GeneralChangeRequest } from "../../types/ratings";
import database from "./db";

export const deleteChangeRequest = async (id: string): Promise<void> => {
  const { db } = await database();

  await db.collection("change_requests").deleteOne({ _id: new ObjectId(id) });
};

export const updateChangeRequest = async (
  id: string,
  newChangeRequest: GeneralChangeRequest
): Promise<void> => {
  const { db } = await database();

  await db
    .collection("change_requests")
    .replaceOne({ _id: new ObjectId(id) }, newChangeRequest);
};

export const getChangeRequest = async (
  id: string
): Promise<GeneralChangeRequest | null> => {
  const { db } = await database();

  return db.collection("change_requests").findOne({ _id: new ObjectId(id) });
};

export const getChangeRequests = async (
  username: string,
  getAll: boolean,
  type?: "blogpost" | "rating"
): Promise<GeneralChangeRequest[]> => {
  const { db } = await database();

  const query = { ...(getAll && { author: username }), ...(type && { type }) };

  return db.collection("change_requests").find(query).limit(0).toArray();
};

export const createChangeRequest = async (
  newChangeRequest: GeneralChangeRequest
): Promise<void> => {
  const { db } = await database();

  await db.collection("change_requests").insertOne(newChangeRequest);
};
