import InsoCareers from '@/components/InsoCareers';

export default async function CareerPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <InsoCareers lang={lang === 'uz' || lang === 'en' || lang === 'zh' ? lang : 'ru'} />;
}
