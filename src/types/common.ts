export interface CommonObject {
  [key: string]: unknown;
}

export interface Option<T = unknown> {
  label: string;
  value: T;
}

export type ListData<T> = { count: number; items: T[] };

export type sizeType =
  | "sm"
  | (string & unknown)
  | "xs"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "full";
