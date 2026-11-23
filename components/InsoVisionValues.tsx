import { CORE_VALUES, type Language } from '@/lib/insopharm-data';

const vision = {
  ru: {
    label: 'Наше видение · 2029',
    lead: 'Стать партнёром первого выбора для фармпроизводителей на рынках',
    region: 'Центральной Азии',
    end: '.',
    values: 'Наши ценности',
  },
  uz: {
    label: 'Maqsadimiz · 2029',
    lead: 'Dori vositalarini',
    region: 'Markaziy Osiyo',
    end: ' bozorlariga olib chiqayotgan ishlab chiqaruvchilar uchun birinchi tanlov boʻlish.',
    values: 'Qadriyatlarimiz',
  },
  en: {
    label: 'Our vision · 2029',
    lead: 'To be the first choice for manufacturers bringing medicines to',
    region: 'Central Asia',
    end: '.',
    values: 'Our values',
  },
};

export default function InsoVisionValues({ lang, onToggleSubbrands }: {
  lang: Language;
  onToggleSubbrands: () => void;
}) {
  const copy = vision[lang];
  return (
    <section id="values" aria-labelledby="vision-title" className="inso-vision scroll-mt-18 text-[#183f48]">
      <div className="mx-auto max-w-[1280px] px-4 pt-14 pb-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="vision-reveal max-w-[58rem]">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#286e65]">
            <span aria-hidden="true" className="h-px w-8 bg-teal-600" />{copy.label}
          </p>
          <h2 id="vision-title" className="text-balance text-[clamp(1.85rem,3.6vw,3.5rem)] leading-[1.12] font-medium tracking-tight">
            {copy.lead}{' '}<em className="font-serif font-normal text-[#286e65]">{copy.region}</em>{copy.end}
          </h2>
        </div>
        <h3 className="mt-10 mb-3 text-xl font-semibold sm:mt-14 sm:mb-4 sm:text-2xl">{copy.values}</h3>
        <dl className="grid gap-x-14 md:grid-cols-2">
          {CORE_VALUES.map(value => (
            <div key={value.id} className="vision-reveal border-t border-[#c8dcd4] py-4 sm:py-5"
              onDoubleClick={value.id === 'ownership' ? onToggleSubbrands : undefined}>
              <dt className="text-lg font-semibold tracking-tight text-[#0b3b60] sm:text-xl">{value.title[lang]}</dt>
              <dd className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-slate-600 sm:text-base">{value.summary[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
