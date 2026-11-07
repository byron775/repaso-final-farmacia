import { useRef, useState } from "react";
import { generarExcel, generarPDF } from "../utils/exportar";
import { getCategoriasActivas } from "../services/categoriaService";
import { getMedicamentoCategoria, getMedicamentosFiltro, getStockBajo } from "../services/medicamentoService";
import { getClienteVenta, getClienteVentaDetalle } from "../services/clienteService";

export default function Reportes() {
  const dialogNombre = useRef<HTMLDialogElement>(null);
  const dialogStock = useRef<HTMLDialogElement>(null);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(10);

  // ---------- 1. Categorías activas ----------
  const categoriasPDF = async () => {
    const datos = await getCategoriasActivas();
    await generarPDF("Categorías activas", ["Nombre", "Descripción"],
      datos.map((c) => [c.nombre, c.descripcion]), "categorias.pdf");
  };
  const categoriasExcel = async () => {
    const datos = await getCategoriasActivas();
    await generarExcel("Categorías activas", ["Nombre", "Descripción"],
      datos.map((c) => [c.nombre, c.descripcion]), "categorias.xlsx", { anchos: [25, 50] });
  };

  // ---------- 2. Medicamentos por nombre ----------
  const colMed = ["Nombre", "Laboratorio", "Precio", "Stock"];
  const medNombrePDF = async () => {
    const datos = await getMedicamentosFiltro(nombre);
    await generarPDF(`Medicamentos que contienen "${nombre}"`, colMed,
      datos.map((m) => [m.nombre, m.laboratorio, m.precio.toFixed(2), m.stock]),
      "medicamentosNombre.pdf");
  };
  const medNombreExcel = async () => {
    const datos = await getMedicamentosFiltro(nombre);
    await generarExcel(`Medicamentos que contienen "${nombre}"`, colMed,
      datos.map((m) => [m.nombre, m.laboratorio, m.precio, m.stock]),
      "medicamentosNombre.xlsx", { anchos: [30, 25, 12, 10], columnasMoneda: [3] });
  };

  // ---------- 3. Medicamentos con su categoría ----------
  const colMC = ["Medicamento", "Laboratorio", "Categoría", "Precio", "Stock"];
  const medCatPDF = async () => {
    const datos = await getMedicamentoCategoria();
    await generarPDF("Medicamentos por categoría", colMC,
      datos.map((m) => [m.nombreMedicamento, m.laboratorio, m.nombreCategoria, m.precio.toFixed(2), m.stock]),
      "medicamentoCategoria.pdf");
  };
  const medCatExcel = async () => {
    const datos = await getMedicamentoCategoria();
    await generarExcel("Medicamentos por categoría", colMC,
      datos.map((m) => [m.nombreMedicamento, m.laboratorio, m.nombreCategoria, m.precio, m.stock]),
      "medicamentoCategoria.xlsx", { anchos: [30, 25, 25, 12, 10], columnasMoneda: [4] });
  };

  // ---------- 4. Stock bajo ----------
  const colStock = ["Medicamento", "Laboratorio", "Stock"];
  const stockPDF = async () => {
    const datos = await getStockBajo(cantidad);
    await generarPDF(`Medicamentos con stock menor a ${cantidad}`, colStock,
      datos.map((m) => [m.nombre, m.laboratorio, m.stock]), "stockBajo.pdf");
  };
  const stockExcel = async () => {
    const datos = await getStockBajo(cantidad);
    await generarExcel(`Medicamentos con stock menor a ${cantidad}`, colStock,
      datos.map((m) => [m.nombre, m.laboratorio, m.stock]), "stockBajo.xlsx", {
        anchos: [30, 25, 10],
        alAgregarFila: (fila, i) => {
          if (datos[i].stock < 5) {
            fila.getCell(3).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFCA5A5" } };
          }
        },
      });
  };

  // ---------- 5. Ventas por cliente ----------
  const colVenta = ["Cliente", "Fecha", "Total"];
  const ventasPDF = async () => {
    const datos = await getClienteVenta();
    await generarPDF("Ventas por cliente", colVenta,
      datos.map((v) => [`${v.nombreCliente} ${v.apellidoCliente}`, v.fechaVenta, v.total.toFixed(2)]),
      "ventasCliente.pdf");
  };
  const ventasExcel = async () => {
    const datos = await getClienteVenta();
    await generarExcel("Ventas por cliente", colVenta,
      datos.map((v) => [`${v.nombreCliente} ${v.apellidoCliente}`, v.fechaVenta, v.total]),
      "ventasCliente.xlsx", { anchos: [30, 20, 14], columnasMoneda: [3] });
  };

  // ---------- 6. Detalle de ventas (con total general) ----------
  const colDet = ["Cliente", "Fecha", "Medicamento", "Cantidad", "Precio unitario", "Subtotal"];
  const detallePDF = async () => {
    const datos = await getClienteVentaDetalle();
    const total = datos.reduce((suma, d) => suma + d.subtotal, 0);
    await generarPDF("Detalle de ventas por cliente", colDet,
      datos.map((d) => [`${d.nombreCliente} ${d.apellidoCliente}`, d.fechaVenta, d.nombreMedicamento,
        d.cantidad, d.precioUnitario.toFixed(2), d.subtotal.toFixed(2)]),
      "ventasDetalle.pdf", ["", "", "", "", "Total general", total.toFixed(2)]);
  };
  const detalleExcel = async () => {
    const datos = await getClienteVentaDetalle();
    await generarExcel("Detalle de ventas por cliente", colDet,
      datos.map((d) => [`${d.nombreCliente} ${d.apellidoCliente}`, d.fechaVenta, d.nombreMedicamento,
        d.cantidad, d.precioUnitario, d.subtotal]),
      "ventasDetalle.xlsx", {
        anchos: [28, 18, 30, 10, 16, 14],
        columnasMoneda: [5, 6],
        filaTotal: (ultima) => ["", "", "", "", "Total general", { formula: `SUM(F5:F${ultima})` }],
      });
  };

  const tarjeta = (titulo: string, pdf: () => void, excel: () => void) => (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
      <h3>{titulo}</h3>
      <button onClick={pdf}>Exportar a PDF</button>{" "}
      <button onClick={excel}>Exportar a Excel</button>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>Reportes</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {tarjeta("1. Categorías activas", categoriasPDF, categoriasExcel)}

        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
          <h3>2. Medicamentos por nombre</h3>
          <button onClick={() => dialogNombre.current?.showModal()}>Abrir filtro</button>
        </div>

        {tarjeta("3. Medicamentos con su categoría", medCatPDF, medCatExcel)}

        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
          <h3>4. Medicamentos con stock bajo</h3>
          <button onClick={() => dialogStock.current?.showModal()}>Abrir filtro</button>
        </div>

        {tarjeta("5. Ventas por cliente", ventasPDF, ventasExcel)}
        {tarjeta("6. Detalle de ventas", detallePDF, detalleExcel)}
      </div>

      {/* Diálogo del reporte 2 */}
      <dialog ref={dialogNombre}>
        <h3>Medicamentos por nombre</h3>
        <input type="text" placeholder="Ej. crema" value={nombre}
          onChange={(e) => setNombre(e.target.value)} />
        <p>
          <button onClick={medNombrePDF}>Exportar a PDF</button>{" "}
          <button onClick={medNombreExcel}>Exportar a Excel</button>{" "}
          <button onClick={() => dialogNombre.current?.close()}>Cerrar</button>
        </p>
      </dialog>

      {/* Diálogo del reporte 4 */}
      <dialog ref={dialogStock}>
        <h3>Medicamentos con stock bajo</h3>
        <input type="number" min={0} value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))} />
        <p>
          <button onClick={stockPDF}>Exportar a PDF</button>{" "}
          <button onClick={stockExcel}>Exportar a Excel</button>{" "}
          <button onClick={() => dialogStock.current?.close()}>Cerrar</button>
        </p>
      </dialog>
    </div>
  );
}
