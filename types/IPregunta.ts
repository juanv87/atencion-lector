import { IAutor } from "./IAutor";
import { IRespuesta } from "./IRespuesta";

export interface IPregunta {
  id: string;
  titulo: string;
  createdAt: unknown;
  autor: IAutor;
  respuestas: IRespuesta[];
}
