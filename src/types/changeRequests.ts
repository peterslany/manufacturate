import { ObjectId } from "mongodb";
import { ChangeRequestType } from "../constants";
import { Blogpost } from "./blogposts";
import { RatingFull } from "./ratings";

export interface ChangeRequest<T extends RatingFull | Blogpost> {
  _id: ObjectId;
  author: string;
  content: T;
  date: string;
  note?: string;
  type: T extends RatingFull
    ? ChangeRequestType.RATING
    : T extends Blogpost
    ? ChangeRequestType.BLOGPOST
    : ChangeRequestType;
}

export type GeneralChangeRequest = ChangeRequest<RatingFull | Blogpost>;
