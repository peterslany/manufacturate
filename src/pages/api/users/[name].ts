import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      console.log("returns user's detail"); // only that user and admin
      res.status(200);
      break;
    case "PUT":
      console.log("updates user's data"); // only that user and admin
      break;
  }
};
