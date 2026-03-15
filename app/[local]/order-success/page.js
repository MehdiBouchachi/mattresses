import { getTranslations } from "@/lib/i18n";
import { getOrderByCodeAction } from "@/lib/actions";
import { cookies } from "next/headers";
import OrderSuccessClient from "./OrderSuccessClient";

export default async function OrderSuccessPage({ params }) {
  const { local } = await params;
  const { orderSuccessPage } = getTranslations(local);

  return <OrderSuccessClient locale={local} translation={orderSuccessPage} />;
}
