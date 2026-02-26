import { getTranslations } from "@/lib/i18n";
import OrderTrackingClient from "./OrderTrackingClinet";

export default async function Page({ params }) {
  const { local } = await params;

  const translation = getTranslations(local);

  return <OrderTrackingClient translation={translation} locale={local} />;
}
