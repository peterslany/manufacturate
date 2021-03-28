import { RatingCategory } from "../../constants";
import { RatingsSortableFields } from "../../types";
import { getRatingsFieldPath } from "../utils/db";

export enum Collection {
  BLOGPOSTS = "blogposts",
  CHANGE_REQUESTS = "change_requests",
  RATINGS = "ratings",
  USERS = "users",
}

export const ratingsSortableFields = [
  "manufacturer_name",
  ...Object.values(RatingCategory),
].map((field) => getRatingsFieldPath(field as RatingsSortableFields));
