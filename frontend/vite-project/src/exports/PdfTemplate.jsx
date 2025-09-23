import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoimg from "../assets/logo.png";
export const generatePdf = (title, headers, data, options = {}) => {
  const doc = new jsPDF({
    orientation: options.orientation || "landscape",
    unit: "pt",
    format: "A4",
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const yPos = 25;
  const logoWidth = 110;
  const logoHeight = 30;
  if (logoimg) {
    doc.addImage(logoimg, "PNG", margin, yPos, logoWidth, logoHeight);
  }

  doc.setFontSize(18);
  doc.setTextColor("#2d4059");
  doc.text(title, pageWidth - margin, yPos, { align: "right" });

  const date = new Date();
  doc.setFontSize(10);
  doc.setTextColor("#555");
  doc.text(`Generated on: ${date.toLocaleString()}`, pageWidth - margin, yPos + 15, { align: "right" });

  autoTable(doc, {
    startY: yPos + logoHeight + 10,
    head: [headers],
    body: data,
    styles: { fontSize: 10, cellPadding: 5, lineWidth: 0.5, lineColor: [221, 221, 221] },
    headStyles: { fillColor: options.headerColor || "#2d4059", textColor: "#fff", fontStyle: "bold", halign: "center" },
    alternateRowStyles: { fillColor: options.alternateRowColor || [245, 245, 245] },
    didDrawPage: () => {
      const page = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor("#555");

      doc.text(`Page ${page}`, pageWidth - margin, pageHeight - 10, { align: "right" });
    },
  });

  doc.save(`${title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
};
