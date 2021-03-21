import { NextApiRequest, NextApiResponse } from "next";
import { approveRating, getRatingDetail, hideRating } from "../../../api/db";
import { checkToken } from "../../../api/utils/auth";
import {
  asLocale,
  localizeRatingData,
  sendLocalizedError,
} from "../../../api/utils/locale";
import { RequestMethod } from "../../../constants";
import { ResponseError } from "../../../types";
import { RatingFull, RatingLocalized } from "../../../types/ratings";
import { parseString } from "../../../utils/common";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RatingLocalized | RatingFull | ResponseError>
): Promise<void> => {
  const {
    query: { name, localize },
    method,
    body,
  } = req;

  const locale = asLocale(req.headers["accept-language"]);

  const user = await checkToken(req);

  switch (method) {
    case RequestMethod.GET: {
      const rating = await getRatingDetail(parseString(name));

      if (!rating) sendLocalizedError(res, 404, locale);
      else {
        const result = localize ? localizeRatingData(rating, locale) : rating;

        res.status(200).json(result);
      }

      break;
    }

    // deletes item from ratings collection and creates new change request from it
    case RequestMethod.DELETE:
      if (user?.isAdmin) {
        try {
          const parsedName = parseString(name);
          if (!parsedName) {
            throw new Error(`${name} is not valid name of manufacturer.`);
          }
          hideRating(parsedName);
          res.status(204).end();
        } catch {
          sendLocalizedError(res, 422, locale);
        }
      } else {
        sendLocalizedError(res, 403, locale);
      }
      break;

    // approves change-requests and creates/updates rating
    case RequestMethod.PUT:
      if (user?.isAdmin) {
        try {
          const parsedName = parseString(name);
          if (!parsedName) {
            throw new Error(`${name} is not valid name of manufacturer.`);
          }

          approveRating(body, parsedName);
          res.setHeader("Location", `/ratings/${name}`);
          res.status(201).end();
        } catch {
          sendLocalizedError(res, 422, locale);
        }
      } else {
        sendLocalizedError(res, 403, locale);
      }
      break;

    default:
      res.setHeader("Allow", ["DELETE", "GET", "PUT"]);
      sendLocalizedError(res, 405, locale);
  }
};
