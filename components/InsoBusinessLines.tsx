'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SUBBRANDS, type Language, type SubbrandId } from '@/lib/insopharm-data';

const role: Record<SubbrandId, Record<Language, string>> = {
  inom: {
    ru: 'Рецептурные и безрецептурные препараты для аптек и стационаров, а также нутрицевтическая линейка.',
    uz: 'Dorixonalar va shifoxonalar uchun retseptli hamda retseptsiz dorilar, shuningdek nutritsevtik vositalar.',
    en: 'Prescription and OTC medicines for community pharmacies and hospitals, plus nutraceutical lines.',
  },
  hb: {
    ru: 'Оригинальные препараты для кардиологии, неврологии и парентерального питания.',
    uz: 'Kardiologiya, nevrologiya va parenteral oziqlantirish uchun original preparatlar.',
    en: 'Original formulations for cardiology, neurology, and clinical parenteral nutrition.',
  },
  lps: {
    ru: 'Госпитальные антибиотики, инъекционные и инфузионные растворы для отделений реанимации.',
    uz: 'Reanimatsiya va shifoxonalar uchun gospital antibiotiklar, inyeksiya va infuzion eritmalar.',
    en: 'Hospital-grade antibiotics, critical care injectables, and advanced infusion solutions.',
  },
  greenwell: {
    ru: 'Премиальная американская линейка биологически активных добавок с технологией Vitaprotein®.',
    uz: 'Vitaprotein® texnologiyasiga ega AQShda ishlab chiqarilgan premium BFQ biologik faol qoʻshimchalari.',
    en: 'Premium US dietary supplements manufactured with patented Vitaprotein® absorption technology.',
  },
  nl: {
    ru: 'Оптовый импорт, лицензированное GDP-хранение и экспресс-доставка по 13 регионам Узбекистана.',
    uz: 'Ulgurji import, litsenziyalangan GDP omborxonalari va 13 ta hudud boʻylab tezkor taʼminot.',
    en: 'Licensed wholesale import, GDP cold-chain warehousing, and rapid dispatch across 13 regions.',
  },
  service: {
    ru: 'Поиск перспективных молекул, разработка CTD-досье, клинические испытания и регистрация под ключ.',
    uz: 'Istiqbolli molekulalarni topish, CTD-hujjatlarni tayyorlash, klinik sinovlar va toʻliq roʻyxatdan oʻtkazish.',
    en: 'Target molecule sourcing, CTD dossier authoring, clinical trials coordination, and turnkey registration.',
  },
};

const copy = {
  ru: {
    badge: '04 · НАПРАВЛЕНИЯ И СУББРЕНДЫ',
    titleMain: 'Шесть специализированных',
    titleAccent: 'направлений',
    subtitle:
      'Полный замкнутый цикл: от поиска молекул и государственной регистрации до полевой медпромоции и дистрибуции.',
    catalog: 'Каталог бренда',
    delivery: 'Обсудить поставки',
    registration: 'Обсудить регистрацию',
  },
  uz: {
    badge: '04 · YOʻNALISHLAR VA SUB-BRENDLAR',
    titleMain: 'Oltita ixtisoslashgan',
    titleAccent: 'yoʻnalish',
    subtitle:
      'Toʻliq yopiq sikl: molekula izlash va davlat roʻyxatidan oʻtkazishdan tortib, tibbiy targʻibot va distribyutsiyagacha.',
    catalog: 'Brend katalogi',
    delivery: 'Yetkazishni muhokama qilish',
    registration: 'Roʻyxatdan oʻtkazishni muhokama qilish',
  },
  en: {
    badge: '04 · BUSINESS LINES & SUB-BRANDS',
    titleMain: 'Six Dedicated',
    titleAccent: 'Business Lines',
    subtitle:
      'A complete integrated pharma ecosystem: from molecule scouting and market authorization to ethical promotion and logistics.',
    catalog: 'Brand catalog',
    delivery: 'Discuss distribution',
    registration: 'Discuss registration',
  },
};

export default function InsoBusinessLines({ lang }: { lang: Language }) {
  const t = copy[lang];

  return (
    <section
      id="subbrands"
      aria-labelledby="subbrands-heading"
      className="scroll-mt-20 pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 lg:pb-20 text-slate-900 relative"
    >
      <div id="brands" className="absolute -top-20" />
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-14">
        {/* Section Header (Swiss Editorial Typography) */}
        <div className="max-w-3xl space-y-3">
          <div className="hero-eyebrow text-xs font-semibold text-[#30665e] uppercase tracking-[0.16em]">
            <span>{t.badge}</span>
          </div>

          <h2
            id="subbrands-heading"
            className="text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-tight text-slate-900 leading-[1.12] text-balance"
          >
            {t.titleMain}{' '}
            <em className="font-serif italic font-normal text-[#26736f]">
              {t.titleAccent}
            </em>
          </h2>

          <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Business Lines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {SUBBRANDS.map((brand, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={brand.id}
                className="border-t border-slate-200 pt-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#185d53]/70 tabular-nums">
                      {num}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      INSO GROUP
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    {brand.name}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">
                    {role[brand.id][lang]}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
                  {brand.id !== 'service' && (
                    <Link
                      href={`/portfolio?subbrand=${brand.id}&lang=${lang}`}
                      className="inline-flex items-center gap-1 text-[#185d53] hover:text-[#0f3d36] transition-colors"
                    >
                      <span>{t.catalog}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {(brand.id === 'nl' || brand.id === 'service') && (
                    <a
                      href={brand.id === 'nl' ? 'mailto:sales@inso.uz' : 'mailto:registration@inso.uz'}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 transition-colors"
                    >
                      <span>{brand.id === 'nl' ? t.delivery : t.registration}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
