import InsopharmPortfolioPage from '@/components/InsopharmPortfolioPage';
import { Language } from '@/lib/insopharm-data';

export default async function PortfolioRoute({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; subbrand?: string; lang?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || 'all';
  const initialSubbrand = resolvedParams?.subbrand || 'all';
  const rawLang = resolvedParams?.lang;
  const initialLang: Language =
    rawLang === 'uz' || rawLang === 'en' || rawLang === 'ru' || rawLang === 'zh' ? rawLang : 'ru';

  return (
    <InsopharmPortfolioPage
      initialCategory={initialCategory}
      initialSubbrand={initialSubbrand}
      initialLang={initialLang}
    />
  );
}
