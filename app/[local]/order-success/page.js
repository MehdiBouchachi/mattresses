import { getTranslations } from "@/lib/i18n";
import OrderSuccessClient from "./OrderSuccessClient";

async function OrderSuccessPage({ params }) {
  const { local } = await params;
  const { orderSuccessPage } = getTranslations(local);
  return <OrderSuccessClient locale={local} translation={orderSuccessPage} />;
}

export default OrderSuccessPage;
