import { jsPDF } from "jspdf";

export function generateOrderPDF(orderData, orderCode) {
  const { customer, shipping, payment, items, summary } = orderData;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const navy = [23, 37, 84];
  const blue = [37, 99, 235];
  const slate = [100, 116, 139];
  const dark = [30, 41, 59];
  const lightBg = [248, 250, 252];
  const borderColor = [219, 234, 254];
  const white = [255, 255, 255];

  function formatPrice(value) {
    const number = Number(value || 0);
    return `${new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    })
      .format(number)
      .replace(/\u202f/g, " ")
      .replace(/\u00a0/g, " ")} DA`;
  }

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function drawFooter() {
    const footerY = pageHeight - 15;

    doc.setFillColor(...borderColor);
    doc.rect(margin, footerY - 4, contentWidth, 0.3, "F");

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slate);
    doc.text(
      "Empreinte Flex · Merci pour votre commande",
      pageWidth / 2,
      footerY,
      { align: "center" },
    );

    doc.setFontSize(6.5);
    doc.text(`Généré le ${today}`, pageWidth / 2, footerY + 4, {
      align: "center",
    });
  }

  function newPage() {
    drawFooter();
    doc.addPage();
    y = 20;
  }

  function sectionTitle(title) {
    if (y > 265) newPage();

    doc.setFillColor(...borderColor);
    doc.rect(margin, y, contentWidth, 0.5, "F");
    y += 6;

    doc.setTextColor(...navy);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y);
    y += 8;
  }

  function infoRow(label, value) {
    if (y > 270) newPage();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...slate);
    doc.text(label, margin, y);

    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.text(String(value || "—"), margin + 35, y);

    doc.setFont("helvetica", "normal");
    y += 6;
  }

  // Header
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageWidth, 44, "F");

  doc.setTextColor(...white);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURE", margin, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Empreinte Flex", margin, 26);

  doc.setFontSize(9);
  doc.text(`Commande : ${orderCode}`, margin, 33);
  doc.text(`Date : ${today}`, pageWidth - margin, 33, { align: "right" });

  y = 56;

  // Client
  sectionTitle("Client");
  infoRow("Nom", `${customer.firstName} ${customer.lastName}`);
  infoRow("Téléphone", customer.phone);
  infoRow("Email", customer.email);

  y += 4;

  // Livraison
  sectionTitle("Adresse de livraison");
  infoRow("Wilaya", shipping.wilaya);
  infoRow("Ville", shipping.city);
  infoRow("Rue", shipping.street);
  if (shipping.mapLink) infoRow("Localisation", shipping.mapLink);

  y += 4;

  // Paiement
  sectionTitle("Paiement");
  infoRow(
    "Méthode",
    payment?.method === "cash_on_delivery"
      ? "Paiement à la livraison"
      : payment?.method || "—",
  );
  infoRow("Statut", payment?.status || "en attente");

  y += 6;

  // Items
  sectionTitle("Articles commandés");

  const colX = {
    product: margin,
    details: margin + 58,
    qty: margin + 108,
    price: margin + 123,
    subtotal: margin + 150,
  };

  doc.setFillColor(...lightBg);
  doc.rect(margin, y - 4, contentWidth, 8, "F");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...slate);
  doc.text("PRODUIT", colX.product, y);
  doc.text("DÉTAILS", colX.details, y);
  doc.text("QTÉ", colX.qty, y);
  doc.text("PRIX", colX.price, y);
  doc.text("SOUS-TOTAL", colX.subtotal, y);

  y += 7;

  items.forEach((item, i) => {
    if (y > 260) {
      newPage();

      sectionTitle("Articles commandés");

      doc.setFillColor(...lightBg);
      doc.rect(margin, y - 4, contentWidth, 8, "F");

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...slate);
      doc.text("PRODUIT", colX.product, y);
      doc.text("DÉTAILS", colX.details, y);
      doc.text("QTÉ", colX.qty, y);
      doc.text("PRIX", colX.price, y);
      doc.text("SOUS-TOTAL", colX.subtotal, y);

      y += 7;
    }

    if (i % 2 === 0) {
      doc.setFillColor(252, 252, 253);
      doc.rect(margin, y - 4, contentWidth, 10, "F");
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...dark);
    doc.text(String(item.name || "—"), colX.product, y, { maxWidth: 54 });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...slate);

    const details = [
      item.size,
      item.thickness ? `${item.thickness} cm` : null,
      item.density,
    ]
      .filter(Boolean)
      .join(" × ");

    doc.text(details || "—", colX.details, y, { maxWidth: 42 });

    doc.setTextColor(...dark);
    doc.setFontSize(8.5);
    doc.text(String(item.quantity || 0), colX.qty, y);
    doc.text(formatPrice(item.price), colX.price, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);
    doc.text(formatPrice(item.subtotal), colX.subtotal, y);

    y += 10;
  });

  y += 4;

  if (y > 240) newPage();

  const boxX = margin + contentWidth - 78;
  const boxWidth = 78;

  doc.setFillColor(...lightBg);
  doc.roundedRect(boxX, y, boxWidth, 38, 3, 3, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...slate);
  doc.text("Articles :", boxX + 6, y + 8);
  doc.text(String(summary.itemsCount || 0), boxX + boxWidth - 6, y + 8, {
    align: "right",
  });

  doc.text("Quantité :", boxX + 6, y + 15);
  doc.text(String(summary.totalQuantity || 0), boxX + boxWidth - 6, y + 15, {
    align: "right",
  });

  doc.setFillColor(...borderColor);
  doc.rect(boxX + 6, y + 20, boxWidth - 12, 0.4, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("TOTAL", boxX + 6, y + 30);
  doc.text(formatPrice(summary.totalPrice), boxX + boxWidth - 6, y + 30, {
    align: "right",
  });

  drawFooter();

  return Buffer.from(doc.output("arraybuffer"));
}
