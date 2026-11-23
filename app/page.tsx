import InsopharmHomepage from '@/components/InsopharmHomepage';

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <InsopharmHomepage initialLang={lang === 'en' || lang === 'uz' ? lang : 'ru'}
    directMail={Boolean(process.env.RESEND_API_KEY && process.env.INSO_CONTACT_FROM)} />;
}

