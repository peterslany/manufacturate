import { Locale } from "../constants";
import { ListData } from "./common";

export type BlogpostsData = ListData<BlogpostBase>;

export interface BlogpostBase {
  _id: string;
  author: string;
  date: string;
  locale: Locale;
  name: string;
  subTitle: string;
  thumbnailUrl: string;
  urlPathSegment: string;
}
export interface Blogpost extends BlogpostBase {
  content: string;
}
