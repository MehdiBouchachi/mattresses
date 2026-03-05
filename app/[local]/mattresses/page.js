import { getTranslations } from "@/lib/i18n";
import MattressesClient from "./MattressesClient";

export default async function MattressesPage({ params, searchParams }) {
  const { local } = await params;

  const translation = getTranslations(local);
  const resolvedSearchParams = await searchParams;

  return (
    <MattressesClient
      locale={local}
      translation={translation}
      searchParams={resolvedSearchParams}
    />
  );
}
