import api from "./api";
import type { ClienteVenta, ClienteVentaDetalle } from "../types/cliente";

export const getClienteVenta = async () => {
  const res = await api.get<ClienteVenta[]>("/clientes/reporteClienteVenta");
  return res.data;
};

export const getClienteVentaDetalle = async () => {
  const res = await api.get<ClienteVentaDetalle[]>("/clientes/reporteClienteVentaDetalle");
  return res.data;
};
