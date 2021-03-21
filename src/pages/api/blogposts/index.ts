import { NextApiRequest, NextApiResponse } from "next";
import { getBlogposts } from "../../../api/db/blogposts";
import { asLocale, sendLocalizedError } from "../../../api/utils/locale";
import { RequestMethod, SortOrder } from "../../../constants";
import { ResponseError } from "../../../types/api";
import { BlogpostsData } from "../../../types/ratings";
import { parseInteger, parseString } from "../../../utils/common";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<BlogpostsData | ResponseError>
): Promise<void> => {
  const locale = asLocale(req.headers["accept-language"]);
  const {
    query: { search, sortOrder, page },
    method,
  } = req;
  switch (method) {
    case RequestMethod.GET: {
      const data = await getBlogposts(
        locale,
        parseString(search),
        parseString(sortOrder) as SortOrder,
        parseInteger(parseString(page))
      );
      res.status(200).json(data);
      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      sendLocalizedError(res, 405, locale);
      break;
  }
};
