/* eslint-disable no-underscore-dangle */
import { PAGE_SIZE } from "../../constants";
import { UserDB, UsersListData } from "../../types";
import { Collection } from "../constants";
import database from "./db";

export const getUser = async (username: string): Promise<UserDB | null> => {
  const { db } = await database();
  return db.collection(Collection.USERS).findOne({ _id: username });
};

// TODO: test creating user with already used username
export const createUser = async (
  username: string,
  passwordHash: string
): Promise<void> => {
  const { db } = await database();
  if (await db.collection(Collection.USERS).findOne({ _id: username })) {
    throw new Error(`Username ${username} is already used!`);
  }

  await db.collection(Collection.USERS).insertOne({
    _id: username,
    passwordHash,
    isAdmin: false,
  });
};

export const getUsersList = async (
  searchUsername?: string,
  pageNumber?: number
): Promise<UsersListData> => {
  const { db } = await database();

  const query = {
    ...(searchUsername && {
      _id: { $regex: `(?i)(?:$|^| )${searchUsername}` },
    }),
  };

  const count = await db.collection(Collection.USERS).find(query).count();
  const users = await db
    .collection(Collection.USERS)
    .find(query)
    .project({ passwordHash: 0 })
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  return { count, items: users };
};

export const modifyUser = async (newUserData: {
  _id: string;
}): Promise<void> => {
  const { db } = await database();

  const { _id: userId } = newUserData;

  const currentUserData: UserDB = await db
    .collection(Collection.USERS)
    .findOne({ _id: userId });

  if (!currentUserData) {
    throw new Error(`User ${userId} not found in DB!`);
  }

  const dataToInsert: UserDB = {
    ...currentUserData,
    ...newUserData,
  };

  await db
    .collection(Collection.USERS)
    .replaceOne({ _id: userId }, dataToInsert);
};
