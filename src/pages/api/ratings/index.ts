import { NextApiRequest, NextApiResponse } from "next";
import { getRatingsList } from "../../../api/db";
import { checkToken } from "../../../api/utils/auth";
import { asLocale, localizeError } from "../../../api/utils/locale";
import {
  RatingsSortFields,
  RequestMethod,
  SortOrder,
} from "../../../constants";
import { ResponseError } from "../../../types/api";
import { RatingsListData } from "../../../types/ratings";
import { parseInteger, parseString } from "../../../utils/common";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RatingsListData | ResponseError>
): Promise<void> => {
  const user = await checkToken(req);
  const locale = asLocale(req.headers["accept-language"]);
  const {
    query: { search, category, sortBy, sortOrder, page },
    method,
  } = req;
  switch (method) {
    case RequestMethod.GET: {
      const data = await getRatingsList(
        parseString(search),
        parseString(sortBy) as RatingsSortFields,
        parseString(sortOrder) as SortOrder,
        category,
        parseInteger(parseString(page))
      );

      res.status(200).json(data);

      break;
    }

    case RequestMethod.POST:
      if (user?.isAdmin) {
        // TODO: create new rating
      } else {
        // TODO: return error with appropriate message
        const error = {
          status: 403,
          message: localizeError(403, locale),
        };
        res.status(403).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
  res.end();
};
