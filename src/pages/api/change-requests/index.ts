import { NextApiRequest, NextApiResponse } from "next";
import { createChangeRequest, getChangeRequests } from "../../../api/db";
import { asLocale, checkToken, sendLocalizedError } from "../../../api/utils";
import { RequestMethod } from "../../../constants";
import { GeneralChangeRequest, ResponseError } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneralChangeRequest[] | ResponseError>
): Promise<void> {
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
  }
}
