import { NextApiRequest, NextApiResponse } from "next";
import {
  createChangeRequest,
  getChangeRequests,
} from "../../../api/db/change_requests";
import { checkToken } from "../../../api/utils/auth";
import { asLocale, sendLocalizedError } from "../../../api/utils/locale";
import { RequestMethod } from "../../../constants";
import { ResponseError } from "../../../types/api";
import { GeneralChangeRequest } from "../../../types/ratings";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GeneralChangeRequest[] | ResponseError>
): Promise<void> => {
  const locale = asLocale(req.headers["accept-language"]);
  const {
    query: { all, type },
    method,
    body,
  } = req;

  const user = await checkToken(req);
  if (!user) {
    sendLocalizedError(res, 403, locale);
    return;
  }

  switch (method) {
    case RequestMethod.GET: {
      // returns all change requests / requests of the user that can be
      // filtered by type given in query string
      const getAllRequests = Boolean(all && user.isAdmin);

      const parsedType =
        type === "blogpost" || type === "rating" ? type : undefined;

      const changeRequests = await getChangeRequests(
        user.username,
        getAllRequests,
        parsedType
      );
      res.status(200).json(changeRequests);

      break;
    }

    case RequestMethod.POST:
      try {
        await createChangeRequest(body);
        res.status(204).end();
      } catch {
        sendLocalizedError(res, 422, locale);
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      sendLocalizedError(res, 405, locale);
      break;
  }
};
