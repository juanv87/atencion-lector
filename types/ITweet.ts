import { IAutor } from "./IAutor";

export interface ITweet {
  id: string;
  body: string;
  createdAt: unknown;
  autor: IAutor;
}
