import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SUBBRANDS, type Language, type SubbrandId } from '@/lib/insopharm-data';

const role: Record<SubbrandId, Record<Language, string>> = {
  inom: {
    ru: 'Лекарства для аптек и стационаров, а также пищевые добавки.',
    uz: 'Dorixonalar va shifoxonalar uchun dorilar hamda biologik faol qoʻshimchalar.',
    en: 'Medicines for pharmacies and hospitals, plus dietary supplements.',
  },
  hb: {
    ru: 'Препараты для кардиологии, неврологии и парентерального питания.',
    uz: 'Kardiologiya, nevrologiya va parenteral oziqlantirish uchun preparatlar.',
    en: 'Medicines for cardiology, neurology and parenteral nutrition.',
  },
  lps: {
    ru: 'Инъекционные и инфузионные препараты для стационаров и реанимации.',
    uz: 'Shifoxonalar va reanimatsiya uchun inyeksiya va infuziya preparatlari.',
    en: 'Injectable medicines and infusions for hospitals and intensive care.',
  },
  greenwell: {
    ru: 'Американская линейка пищевых добавок с витаминами и минералами.',
    uz: 'AQShda ishlab chiqarilgan vitamin va mineralli biologik faol qoʻshimchalar.',
    en: 'A US dietary supplement brand with a range of vitamins and minerals.',
  },
  nl: {
    ru: 'Импорт, складское хранение и доставка лекарств по Узбекистану.',
    uz: 'Dorilarni import qilish, omborda saqlash va Oʻzbekiston boʻylab yetkazib berish.',
    en: 'Pharmaceutical imports, warehousing and delivery across Uzbekistan.',
  },
  service: {
    ru: 'Поиск молекул, подготовка досье и регистрация препаратов.',
    uz: 'Molekulalarni izlash, hujjatlar toʻplamini tayyorlash va dorilarni roʻyxatdan oʻtkazish.',
    en: 'Molecule sourcing, dossier preparation and product registration.',
  },
};

export default function InsoBusinessLines({ lang }: { lang: Language }) {
  const copy = {
    ru: { title: 'Направления холдинга', catalog: 'Каталог бренда', delivery: 'Обсудить поставки', registration: 'Обсудить регистрацию' },
    uz: { title: 'Xolding yoʻnalishlari', catalog: 'Brend katalogi', delivery: 'Yetkazib berishni muhokama qilish', registration: 'Roʻyxatdan oʻtkazishni muhokama qilish' },
    en: { title: 'Our business lines', catalog: 'Brand catalogue', delivery: 'Discuss distribution', registration: 'Discuss registration' },
  }[lang];

  return (
    <section id="subbrands" aria-labelledby="subbrands-heading" className="scroll-mt-18 text-[#183f48]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h2 id="subbrands-heading" className="vision-reveal mb-6 text-3xl font-semibold tracking-tight sm:mb-8 sm:text-[38px]">{copy.title}</h2>
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUBBRANDS.map(brand => (
            <li key={brand.id} className="vision-reveal flex flex-col items-start border-t border-[#bfd5cd] pt-4">
              <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-semibold tracking-tight">{brand.name}</h3>
              <p className="mb-4 mt-2 max-w-[42ch] text-[16px] sm:text-[17px] leading-relaxed text-slate-600">{role[brand.id][lang]}</p>
              <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-semibold text-[#235f57]">
                {brand.id !== 'service' && (
                  <Link href={`/portfolio?subbrand=${brand.id}&lang=${lang}`} className="inline-flex items-center gap-1 py-1 underline-offset-4 hover:underline">
                    {copy.catalog}<ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
                {(brand.id === 'nl' || brand.id === 'service') && (
                  <a href={brand.id === 'nl' ? 'mailto:sales@inso.uz' : 'mailto:registration@inso.uz'} className="inline-flex items-center gap-1 py-1 underline-offset-4 hover:underline">
                    {brand.id === 'nl' ? copy.delivery : copy.registration}<ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
