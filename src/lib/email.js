import nodemailer from "nodemailer";
import { generateOrderPDF } from "@/lib/pdf";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function formatPrice(value) {
  const number = Number(value || 0);
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(number)
    .replace(/\u202f/g, " ")
    .replace(/\u00a0/g, " ")} DA`;
}

export async function sendOrderEmail(orderData, orderCode) {
  const { customer, shipping, payment, items, summary } = orderData;

  let pdfBuffer;
  try {
    pdfBuffer = generateOrderPDF(orderData, orderCode);
    console.log("[PDF] ✓ Généré avec succès");
  } catch (pdfError) {
    console.error("[PDF] ✗ Échec de génération :", pdfError.message);
    pdfBuffer = null;
  }

  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td class="cell product-cell">
          <div class="product-name">${item.name}</div>
          <div class="product-meta">
            ${item.size || "—"}${item.thickness ? ` × ${item.thickness} cm` : ""}${item.density ? ` · ${item.density}` : ""}
          </div>
        </td>
        <td class="cell qty-cell">${item.quantity}</td>
        <td class="cell price-cell">${formatPrice(item.price)}</td>
        <td class="cell subtotal-cell">${formatPrice(item.subtotal)}</td>
      </tr>`,
    )
    .join("");

  const paymentMethodLabel =
    payment?.method === "cash_on_delivery"
      ? "Paiement à la livraison"
      : payment?.method || "—";

  const paymentStatusLabel = payment?.status || "en attente";

  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f1f5f9;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      .wrapper {
        width: 100%;
        background: #f1f5f9;
        padding: 16px 10px;
      }

      .container {
        max-width: 640px;
        margin: 0 auto;
      }

      .header {
        background: #172554;
        border-radius: 14px 14px 0 0;
        padding: 20px 16px;
        text-align: center;
      }

      .header-title {
        margin: 0;
        color: #ffffff;
        font-size: 20px;
        line-height: 1.3;
        font-weight: 700;
      }

      .header-subtitle {
        margin: 8px 0 0;
        color: #93c5fd;
        font-size: 12px;
        line-height: 1.5;
      }

      .card {
        background: #ffffff;
        padding: 18px 14px;
        border-radius: 0 0 14px 14px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      }

      .section-title {
        margin: 0 0 12px;
        font-size: 14px;
        line-height: 1.4;
        color: #172554;
        border-bottom: 2px solid #dbeafe;
        padding-bottom: 7px;
        font-weight: 700;
      }

      .info-table {
        margin-bottom: 20px;
      }

      .label {
        padding: 5px 0;
        color: #64748b;
        width: 110px;
        font-size: 12px;
        vertical-align: top;
      }

      .value {
        padding: 5px 0;
        color: #1e293b;
        font-weight: 600;
        font-size: 12px;
        line-height: 1.5;
      }

      .payment-text {
        font-size: 12px;
        color: #1e293b;
        margin: 0 0 20px;
        line-height: 1.6;
      }

      .muted {
        color: #64748b;
      }

      .status {
        color: #f59e0b;
        font-weight: 700;
      }

      .items-table {
        margin-bottom: 20px;
        table-layout: fixed;
      }

      .items-head th {
        background: #f8fafc;
        padding: 9px 10px;
        font-size: 10px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .items-head .th-product {
        text-align: left;
        width: 44%;
      }

      .items-head .th-qty {
        text-align: center;
        width: 12%;
      }

      .items-head .th-price,
      .items-head .th-subtotal {
        text-align: right;
        width: 22%;
      }

      .cell {
        padding: 10px 10px;
        border-bottom: 1px solid #e2e8f0;
        font-size: 12px;
        color: #1e293b;
        vertical-align: top;
      }

      .product-cell {
        text-align: left;
      }

      .product-name {
        font-size: 12px;
        font-weight: 600;
        color: #1e293b;
        line-height: 1.5;
        word-break: break-word;
      }

      .product-meta {
        margin-top: 3px;
        font-size: 10px;
        line-height: 1.5;
        color: #64748b;
        word-break: break-word;
      }

      .qty-cell {
        text-align: center;
        font-size: 12px;
      }

      .price-cell {
        text-align: right;
        font-size: 11px;
        white-space: nowrap;
      }

      .subtotal-cell {
        text-align: right;
        font-size: 11px;
        font-weight: 700;
        color: #172554;
        white-space: nowrap;
      }

      .summary-box {
        background: #f8fafc;
        border-radius: 12px;
        padding: 14px 16px;
        margin-bottom: 8px;
      }

      .summary-label {
        padding: 4px 0;
        color: #64748b;
        font-size: 12px;
      }

      .summary-value {
        padding: 4px 0;
        text-align: right;
        color: #1e293b;
        font-size: 12px;
        font-weight: 600;
      }

      .summary-total-label,
      .summary-total-value {
        padding: 10px 0 4px;
        border-top: 2px solid #dbeafe;
        color: #172554;
        font-size: 16px;
        font-weight: 700;
      }

      .summary-total-value {
        text-align: right;
        white-space: nowrap;
      }

      .pdf-note {
        text-align: center;
        color: #64748b;
        font-size: 11px;
        margin-top: 14px;
        line-height: 1.5;
      }

      .footer {
        text-align: center;
        color: #94a3b8;
        font-size: 11px;
        line-height: 1.5;
        margin-top: 16px;
        padding: 0 8px;
      }

      @media only screen and (max-width: 600px) {
        .wrapper {
          padding: 10px 6px !important;
        }

        .header {
          padding: 16px 12px !important;
          border-radius: 12px 12px 0 0 !important;
        }

        .header-title {
          font-size: 18px !important;
        }

        .header-subtitle {
          font-size: 11px !important;
        }

        .card {
          padding: 14px 10px !important;
          border-radius: 0 0 12px 12px !important;
        }

        .section-title {
          font-size: 13px !important;
          margin-bottom: 10px !important;
        }

        .label,
        .value,
        .payment-text,
        .summary-label,
        .summary-value {
          font-size: 11px !important;
        }

        .items-head th {
          padding: 8px 6px !important;
          font-size: 9px !important;
        }

        .cell {
          padding: 8px 6px !important;
        }

        .product-name {
          font-size: 11px !important;
        }

        .product-meta {
          font-size: 9px !important;
        }

        .qty-cell,
        .price-cell,
        .subtotal-cell {
          font-size: 10px !important;
        }

        .summary-box {
          padding: 12px !important;
        }

        .summary-total-label,
        .summary-total-value {
          font-size: 14px !important;
        }

        .pdf-note,
        .footer {
          font-size: 10px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">

        <div class="header">
          <h1 class="header-title">Nouvelle commande reçue</h1>
          <p class="header-subtitle">
            Code commande : <strong style="color:#ffffff;">${orderCode}</strong>
          </p>
        </div>

        <div class="card">

          <h2 class="section-title">Informations client</h2>
          <table class="info-table">
            <tr>
              <td class="label">Nom</td>
              <td class="value">${customer.firstName} ${customer.lastName}</td>
            </tr>
            <tr>
              <td class="label">Téléphone</td>
              <td class="value">${customer.phone || "—"}</td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td class="value">${customer.email || "—"}</td>
            </tr>
          </table>

          <h2 class="section-title">Adresse de livraison</h2>
          <table class="info-table">
            <tr>
              <td class="label">Wilaya</td>
              <td class="value">${shipping.wilaya}</td>
            </tr>
            <tr>
              <td class="label">Ville</td>
              <td class="value">${shipping.city}</td>
            </tr>
            <tr>
              <td class="label">Rue</td>
              <td class="value">${shipping.street || "—"}</td>
            </tr>
            ${
              shipping.mapLink
                ? `<tr>
                    <td class="label">Localisation</td>
                    <td class="value">
                      <a href="${shipping.mapLink}" style="color:#2563eb;text-decoration:underline;">
                        Ouvrir dans Maps
                      </a>
                    </td>
                  </tr>`
                : ""
            }
          </table>

          <h2 class="section-title">Paiement</h2>
          <p class="payment-text">
            ${paymentMethodLabel}
            <span class="muted"> · Statut : </span>
            <span class="status">${paymentStatusLabel}</span>
          </p>

          <h2 class="section-title">Articles commandés</h2>
          <table class="items-table">
            <thead class="items-head">
              <tr>
                <th class="th-product">Produit</th>
                <th class="th-qty">Qté</th>
                <th class="th-price">Prix</th>
                <th class="th-subtotal">Sous-total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <div class="summary-box">
            <table>
              <tr>
                <td class="summary-label">Nombre d’articles</td>
                <td class="summary-value">${summary.itemsCount}</td>
              </tr>
              <tr>
                <td class="summary-label">Quantité totale</td>
                <td class="summary-value">${summary.totalQuantity}</td>
              </tr>
              <tr>
                <td class="summary-total-label">Prix total</td>
                <td class="summary-total-value">${formatPrice(summary.totalPrice)}</td>
              </tr>
            </table>
          </div>

          ${
            pdfBuffer
              ? '<p class="pdf-note">Facture PDF jointe à cet email</p>'
              : ""
          }
        </div>

        <p class="footer">
          Empreinte Flex · Notification de commande
        </p>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"Empreinte Flex" <${process.env.EMAIL_USER}>`,
    to: process.env.ORDER_EMAIL,
    subject: `Nouvelle commande — ${orderCode} | ${customer.firstName} ${customer.lastName}`,
    html,
  };

  if (pdfBuffer) {
    mailOptions.attachments = [
      {
        filename: `facture-${orderCode}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];
  }

  try {
    console.log("[Email] Envoi de la notification de commande...");
    const info = await transporter.sendMail(mailOptions);
    console.log("[Email] ✓ Email envoyé :", info.messageId);
  } catch (error) {
    console.error("[Email] ✗ Échec d’envoi :", error.message);
    throw error;
  }
}
