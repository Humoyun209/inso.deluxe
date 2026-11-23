import InsopharmHomepage from '@/components/InsopharmHomepage';
import InsoHomeLoader from '@/components/InsoHomeLoader';

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ lang?: string; hero?: string }> }) {
  const { lang, hero } = await searchParams;
  const mode = hero === 'animated' || hero === 'static' ? hero : process.env.INSO_HERO_MODE;
  const initialLang = lang === 'en' || lang === 'uz' ? lang : 'ru';
  return (
    <>
      <InsoHomeLoader lang={initialLang} />
      <InsopharmHomepage initialLang={initialLang} animatedHero={mode === 'animated'}
        directMail={Boolean(process.env.RESEND_API_KEY && process.env.INSO_CONTACT_FROM)} />
    </>
  );
}

