/* eslint-disable import/prefer-default-export */
import { User } from "../types";
import database from "./db";

export const getUser = async (
  username: string
): Promise<User & { passwordHash: string; _id: string }> => {
  const { db } = await database();
  return db.collection("users").findOne({ _id: username });
};
