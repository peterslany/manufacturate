import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getBlogpost } from "../../../api/db/blogposts";
import {
  approveChangeRequest,
  reverseToChangeRequest,
} from "../../../api/db/change_requests";
import { checkToken } from "../../../api/utils/auth";
import { asLocale, sendLocalizedError } from "../../../api/utils/locale";
import { RequestMethod } from "../../../constants";
import { ResponseError } from "../../../types";
import { Blogpost } from "../../../types/ratings";
import { parseString } from "../../../utils/common";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Blogpost | ResponseError>
): Promise<void> => {
  const {
    query: { id },
    method,
    body,
  } = req;
  const parsedId = parseString(id);

  const locale = asLocale(req.headers["accept-language"]);

  const user = await checkToken(req);

  const blogpost = await getBlogpost(parsedId);

  switch (method) {
    // deletes post from blogposts collection and creates new change request for it
    case RequestMethod.DELETE:
      if (!blogpost) {
        sendLocalizedError(res, 404, locale);
        return;
      }
      if (user?.isAdmin) {
        try {
          if (!parsedId) {
            throw new Error(`${id} is not valid id of blogpost.`);
          }
          await reverseToChangeRequest<Blogpost>(
            new ObjectId(parsedId),
            "blogpost",
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

    case RequestMethod.GET:
      if (!blogpost) sendLocalizedError(res, 404, locale);
      else {
        res.status(200).json(blogpost);
      }
      break;

    // approves change request and creates/updates rating
    case RequestMethod.PUT:
      if (user?.isAdmin) {
        try {
          if (!parsedId) {
            throw new Error(`${id} is not valid id of blogpost.`);
          }

          await approveChangeRequest<Blogpost>(
            body,
            new ObjectId(parsedId),
            "blogpost"
          );
          res.status(204).end();
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
};
