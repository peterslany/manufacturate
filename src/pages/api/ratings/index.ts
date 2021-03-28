import { NextApiRequest, NextApiResponse } from "next";
import { getRatingsList } from "../../../api/db";
import { asLocale, sendLocalizedError } from "../../../api/utils";
import { RequestMethod, SortOrder } from "../../../constants";
import {
  RatingsListData,
  RatingsSortableFields,
  ResponseError,
} from "../../../types";
import { parseInteger, parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RatingsListData | ResponseError>
): Promise<void> {
  const locale = asLocale(req.headers["accept-language"]);
  const {
    query: { search, category, sortBy, sortOrder, page },
    method,
  } = req;
  switch (method) {
    case RequestMethod.GET: {
      const data = await getRatingsList(
        parseString(search),
        parseString(sortBy) as RatingsSortableFields,
        parseString(sortOrder) as SortOrder,
        category,
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
