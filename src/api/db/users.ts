import { User } from "../../types";
import database from "./db";

export const getUser = async (
  username: string
): Promise<(User & { _id: string; passwordHash: string }) | null> => {
  const { db } = await database();
  return db.collection("users").findOne({ _id: username }) || null;
};
