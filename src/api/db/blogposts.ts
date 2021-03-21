import database from ".";
import { Locale, PAGE_SIZE, SortOrder } from "../../constants";
import { BlogpostsData } from "../../types/ratings";
import { parseInteger } from "../../utils/common";

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

  const ratings = await db
    .collection("blogposts")
    .find(query)
    .project({ content: 0 })
    .sort(sort)
    .limit(PAGE_SIZE)
    .skip(((pageNumber || 1) - 1) * PAGE_SIZE)
    .toArray();

  const count = await db.collection("blogposts").find(query).count();

  return { ratings, count };
};

export const s = 2;
