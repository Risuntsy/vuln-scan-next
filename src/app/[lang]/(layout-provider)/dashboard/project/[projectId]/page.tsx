import { redirect } from "next/navigation";
import { useLanguageRoute, PROJECT_OVERVIEW_ROUTE } from "#/routes";
import { Locale } from "#/i18n";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string; lang: Locale }> }) {
  const { id, lang } = await params;
  const r = useLanguageRoute(lang);

  redirect(r(PROJECT_OVERVIEW_ROUTE, { params: { id } }));
}
