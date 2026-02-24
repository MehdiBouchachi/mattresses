import { getTranslations } from "@/lib/i18n";
import MattressesClient from "./MattressesClient";

export default async function MattressesPage({ params }) {
  const { local } = await params;

  const translation = getTranslations(local);

  return <MattressesClient locale={local} translation={translation} />;
}
