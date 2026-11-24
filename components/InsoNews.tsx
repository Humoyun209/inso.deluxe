'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, X, Clock } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

export interface NewsItem {
  id: string;
  category: Record<Language, string>;
  date: Record<Language, string>;
  readTime: Record<Language, string>;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  paragraphs: Record<Language, string[]>;
  image: string;
  imageAlt: Record<Language, string>;
}

export const INSO_NEWS: NewsItem[] = [
  {
    id: 'gdp-hub-expansion',
    category: {
      ru: 'Инфраструктура и логистика',
      uz: 'Infratuzilma va logistika',
      en: 'Infrastructure & Logistics',
    },
    date: {
      ru: '18 ноября 2026',
      uz: '18-noyabr, 2026',
      en: 'November 18, 2026',
    },
    readTime: {
      ru: '3 мин',
      uz: '3 daq',
      en: '3 min',
    },
    image: '/assets/pharma/sklad-3.webp',
    imageAlt: {
      ru: 'Вторая очередь центрального GDP-комплекса INSO Group',
      uz: 'INSO Group markaziy GDP majmuasining ikkinchi navbati',
      en: 'Phase II of INSO Group Central GDP Logistics Complex',
    },
    title: {
      ru: 'INSO Group завершил ввод второй очереди центрального GDP-комплекса в Ташкенте',
      uz: 'INSO Group Toshkentdagi markaziy GDP majmuasining ikkinchi navbatini ishga tushirdi',
      en: 'INSO Group Commissions Phase II of Central GDP Logistics Complex in Tashkent',
    },
    summary: {
      ru: 'В эксплуатацию введены дополнительные 3 500 м² кондиционируемых зон с автоматическим контролем холодовой цепи (+2…+8 °C) и партионным учётом WMS.',
      uz: 'Uzluksiz sovuqlik zanjiri (+2…+8 °C) va avtomatlashtirilgan WMS partiya nazoratiga ega qoʻshimcha 3 500 m² ombor maydoni foydalanishga topshirildi.',
      en: 'An additional 3,500 m² of climate-controlled warehouse capacity featuring continuous cold-chain monitoring (+2…+8 °C) and full WMS batch tracking is now operational.',
    },
    paragraphs: {
      ru: [
        'В рамках долгосрочной программы развития фармацевтической инфраструктуры Узбекистана холдинг INSO Group завершил строительство и комплексное тестирование второй очереди центрального складского комплекса в Ташкенте.',
        'Новый корпус оснащён немецкими энергоэффективными холодильными установками с тройным резервированием питания и сертифицированными термодатчиками, непрерывно транслирующими телеметрию в диспетчерский контур.',
        'Все технологические операции на комплексе на 100% интегрированы с национальной системой цифровой маркировки Asl Belgisi и международными регламентами Good Distribution Practice (GDP WHO), гарантируя надёжное хранение вакцин, биопрепаратов и термолабильных лекарств.',
      ],
      uz: [
        'Oʻzbekiston farmatsevtika infratuzilmasini rivojlantirish boʻyicha uzoq muddatli investitsiya dasturi doirasida INSO Group Toshkentdagi markaziy ombor majmuasining ikkinchi navbatini toʻliq foydalanishga topshirdi.',
        'Yangi bino uch bosqichli elektr zaxirasiga ega nemis sovitish uskunalari va harorat parametrlarini (+2…+8 °C hamda +15…+25 °C) uzluksiz uzatuvchi sertifikatlangan datchiklar bilan jihozlangan.',
        'Majmuadagi barcha texnologik jarayonlar «Asl Belgisi» milliy raqamli markirovkalash tizimi va Jahon sogʻliqni saqlash tashkilotining GDP standartlariga toʻliq moslashtirilgan.',
      ],
      en: [
        'As part of its multi-year logistics infrastructure program, INSO Group has commissioned Phase II of its central pharmaceutical warehouse complex in Tashkent.',
        'The newly built facility features high-efficiency German refrigeration systems with triple-redundant power backup and calibrated thermal sensors transmitting real-time telemetry to dispatchers.',
        'All receiving, storing, and shipping operations are fully integrated with the national Asl Belgisi serialization database and WHO Good Distribution Practice requirements, ensuring safe handling of vaccines and biologicals.',
      ],
    },
  },
  {
    id: 'european-partnerships',
    category: {
      ru: 'Международные соглашения',
      uz: 'Xalqaro shartnomalar',
      en: 'Global Partnerships',
    },
    date: {
      ru: '4 ноября 2026',
      uz: '4-noyabr, 2026',
      en: 'November 4, 2026',
    },
    readTime: {
      ru: '2 мин',
      uz: '2 daq',
      en: '2 min',
    },
    image: '/assets/photos/partner-meeting.jpg',
    imageAlt: {
      ru: 'Подписание соглашений с европейскими фармацевтическими партнерами',
      uz: 'Yevropa farmatsevtika hamkorlari bilan bitimlar imzolanishi',
      en: 'Signing ceremonies with European pharmaceutical manufacturers',
    },
    title: {
      ru: 'Подписаны прямые дистрибьюторские контракты с 12 европейскими производителями',
      uz: 'Yevropaning 12 ta ishlab chiqaruvchisi bilan toʻgʻridan-toʻgʻri shartnomalar imzolandi',
      en: 'Direct Distribution Agreements Signed with 12 European Pharma Manufacturers',
    },
    summary: {
      ru: 'Холдинг расширяет терапевтический портфель в направлениях кардиологии, онкологии и неврологии с поставками в 13 регионов страны.',
      uz: 'Xolding kardiologiya, onkologiya va nevrologiya yoʻnalishlaridagi dori portfelini kengaytirib, 13 ta hududga taʼminotni boshlaydi.',
      en: 'The holding expands its therapeutic portfolio across cardiology, oncology, and neurology, establishing supply lines across all 13 regions of Uzbekistan.',
    },
    paragraphs: {
      ru: [
        'INSO Group заключил серию долгосрочных эксклюзивных соглашений о представлении интересов и дистрибуции лекарственных средств ведущих производителей из Германии, Италии и Швейцарии.',
        'Контракты охватывают регистрационное сопровождение, продвижение этических препаратов, работу с медицинским сообществом и гарантированные регулярные поставки в клинические центры и аптечные сети.',
        'Первые партии сертифицированных европейских препаратов поступят в дистрибьюторскую сеть холдинга в первом квартале 2027 года.',
      ],
      uz: [
        'INSO Group Germaniya, Italiya va Shveysariyaning yetakchi farmatsevtika korxonalari bilan uzoq muddatli eksklyuziv hamkorlik shartnomalarini imzoladi.',
        'Bitimlar davlat roʻyxatidan oʻtkazish, tibbiy targʻibot, soha mutaxassislari bilan hamkorlik hamda klinika va dorixonalarga uzluksiz yetkazib berishni oʻz ichiga oladi.',
        'Sertifikatlangan dori vositalarining dastlabki partiyalari 2027-yilning birinchi choragida Oʻzbekiston bozoriga yetkaziladi.',
      ],
      en: [
        'INSO Group has concluded multi-year exclusive distribution agreements with respected pharmaceutical manufacturers from Germany, Italy, and Switzerland.',
        'The scope covers regulatory filings, ethical medical marketing, scientific engagement, and verified logistics into hospitals and community pharmacies.',
        'Initial commercial shipments of certified European medicines are scheduled for release across Uzbekistan in Q1 2027.',
      ],
    },
  },
  {
    id: 'who-gdp-recertification',
    category: {
      ru: 'Стандарты качества',
      uz: 'Sifat standartlari',
      en: 'Quality Standards',
    },
    date: {
      ru: '22 октября 2026',
      uz: '22-oktyabr, 2026',
      en: 'October 22, 2026',
    },
    readTime: {
      ru: '4 мин',
      uz: '4 daq',
      en: '4 min',
    },
    image: '/assets/photos/gdp-pallet-amgv.jpg',
    imageAlt: {
      ru: 'Фармацевтические паллеты с температурным контролем GDP',
      uz: 'GDP harorat nazoratiga ega farmatsevtika partiyalari',
      en: 'Pharmaceutical pallets with GDP validated thermal logging',
    },
    title: {
      ru: 'Холдинг успешно прошёл ежегодный аудит соответствия стандартам GDP WHO',
      uz: 'Xolding JSSTning GDP sifat standartlariga muvofiqlik boʻyicha yillik auditidan muvaffaqiyatli oʻtdi',
      en: 'INSO Group Successfully Passes Annual WHO GDP Re-certification Audit',
    },
    summary: {
      ru: 'Независимая инспекция подтвердила нулевой уровень отклонений в процедурах хранения вакцин, термовалидации и электронного трекинга партий.',
      uz: 'Mustaqil nazorat vaksinalarni saqlash, harorat validatsiyasi va partiyalarni elektron kuzatish boʻyicha nol tafovutni tasdiqladi.',
      en: 'Independent inspection verified zero critical deviations across cold-chain validation, biopharmaceutical storage, and electronic batch tracing.',
    },
    paragraphs: {
      ru: [
        'Фармацевтическая логистическая инфраструктура INSO Group успешно подтвердила соответствие требованиям надлежащей дистрибьюторской практики (Good Distribution Practice WHO).',
        'В ходе всестороннего аудита инспекторы провели детальную проверку температурных карт складских помещений, процедур калибровки датчиков и регламентов экстренного реагирования при сбоях внешней энергосети.',
        'Подтверждённый статус гарантирует партнерам абсолютную сохранность терапевтической эффективности препаратов на всём пути от завода-производителя до конечного пациента.',
      ],
      uz: [
        'INSO Group farmatsevtika logistika tizimi Jahon sogʻliqni saqlash tashkilotining Good Distribution Practice (GDP) qoidalariga toʻliq muvofiqligini yana bir bor isbotladi.',
        'Keng qamrovli audit davomida omborxonalar harorat xaritalari, datchiklarni kalibrlash tartibi va favqulodda vaziyatlarda zaxira quvvat tizimlarining ishlashi sinchiklab tekshirildi.',
        'Tasdiqlangan sertifikat barcha ishlab chiqaruvchilarga dori vositalarining zavoddan to bemorgacha boʻlgan yoʻlida sifat va samaradorlik toʻliq saqlanishini kafolatlaydi.',
      ],
      en: [
        'INSO Group’s pharmaceutical distribution network has re-confirmed full compliance with World Health Organization Good Distribution Practice (GDP) standards.',
        'During the comprehensive inspection, evaluators verified thermal mapping consistency, sensor calibration logs, and emergency protocol response times.',
        'This reaffirmation provides global manufacturing partners with absolute assurance regarding drug efficacy and patient safety across the supply chain.',
      ],
    },
  },
];

const copy = {
  ru: {
    badge: '07 · НОВОСТИ И ПРЕСС-ЦЕНТР',
    titleMain: 'События и развитие',
    titleAccent: 'холдинга',
    subtitle:
      'Актуальная информация о расширении инфраструктуры, новых международных соглашениях и регуляторных аудитах INSO Group.',
    readMore: 'Читать полностью',
    closeModal: 'Закрыть',
  },
  uz: {
    badge: '07 · YANGILIKLAR VA MATBUOT MARKAZI',
    titleMain: 'Xoldingning muhim voqealari va',
    titleAccent: 'rivojlanishi',
    subtitle:
      'INSO Group infratuzilmasini kengaytirish, yangi xalqaro shartnomalar va sifat auditi boʻyicha rasmiy yangiliklar.',
    readMore: 'Batafsil oʻqish',
    closeModal: 'Yopish',
  },
  en: {
    badge: '07 · NEWS & MEDIA CENTER',
    titleMain: 'Corporate News &',
    titleAccent: 'Milestones',
    subtitle:
      'Official updates on infrastructure expansion, global manufacturer agreements, and regulatory audits across INSO Group.',
    readMore: 'Read Full Story',
    closeModal: 'Close',
  },
};

export default function InsoNews({ lang }: { lang: Language }) {
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const t = copy[lang];

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeArticle]);

  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="scroll-mt-20 pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 lg:pb-20 text-slate-900"
    >
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-14">
        {/* =================================================================
            1. SECTION HEADER (Consistent Swiss Editorial Typography)
           ================================================================= */}
        <div className="max-w-3xl space-y-3">
          <div className="hero-eyebrow text-xs font-semibold text-[var(--inso-badge-color)] uppercase tracking-[0.16em]">
            <span>{t.badge}</span>
          </div>

          <h2
            id="news-title"
            className="text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-tight text-slate-900 leading-[1.12] text-balance"
          >
            {t.titleMain}{' '}
            <em className="font-serif italic font-normal text-[var(--inso-accent-italic)]">
              {t.titleAccent}
            </em>
          </h2>

          <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* =================================================================
            2. 3-COLUMN EDITORIAL NEWS GRID
            - 100% clean photography without HUD overlays or dark badges
            - Strict hierarchy and calm typographic styling
            - Calm, clear "Read more" interaction
           ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {INSO_NEWS.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between cursor-pointer"
              onClick={() => setActiveArticle(item)}
            >
              <div>
                {/* Clean, Unobstructed Photograph */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-4 sm:mb-5">
                  <Image
                    src={item.image}
                    alt={item.imageAlt[lang]}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Meta: Category & Date */}
                <div className="flex items-center justify-between text-xs gap-3">
                  <span className="font-semibold text-[var(--inso-badge-color)] uppercase tracking-wider text-[11px] truncate">
                    {item.category[lang]}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 font-normal shrink-0">
                    <span>{item.date[lang]}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[var(--inso-primary)] transition-colors mt-2.5 line-clamp-2">
                  {item.title[lang]}
                </h3>

                {/* Article Summary */}
                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {item.summary[lang]}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--inso-primary)] group-hover:underline transition-colors cursor-pointer"
                >
                  <span>{t.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3. ACCESSIBLE ARTICLE DETAIL MODAL
         ===================================================================== */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              aria-label={t.closeModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Category & Date */}
            <div className="flex items-center gap-3 text-xs mb-3">
              <span className="font-semibold text-[var(--inso-badge-color)] uppercase tracking-wider text-[11px]">
                {activeArticle.category[lang]}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">{activeArticle.date[lang]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {activeArticle.readTime[lang]}
              </span>
            </div>

            {/* Modal Title */}
            <h3
              id="article-modal-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-5"
            >
              {activeArticle.title[lang]}
            </h3>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-6">
              <Image
                src={activeArticle.image}
                alt={activeArticle.imageAlt[lang]}
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Modal Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {activeArticle.paragraphs[lang].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
