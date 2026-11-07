import api from "./api";
import type { Medicamento, MedicamentoCategoria } from "../types/medicamento";

export const getMedicamentosFiltro = async (nombre: string) => {
  const res = await api.get<Medicamento[]>("/medicamentos/mostrarActivosFiltro", {
    params: { nombre },
  });
  return res.data;
};

export const getMedicamentoCategoria = async () => {
  const res = await api.get<MedicamentoCategoria[]>("/medicamentos/reporteMedicamentoCategoria");
  return res.data;
};

export const getStockBajo = async (cantidad: number) => {
  const res = await api.get<Medicamento[]>("/medicamentos/stockBajo", {
    params: { cantidad },
  });
  return res.data;
};
