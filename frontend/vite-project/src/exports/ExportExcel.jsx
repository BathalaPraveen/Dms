import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const exportToExcel = (fileName, headers, data) => {
  const worksheetData = [headers, ...data]; 
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData); 
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cell]) continue;
    worksheet[cell].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "2D4059" } },
      alignment: { horizontal: "center" },
    };
  }

  const workbook = XLSX.utils.book_new(); // Create workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Add sheet

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), 
    `${fileName.replace(/\s+/g, "_").toLowerCase()}.xlsx`
  );
};

export default exportToExcel;
