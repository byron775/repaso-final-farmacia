import api from "./api";
import type { Categoria } from "../types/categoria";

export const getCategoriasActivas = async () => {
  const res = await api.get<Categoria[]>("/categorias/mostrarActivos");
  return res.data;
};
