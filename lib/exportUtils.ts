"use client";

export async function downloadPDF(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;

  // Handle multi-page
  const pageHeightPx = (pdfHeight / pdfWidth) * imgWidth;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(
    imgData,
    "PNG",
    imgX,
    position,
    imgWidth * ratio,
    imgHeight * ratio
  );
  heightLeft -= pageHeightPx;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      position * ratio,
      imgWidth * ratio,
      imgHeight * ratio
    );
    heightLeft -= pageHeightPx;
  }

  pdf.save(`${filename}.pdf`);
}

export async function downloadJPG(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const link = document.createElement("a");
  link.download = `${filename}.jpg`;
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
}
