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
import { ContentType, RequestMethod } from "../../../constants";
import { RatingFull, RatingLocalized, ResponseError } from "../../../types";
import { parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    RatingLocalized | RatingFull | ResponseError | { _id: string }
  >
): Promise<void> {
  const {
    query: { id, localize },
    method,
    body,
  } = req;
  const _id = parseString(id);

  const locale = asLocale(req.headers["accept-language"]);

  const user = await checkToken(req);

  const rating = await getRatingDetail(parseString(id));

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
          if (!_id) {
            throw new Error(`${id} is not valid id of manufacturer.`);
          }
          await reverseToChangeRequest<RatingFull>(
            _id,
            ContentType.RATING,
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
      /**
       * BODY:
       * {
       *  changeRequestId: string
       * }
       */
      if (user?.isAdmin) {
        try {
          if (!_id) {
            throw new Error(`${id} is not valid id of the manufacturer.`);
          }

          await approveChangeRequest<RatingFull>(
            body.changeRequestId,
            _id,
            ContentType.RATING
          );
          res.setHeader("Location", `/ratings/${id}`);
          res.status(201).json({ _id });
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
