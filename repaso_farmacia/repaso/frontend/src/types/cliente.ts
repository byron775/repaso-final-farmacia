export interface ClienteVenta {
  nombreCliente: string;
  apellidoCliente: string;
  fechaVenta: string; // llega ya formateada "dd/MM/yyyy HH:mm"
  total: number;
}

export interface ClienteVentaDetalle {
  nombreCliente: string;
  apellidoCliente: string;
  fechaVenta: string;
  nombreMedicamento: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
