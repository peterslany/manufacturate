import { ContentType } from "../constants";
import { Blogpost } from "./blogposts";
import { ListData } from "./common";
import { RatingFull } from "./ratings";

export interface ChangeRequest<T extends RatingFull | Blogpost> {
  _id: string;
  author: string;
  content: T;
  date: string;
  note?: string;
  type: T extends RatingFull
    ? ContentType.RATING
    : T extends Blogpost
    ? ContentType.BLOGPOST
    : ContentType;
}

export type GeneralChangeRequest = ChangeRequest<RatingFull | Blogpost>;

export type ChangeRequestsListData = ListData<GeneralChangeRequest>;
