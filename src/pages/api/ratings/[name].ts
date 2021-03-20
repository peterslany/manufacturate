import { NextApiRequest, NextApiResponse } from "next";
import { getRatingDetail } from "../../../api/db";
import { asLocale, localizeRatingData } from "../../../api/utils/locale";
import { ResponseError } from "../../../types";
import { RatingLocalized } from "../../../types/ratings";
import { parseString } from "../../../utils/common";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RatingLocalized | ResponseError>
): Promise<void> => {
  const {
    query: { name, localize },
    method,
  } = req;

  const locale = asLocale(req.headers["accept-language"]);
  switch (method) {
    case "GET": {
      const rating = await getRatingDetail(parseString(name));

      const result = localize ? localizeRatingData(rating, locale) : rating;

      res.status(200).json(result);
      break;
    }
    case "PUT":
      console.log("updates rating detail for"); // only authenticated user
      break;
    default:
  }
};
