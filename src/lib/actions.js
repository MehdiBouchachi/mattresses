"use server";

import { revalidatePath } from "next/cache";

import {
  getProducts,
  getProductBySlug,
} from "@/lib/data-services/products";

import {
  findOrderByCode,
  getOrder,
  getOrders,
  createOrder,
} from "@/lib/data-services/orders";

// ─────────────────────────────────────────────
// PRODUCT ACTIONS
// ─────────────────────────────────────────────

export async function getProductsAction(filters = {}) {
  try {
    const products = await getProducts(filters);
    return products;
  } catch (error) {
    console.error("[getProductsAction]", error.message);
    throw new Error(error.message);
  }
}

export async function getProductAction(slug) {
  try {
    const product = await getProductBySlug(slug);
    return product;
  } catch (error) {
    console.error("[getProductAction]", error.message);
    throw new Error(error.message);
  }
}

// ─────────────────────────────────────────────
// ORDER ACTIONS
// ─────────────────────────────────────────────

export async function trackOrderAction(orderCode) {
  try {
    const order = await findOrderByCode(orderCode);
    return order;
  } catch (error) {
    console.error("[trackOrderAction]", error.message);
    throw new Error(error.message);
  }
}

export async function getOrderAction(orderCode) {
  try {
    const order = await getOrder(orderCode);
    return order;
  } catch (error) {
    console.error("[getOrderAction]", error.message);
    throw new Error(error.message);
  }
}

export async function getOrdersAction() {
  try {
    const orders = await getOrders();
    return orders;
  } catch (error) {
    console.error("[getOrdersAction]", error.message);
    throw new Error(error.message);
  }
}

export async function checkoutOrderAction(orderData) {
  try {
    const result = await createOrder(orderData);

    if (!result.success) {
      throw new Error(result.error || "Failed to create order");
    }

    revalidatePath("/[locale]/order-success");
    revalidatePath("/[locale]/track-order");

    return {
      success: true,
      orderCode: result.orderCode,
    };
  } catch (error) {
    console.error("[checkoutOrderAction]", error.message);
    throw new Error(error.message);
  }
}