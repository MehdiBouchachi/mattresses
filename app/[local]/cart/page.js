import { getTranslations } from "@/lib/i18n";
import CartClient from "./CartClient";

export default async function CartPage({ params }) {
  const { local = "en" } = await params;
  const { cartPage } = getTranslations(local);

  return <CartClient locale={local} translation={cartPage} />;
}
