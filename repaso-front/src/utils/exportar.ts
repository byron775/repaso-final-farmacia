import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import logoUrl from "../assets/logo.png"; // pon cualquier PNG en src/assets/logo.png

type Celda = string | number | { formula: string };

// Convierte la imagen importada a base64 para jsPDF
const cargarLogo = async (): Promise<string> => {
  const blob = await (await fetch(logoUrl)).blob();
  return new Promise((resolve) => {
    const lector = new FileReader();
    lector.onloadend = () => resolve(lector.result as string);
    lector.readAsDataURL(blob);
  });
};

const fechaHoy = () => new Date().toLocaleString("es-GT");

// ---------- PDF ----------
export const generarPDF = async (
  titulo: string,
  columnas: string[],
  filas: (string | number)[][],
  archivo: string,
  pie?: (string | number)[]
) => {
  const doc = new jsPDF({ orientation: "landscape", format: "a4" });
  const ancho = doc.internal.pageSize.getWidth();
  const alto = doc.internal.pageSize.getHeight();

  const logo = await cargarLogo();
  doc.addImage(logo, "PNG", 14, 8, 20, 20);

  doc.setFontSize(16);
  doc.text(titulo, 40, 18);
  doc.setFontSize(10);
  doc.text(`Fecha de generación: ${fechaHoy()}`, 40, 25);

  autoTable(doc, {
    startY: 32,
    head: [columnas],
    body: filas,
    foot: pie ? [pie] : undefined,
    theme: "grid",
    headStyles: { fillColor: [22, 101, 52], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [220, 252, 231] },
    footStyles: { fillColor: [22, 101, 52], textColor: 255, fontStyle: "bold" },
    showFoot: "lastPage",
  });

  const totalPaginas = doc.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.text(`Página ${i} de ${totalPaginas}`, ancho / 2, alto - 8, { align: "center" });
  }

  doc.save(archivo);
};

// ---------- EXCEL ----------
export const generarExcel = async (
  titulo: string,
  columnas: string[],
  filas: Celda[][],
  archivo: string,
  opciones?: {
    anchos?: number[];
    columnasMoneda?: number[];          // números de columna (1 = A)
    alAgregarFila?: (fila: ExcelJS.Row, indice: number) => void;
    filaTotal?: (ultimaFilaDatos: number) => Celda[];
  }
) => {
  const libro = new ExcelJS.Workbook();
  const hoja = libro.addWorksheet("Reporte");

  // Fila 1: título
  hoja.addRow([titulo]);
  hoja.getRow(1).font = { bold: true, size: 16 };
  // Fila 2: fecha, Fila 3: vacía
  hoja.addRow([`Fecha de generación: ${fechaHoy()}`]);
  hoja.addRow([]);

  // Fila 4: encabezados
  const encabezado = hoja.addRow(columnas);
  encabezado.eachCell((celda) => {
    celda.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF166534" } };
    celda.font = { bold: true, color: { argb: "FFFFFFFF" } };
  });

  const borde: Partial<ExcelJS.Borders> = {
    top: { style: "thin" }, left: { style: "thin" },
    bottom: { style: "thin" }, right: { style: "thin" },
  };

  // Fila 5 en adelante: datos
  filas.forEach((datos, i) => {
    const fila = hoja.addRow(datos);
    if (i % 2 === 1) {
      fila.eachCell((celda) => {
        celda.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCFCE7" } };
      });
    }
    opciones?.alAgregarFila?.(fila, i); // va después para que el rojo gane al verde
  });

  const ultima = hoja.rowCount;
  if (opciones?.filaTotal) {
    const total = hoja.addRow(opciones.filaTotal(ultima));
    total.font = { bold: true };
  }

  // Bordes en toda la tabla (desde el encabezado)
  for (let r = 4; r <= hoja.rowCount; r++) {
    for (let c = 1; c <= columnas.length; c++) {
      hoja.getRow(r).getCell(c).border = borde;
    }
  }

  // Anchos y formato de números
  columnas.forEach((_, i) => {
    hoja.getColumn(i + 1).width = opciones?.anchos?.[i] ?? 20;
  });
  opciones?.columnasMoneda?.forEach((c) => (hoja.getColumn(c).numFmt = "#,##0.00"));

  const buffer = await libro.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = archivo;
  enlace.click();
  URL.revokeObjectURL(enlace.href);
};
