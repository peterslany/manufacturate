import { ObjectId } from "mongodb";
import { Locale, PAGE_SIZE, SortOrder } from "../../constants";
import { Blogpost, BlogpostsData } from "../../types";
import { parseInteger } from "../../utils";
import { Collection } from "../constants";
import database from "./db";

export const getBlogposts = async (
  locale: Locale,
  search?: string,
  sortOrder?: SortOrder,
  pageNumber?: number
): Promise<BlogpostsData> => {
  const query = {
    locale,
    ...(search && {
      $or: [
        { title: { $regex: `(?i)(?:$|^| )${search}` } },
        { content: { $regex: `(?i)(?:$|^| )${search}` } },
        { subTitle: { $regex: `(?i)(?:$|^| )${search}` } },
      ],
    }),
  };

  const sort = { date: parseInteger(sortOrder || SortOrder.DESCENDING) };

  const { db } = await database();

  const blogposts = await db
    .collection(Collection.BLOGPOSTS)
    .find(query)
    .project({ content: 0 })
    .sort(sort)
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  const count = await db.collection(Collection.BLOGPOSTS).find(query).count();

  return { blogposts, count };
};

export const getBlogpost = async (id?: string): Promise<Blogpost | null> => {
  const { db } = await database();

  return db.collection(Collection.BLOGPOSTS).findOne({ _id: new ObjectId(id) });
};
