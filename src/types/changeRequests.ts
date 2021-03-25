import { ObjectId } from "mongodb";
import { Blogpost } from "./blogposts";
import { RatingFull } from "./ratings";

export interface ChangeRequest<T extends RatingFull | Blogpost> {
  _id: ObjectId;
  author: string;
  date: string;
  newValue: T;
  note?: string;
  type: T extends RatingFull
    ? "rating"
    : T extends Blogpost
    ? "blogpost"
    : "rating" | "blogpost";
}

export type GeneralChangeRequest = ChangeRequest<RatingFull | Blogpost>;

export interface ChangeRequestApproveObject<T> {
  changeRequestId: ObjectId;
  newValue: T;
}
