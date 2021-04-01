import { NextApiRequest, NextApiResponse } from "next";
import { createChangeRequest, getChangeRequests } from "../../../api/db";
import { asLocale, checkToken, sendLocalizedError } from "../../../api/utils";
import { ContentType, RequestMethod, SortOrder } from "../../../constants";
import { ChangeRequestsListData, ResponseError } from "../../../types";
import { parseInteger, parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChangeRequestsListData | ResponseError>
): Promise<void> {
  const locale = asLocale(req.headers["accept-language"]);
  const {
    query: { all, type, sortOrder, search, page },
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
      // filtered by type or search query given in query string
      const getAllRequests = Boolean(all && user.isAdmin);

      const parsedType =
        type === ContentType.BLOGPOST || type === ContentType.RATING
          ? type
          : undefined;

      const changeRequests = await getChangeRequests(
        user.username,
        getAllRequests,
        parsedType,
        parseString(search),
        parseInteger(parseString(page)),
        parseString(sortOrder) as SortOrder
      );
      res.status(200).json(changeRequests);

      break;
    }

    case RequestMethod.POST:
      /**
       * BODY : GeneralChangeRequest
       */
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
  }
}
