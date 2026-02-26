import { getTranslations } from "@/lib/i18n";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({ params }) {
  const { local } = await params;
  const { checkoutPage } = getTranslations(local);

  return <CheckoutClient locale={local} translation={checkoutPage} />;
}
