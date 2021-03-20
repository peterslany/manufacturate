import { RatingCategory, RatingsSortFields } from "../../constants";
import { getRatingsFieldPath } from "../utils/db";

export enum Collection {
  BLOGPOSTS = "blog_posts",
  CHANGE_REQUESTS = "change_requests",
  RATINGS = "ratings",
  USERS = "users",
}

export const ratingsSortableFields = [
  "manufacturer_name",
  ...Object.values(RatingCategory),
].map((field) => getRatingsFieldPath(field as RatingsSortFields));
