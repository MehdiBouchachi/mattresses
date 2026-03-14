// lib/data-services/orders.js

import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────
// SHARED HELPERS (DRY)
// ─────────────────────────────────────────────

function fullOrderQuery() {
  return supabase.from("orders").select(`
    id,
    order_code,
    status,
    created_at,
    customer:order_customer (
      id,
      first_name,
      last_name,
      email,
      phone
    ),
    shipping:order_shipping (
      id,
      wilaya,
      city,
      street,
      map_link
    ),
    payment:order_payment (
      id,
      method,
      status
    ),
    summary:order_summary (
      id,
      items_count,
      total_quantity,
      total_price
    ),
    items:order_items (
      id,
      product_id,
      name,
      size,
      thickness,
      density,
      price,
      quantity,
      subtotal
    )
  `);
}

function normalizeRelation(data) {
  return Array.isArray(data) ? data[0] : data;
}

function formatFullOrder(order) {
  const customer = normalizeRelation(order.customer);
  const shipping = normalizeRelation(order.shipping);
  const payment = normalizeRelation(order.payment);
  const summary = normalizeRelation(order.summary);
  const items = Array.isArray(order.items) ? order.items : [];

  return {
    id: order.id,
    orderCode: order.order_code,
    status: order.status,
    createdAt: order.created_at,

    customer: customer
      ? {
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          phone: customer.phone,
        }
      : null,

    shipping: shipping
      ? {
          wilaya: shipping.wilaya,
          city: shipping.city,
          street: shipping.street,
          mapLink: shipping.map_link,
        }
      : null,

    payment: payment
      ? {
          method: payment.method,
          status: payment.status,
        }
      : null,

    summary: summary
      ? {
          itemsCount: summary.items_count,
          totalQuantity: summary.total_quantity,
          totalPrice: Number(summary.total_price),
        }
      : null,

    items: items.map((item) => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      size: item.size,
      thickness: item.thickness,
      density: item.density,
      price: Number(item.price),
      quantity: item.quantity,
      subtotal: Number(item.subtotal),
    })),
  };
}

function formatOrderSummary(order) {
  const customer = normalizeRelation(order.customer);
  const summary = normalizeRelation(order.summary);

  return {
    orderCode: order.order_code,
    status: order.status,
    date: order.created_at,
    customer: customer
      ? {
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          phone: customer.phone,
        }
      : null,
    total: summary ? Number(summary.total_price) : 0,
    summary: summary
      ? {
          itemsCount: summary.items_count,
          totalQuantity: summary.total_quantity,
          totalPrice: Number(summary.total_price),
        }
      : null,
  };
}

function generateOrderCode() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `LTM-${random}`;
}

const ORDER_SUMMARY_SELECT = `
  id,
  order_code,
  status,
  created_at,
  customer:order_customer (
    first_name,
    last_name,
    email,
    phone
  ),
  summary:order_summary (
    items_count,
    total_quantity,
    total_price
  )
`;

// ─────────────────────────────────────────────
// EXPORTED SERVICE FUNCTIONS
// ─────────────────────────────────────────────

export async function findOrderByCode(orderCode) {
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SUMMARY_SELECT)
    .eq("order_code", orderCode)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error(error);
    throw new Error("Order could not be found");
  }

  if (!data) return null;

  return formatOrderSummary(data);
}

export async function createOrder(orderData) {
  const {
    customer,
    shipping,
    payment,
    items,
    summary,
    status = "unconfirmed",
  } = orderData;

  if (!customer || !shipping || !items?.length || !summary) {
    throw new Error("Missing required order data");
  }

  const orderCode = generateOrderCode();

  // 1. Insert the order
  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_code: orderCode,
      status,
    })
    .select("id")
    .single();

  if (orderError) {
    console.error(orderError);
    throw new Error("Order could not be created");
  }

  const orderId = orderRow.id;

  // 2. Insert all related records in parallel
  const [
    customerResult,
    shippingResult,
    paymentResult,
    summaryResult,
    itemsResult,
  ] = await Promise.all([
    supabase.from("order_customer").insert({
      order_id: orderId,
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email || null,
      phone: customer.phone || null,
    }),

    supabase.from("order_shipping").insert({
      order_id: orderId,
      wilaya: shipping.wilaya,
      city: shipping.city,
      street: shipping.street || null,
      map_link: shipping.mapLink || null,
    }),

    supabase.from("order_payment").insert({
      order_id: orderId,
      method: payment?.method || "cash_on_delivery",
      status: payment?.status || "pending",
    }),

    supabase.from("order_summary").insert({
      order_id: orderId,
      items_count: summary.itemsCount,
      total_quantity: summary.totalQuantity,
      total_price: summary.totalPrice,
    }),

    supabase.from("order_items").insert(
      items.map((item) => ({
        order_id: orderId,
        product_id: item.productId || null,
        name: item.name,
        size: item.size || null,
        thickness: item.thickness || null,
        density: item.density || null,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
    ),
  ]);

  // 3. Check for errors
  const insertErrors = [
    { name: "customer", ...customerResult },
    { name: "shipping", ...shippingResult },
    { name: "payment", ...paymentResult },
    { name: "summary", ...summaryResult },
    { name: "items", ...itemsResult },
  ].filter((r) => r.error);

  if (insertErrors.length > 0) {
    const messages = insertErrors
      .map((e) => `${e.name}: ${e.error.message}`)
      .join("; ");
    console.error(messages);

    // Clean up orphan order
    await supabase.from("orders").delete().eq("id", orderId);

    throw new Error("Order details could not be created");
  }

  return {
    success: true,
    orderCode,
    orderId,
  };
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SUMMARY_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  if (!data) return [];

  return data.map((order) => {
    const customer = normalizeRelation(order.customer);
    const summary = normalizeRelation(order.summary);

    return {
      id: order.id,
      orderCode: order.order_code,
      status: order.status,
      createdAt: order.created_at,
      customer: customer
        ? {
            firstName: customer.first_name,
            lastName: customer.last_name,
            email: customer.email,
            phone: customer.phone,
          }
        : null,
      totalPrice: summary ? Number(summary.total_price) : 0,
      itemsCount: summary ? summary.items_count : 0,
      totalQuantity: summary ? summary.total_quantity : 0,
    };
  });
}

export async function getOrder(orderCode) {
  const { data, error } = await fullOrderQuery()
    .eq("order_code", orderCode)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error(error);
    throw new Error("Order could not be loaded");
  }

  if (!data) return null;

  return formatFullOrder(data);
}
