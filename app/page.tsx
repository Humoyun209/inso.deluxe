import InsopharmHomepage from '@/components/InsopharmHomepage';
import InsoHomeLoader from '@/components/InsoHomeLoader';

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const initialLang = lang === 'en' || lang === 'uz' ? lang : 'ru';
  return (
    <>
      <InsoHomeLoader lang={initialLang} />
      <InsopharmHomepage initialLang={initialLang}
        directMail={Boolean(process.env.RESEND_API_KEY && process.env.INSO_CONTACT_FROM)} />
    </>
  );
}

