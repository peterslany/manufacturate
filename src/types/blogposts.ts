import { ObjectId } from "mongodb";
import { Locale } from "../constants";

export type BlogpostsData = { blogposts: BlogpostBase[]; count: number };

export interface BlogpostBase {
  _id: ObjectId;
  author: string;
  date: string;
  locale: Locale;
  subTitle: string;
  thumbnailUrl: string;
  title: string;
  urlPathSegment: string;
}
export interface Blogpost extends BlogpostBase {
  content: string;
}
