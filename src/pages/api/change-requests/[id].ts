import { NextApiRequest, NextApiResponse } from "next";
import {
  getChangeRequest,
  updateChangeRequest,
} from "../../../api/db/change_requests";
import { checkToken } from "../../../api/utils/auth";
import { asLocale, sendLocalizedError } from "../../../api/utils/locale";
import { RequestMethod } from "../../../constants";
import { ResponseError } from "../../../types/api";
import { GeneralChangeRequest } from "../../../types/ratings";
import { parseString } from "../../../utils/common";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GeneralChangeRequest | ResponseError>
): Promise<void> => {
  const locale = asLocale(req.headers["accept-language"]);
  const {
    query: { id },
    method,
    body,
  } = req;

  const parsedId = parseString(id);
  if (!parsedId) {
    sendLocalizedError(res, 400, locale);
    return;
  }

  const changeRequest = await getChangeRequest(parsedId);
  if (!changeRequest) {
    sendLocalizedError(res, 404, locale);
    return;
  }

  const user = await checkToken(req);
  const isAuthorized =
    user && (user.isAdmin || changeRequest.author === user.username);
  if (!isAuthorized) {
    sendLocalizedError(res, 403, locale);
    return;
  }

  switch (method) {
    case RequestMethod.GET:
      res.status(200).json(changeRequest);
      break;

    case RequestMethod.PUT:
      try {
        await updateChangeRequest(parsedId, body);
        res.status(204).end();
      } catch {
        sendLocalizedError(res, 422, locale);
      }
      break;

    case RequestMethod.DELETE:
      res.status(204).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      sendLocalizedError(res, 405, locale);
      break;
  }
};
