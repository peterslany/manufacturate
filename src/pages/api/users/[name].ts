import { NextApiRequest, NextApiResponse } from "next";
import { RequestMethod } from "../../../constants";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const user = await checkToken(req);
  const {query : {name}, method}
  switch (method) {
    case RequestMethod.GET:
      console.log("returns user's detail"); // only that user and admin
      res.status(200);
      break;
    case "PUT":
      console.log("updates user's data"); // only that user and admin
      break;
  }
};
