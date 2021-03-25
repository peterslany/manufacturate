import { NextApiRequest, NextApiResponse } from "next";
import {
  approveChangeRequest,
  getRatingDetail,
  reverseToChangeRequest,
} from "../../../api/db";
import {
  asLocale,
  checkToken,
  localizeRatingData,
  sendLocalizedError,
} from "../../../api/utils";
import { RequestMethod } from "../../../constants";
import { RatingFull, RatingLocalized, ResponseError } from "../../../types";
import { parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    RatingLocalized | RatingFull | ResponseError | { name: string }
  >
): Promise<void> {
  const {
    query: { name, localize },
    method,
    body,
  } = req;
  const parsedName = parseString(name);

  const locale = asLocale(req.headers["accept-language"]);

  const user = await checkToken(req);

  const rating = await getRatingDetail(parseString(name));

  switch (method) {
    case RequestMethod.GET:
      if (!rating) {
        sendLocalizedError(res, 404, locale);
      } else {
        const result = localize ? localizeRatingData(rating, locale) : rating;
        res.status(200).json(result);
      }
      break;

    // deletes item from ratings collection and creates new change request from it
    case RequestMethod.DELETE:
      if (!rating) {
        sendLocalizedError(res, 404, locale);
        return;
      }
      if (user?.isAdmin) {
        try {
          if (!parsedName) {
            throw new Error(`${name} is not valid name of manufacturer.`);
          }
          await reverseToChangeRequest<RatingFull>(
            parsedName,
            "rating",
            user.username
          );
          res.status(204).end();
          return;
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
          if (!parsedName) {
            throw new Error(`${name} is not valid name of manufacturer.`);
          }

          await approveChangeRequest<RatingFull>(body, parsedName, "rating");
          res.setHeader("Location", `/ratings/${name}`);
          res.status(201).json({ name: parsedName });
          return;
        } catch {
          sendLocalizedError(res, 422, locale);
          return;
        }
      } else {
        sendLocalizedError(res, 403, locale);
        return;
      }

    default:
      res.setHeader("Allow", ["DELETE", "GET", "PUT"]);
      sendLocalizedError(res, 405, locale);
  }
}
