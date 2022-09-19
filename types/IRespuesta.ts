import { IAutor } from "./IAutor";

export interface IRespuesta {
  id: string;
  idPregunta: string;
  titulo: string;
  createdAt: unknown;
  autor: string;
}
