import jsPDF from "jspdf";

export function generateReportPDF(result) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(18);
  doc.text("Medi-Intel — Medical Analysis Report", pageWidth / 2, 20, {
    align: "center",
  });

  // Date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  // Divider
  doc.line(14, 34, pageWidth - 14, 34);

  // Content
  doc.setFontSize(12);
  doc.text("Report Summary:", 14, 45);

  doc.setFontSize(11);
  doc.text(
    doc.splitTextToSize(result.summary || "No data available", pageWidth - 28),
    14,
    55
  );

  // ECG Note
  doc.setFontSize(11);
  doc.text("ECG Status: Normal sinus rhythm (simulated)", 14, 120);

  // Disclaimer
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(
    "Disclaimer: This report is AI-generated and is not a medical diagnosis.",
    14,
    140
  );

  // Save
  doc.save("Medi-Intel-Report.pdf");
}
