export interface Medicamento {
  nombre: string;
  laboratorio: string;
  precio: number;
  stock: number;
}

export interface MedicamentoCategoria {
  nombreMedicamento: string;
  laboratorio: string;
  nombreCategoria: string;
  precio: number;
  stock: number;
}
