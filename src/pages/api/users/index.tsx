import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      console.log("returns users"); // only admin
      break;
    case "POST":
      console.log("creates new user"); // only admin
      res.status(404);
      break;
    default:
  }
};
