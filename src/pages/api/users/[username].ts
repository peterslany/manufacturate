import { NextApiRequest, NextApiResponse } from "next";
import { getUser, modifyUser } from "../../../api/db";
import {
  asLocale,
  checkToken,
  dbUserToUser,
  hashPassword,
  sendLocalizedError,
} from "../../../api/utils";
import { RequestMethod } from "../../../constants";
import { ResponseError, User, UserDB } from "../../../types";
import { parseString } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
): Promise<void> {
  const user = await checkToken(req);

  const {
    query: { username },
    method,
    body,
  } = req;

  const parsedUsername = parseString(username);

  const locale = asLocale(req.headers["accept-language"]);

  if (!parsedUsername) {
    sendLocalizedError(res, 400, locale);
    return;
  }

  switch (method) {
    case RequestMethod.GET:
      {
        const userDB = await getUser(parsedUsername);
        if (userDB) {
          const parsedUser = dbUserToUser(userDB);
          res.status(200).json(parsedUser);
        } else {
          sendLocalizedError(res, 404, locale);
        }
      }
      break;
    case RequestMethod.PUT:
      /**
       * body type = {
       *    newPassword: string,
       *    name: string,
       *    isAdmin: boolean
       * }
       */
      try {
        const hasAccess = [
          user?.username === parsedUsername && user?.isAdmin,
          user?.username === parsedUsername && !("isAdmin" in body),
          user?.isAdmin && !("newPassword" in body),
        ];

        const newUserData: UserDB = {
          _id: parsedUsername,
          ...body,
          ...(body.newPassword && {
            passwordHash: hashPassword(body.newPassword),
          }),
        };

        if (hasAccess.some((rule) => rule)) {
          await modifyUser(newUserData);

          res.status(204).end();
        } else {
          sendLocalizedError(res, 403, locale);
        }
      } catch {
        sendLocalizedError(res, 422, locale);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      sendLocalizedError(res, 405, locale);
  }
}
