import { IAutor } from "./IAutor";

export interface IPregunta {
  id: string;
  titulo: string;
  createdAt: unknown;
  autor: IAutor;
  respuestas?: Object;
}
