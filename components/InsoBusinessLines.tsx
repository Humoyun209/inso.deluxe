'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SUBBRANDS, type Language, type SubbrandId } from '@/lib/insopharm-data';

const role: Record<SubbrandId, Record<Language, string>> = {
  inom: {
    ru: 'Рецептурные и безрецептурные препараты для аптек и стационаров, а также нутрицевтическая линейка.',
    uz: 'Dorixonalar va shifoxonalar uchun retseptli hamda retseptsiz dorilar, shuningdek nutritsevtik vositalar.',
    en: 'Prescription and OTC medicines for community pharmacies and hospitals, plus nutraceutical lines.',
    zh: '面向药房与医疗机构的处方药与非处方药（OTC），以及专业营养素产品线。',
  },
  hb: {
    ru: 'Оригинальные препараты для кардиологии, неврологии и парентерального питания.',
    uz: 'Kardiologiya, nevrologiya va parenteral oziqlantirish uchun original preparatlar.',
    en: 'Original formulations for cardiology, neurology, and clinical parenteral nutrition.',
    zh: '心血管、神经内科及临床肠外营养治疗的原研创新药产品。',
  },
  lps: {
    ru: 'Госпитальные антибиотики, инъекционные и инфузионные растворы для отделений реанимации.',
    uz: 'Reanimatsiya va shifoxonalar uchun gospital antibiotiklar, inyeksiya va infuzion eritmalar.',
    en: 'Hospital-grade antibiotics, critical care injectables, and advanced infusion solutions.',
    zh: '重症监护及急救医疗用高等级抗生素、注射剂与输液制剂系统。',
  },
  greenwell: {
    ru: 'Премиальная американская линейка биологически активных добавок с технологией Vitaprotein®.',
    uz: 'Vitaprotein® texnologiyasiga ega AQShda ishlab chiqarilgan premium BFQ biologik faol qoʻshimchalari.',
    en: 'Premium US dietary supplements manufactured with patented Vitaprotein® absorption technology.',
    zh: '源自美国、采用Vitaprotein®高效吸收专利技术的高端膳食营养补充剂。',
  },
  nl: {
    ru: 'Оптовый импорт, лицензированное GDP-хранение и экспресс-доставка по 13 регионам Узбекистана.',
    uz: 'Ulgurji import, litsenziyalangan GDP omborxonalari va 13 ta hudud boʻylab tezkor taʼminot.',
    en: 'Licensed wholesale import, GDP cold-chain warehousing, and rapid dispatch across 13 regions.',
    zh: '高标准医药批量进口、合规GDP仓储及乌兹别克斯坦13个行政大区高效专线配送。',
  },
  service: {
    ru: 'Поиск перспективных молекул, разработка CTD-досье, клинические испытания и регистрация под ключ.',
    uz: 'Istiqbolli molekulalarni topish, CTD-hujjatlarni tayyorlash, klinik sinovlar va toʻliq roʻyxatdan oʻtkazish.',
    en: 'Target molecule sourcing, CTD dossier authoring, clinical trials coordination, and turnkey registration.',
    zh: '优势药品筛选、CTD格式申报注册卷宗撰写、临床试验协调及全流程准入获批。',
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
  zh: {
    badge: '04 · 业务架构与子品牌',
    titleMain: '六大专业化',
    titleAccent: '核心业务板块',
    subtitle:
      '构建完整闭环医药生态：涵盖全球潜力分子筛选、乌兹别克斯坦注册获批、合规学术推广及全境医药冷链分销。',
    catalog: '品牌产品目录',
    delivery: '洽谈供货配送',
    registration: '洽谈产品注册',
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
          <div className="hero-eyebrow text-xs font-semibold text-[var(--inso-badge-color)] uppercase tracking-[0.16em]">
            <span>{t.badge}</span>
          </div>

          <h2
            id="subbrands-heading"
            className="text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight leading-[1.12] text-balance font-serif italic text-[var(--inso-accent-italic)]"
          >
            <em className="font-serif italic font-normal text-[var(--inso-accent-italic)]">
              {t.titleMain} {t.titleAccent}
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
                    <span className="font-semibold text-[var(--inso-primary)]/80 tabular-nums">
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
                      className="inline-flex items-center gap-1 text-[var(--inso-primary)] hover:underline transition-colors"
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
