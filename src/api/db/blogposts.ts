import { Locale, PAGE_SIZE, SortOrder } from "../../constants";
import { Blogpost, BlogpostsListData } from "../../types";
import { parseInteger } from "../../utils";
import { Collection } from "../constants";
import database from "./db";

export const getBlogposts = async (
  locale: Locale,
  search?: string,
  sortOrder?: SortOrder,
  pageNumber?: number
): Promise<BlogpostsListData> => {
  const query = {
    locale,
    ...(search && {
      $or: [
        { name: { $regex: `(?i)(?:$|^| )${search}` } },
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

  return { items: blogposts, count };
};

export const getBlogpost = async (_id?: string): Promise<Blogpost | null> => {
  const { db } = await database();

  return db.collection(Collection.BLOGPOSTS).findOne({ _id });
};

export const getAllBlogpostsUrls = async (): Promise<
  { locale: Locale; urlPathSegment: string }[]
> => {
  const { db } = await database();

  return db
    .collection(Collection.BLOGPOSTS)
    .find()
    .project({ urlPathSegment: 1, locale: 1 })
    .limit(0)
    .toArray();
};
