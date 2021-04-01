import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUsersList } from "../../../api/db";
import {
  asLocale,
  checkToken,
  dbUserToUser,
  hashPassword,
  sendLocalizedError,
} from "../../../api/utils";
import { RequestMethod } from "../../../constants";
import { parseInteger, parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const user = await checkToken(req);

  const {
    query: { search, page },
    method,
    body,
  } = req;

  const locale = asLocale(req.headers["accept-language"]);

  if (!user?.isAdmin) {
    sendLocalizedError(res, 403, locale);
    return;
  }

  switch (method) {
    case RequestMethod.GET: {
      const { count, items } = await getUsersList(
        parseString(search),
        parseInteger(parseString(page))
      );

      const result = { count, items: items.map(dbUserToUser) };

      res.status(200).json(result);
      break;
    }
    case RequestMethod.POST:
      try {
        const { username, password } = body;
        const passwordHash = hashPassword(password);
        await createUser(username, passwordHash);
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
