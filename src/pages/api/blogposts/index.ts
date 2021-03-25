import { NextApiRequest, NextApiResponse } from "next";
import { getBlogposts } from "../../../api/db";
import { asLocale, sendLocalizedError } from "../../../api/utils";
import { RequestMethod, SortOrder } from "../../../constants";
import { BlogpostsData, ResponseError } from "../../../types";
import { parseInteger, parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogpostsData | ResponseError>
): Promise<void> {
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
  }
}
