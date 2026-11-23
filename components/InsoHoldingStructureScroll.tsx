'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Activity,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck2,
  FlaskConical,
  Globe2,
  HeartPulse,
  Layers,
  Microscope,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  ThermometerSnowflake,
  Truck,
} from 'lucide-react';
import {
  Language,
  SUBBRANDS,
  SubbrandId,
  SubbrandItem,
} from '@/lib/insopharm-data';

interface InsoHoldingStructureScrollProps {
  lang: Language;
}

type DirectionKey = 'distribution' | 'promotion' | 'services';

interface DirectionChapterMeta {
  id: DirectionKey;
  stepNumber: string;
  stageTag: { ru: string; uz: string; en: string };
  title: { ru: string; uz: string; en: string };
  subtitle: { ru: string; uz: string; en: string };
  description: { ru: string; uz: string; en: string };
  keyMetrics: {
    value: { ru: string; uz: string; en: string };
    label: { ru: string; uz: string; en: string };
  }[];
  flowSteps: {
    ru: string[];
    uz: string[];
    en: string[];
  };
  accentGradient: string;
  accentBorder: string;
  accentBadge: string;
  subbrandIds: SubbrandId[];
}

const DIRECTION_CHAPTERS: DirectionChapterMeta[] = [
  {
    id: 'distribution',
    stepNumber: '01',
    stageTag: {
      ru: 'НАПРАВЛЕНИЕ 01 · ПРЯМАЯ GDP-ДИСТРИБУЦИЯ',
      uz: '01-YOʻNALISH · TOʻGʻRIDAN-TOʻGʻRI GDP DISTRIBYUTSIYA',
      en: 'PILLAR 01 · DIRECT GDP DISTRIBUTION',
    },
    title: {
      ru: 'Дистрибуция: от завода до каждой аптеки и клиники',
      uz: 'Distribyutsiya: zavoddan har bir dorixona va klinikagacha',
      en: 'Distribution: From Global Plant to Every Pharmacy & Clinic',
    },
    subtitle: {
      ru: 'Собственный лицензированный склад 10 000 м² по стандарту GDP и рефрижераторный автопарк',
      uz: 'GDP standartidagi 10 000 m² xususiy ombor va refrijerator avtoparki',
      en: 'Proprietary 10,000 m² GDP warehouse complex and temperature-controlled fleet',
    },
    description: {
      ru: 'Доводим препараты и продукты для здоровья от мировых производителей до аптек и стационаров по прямым контрактам: строгий контроль холодовой цепи (+2…+8 °C) и бесперебойная логистика во все регионы страны.',
      uz: 'Preparatlarni ishlab chiqaruvchidan dorixona va shifoxonalargacha toʻgʻridan-toʻgʻri shartnomalar asosida yetkazamiz: sovuq zanjir (+2…+8 °C) nazorati va barcha hududlarga uzluksiz logistika.',
      en: 'We move medicines and health products from global manufacturers directly to pharmacies and hospitals with validated cold-chain (+2…+8 °C) integrity across all regions.',
    },
    keyMetrics: [
      {
        value: {
          ru: '10 000 м²',
          uz: '10 000 m²',
          en: '10,000 m²',
        },
        label: {
          ru: 'склад по стандартам GDP',
          uz: 'GDP standartidagi ombor',
          en: 'GDP warehouse complex',
        },
      },
      {
        value: {
          ru: '+2…+8 °C',
          uz: '+2…+8 °C',
          en: '+2…+8 °C',
        },
        label: {
          ru: 'рефрижераторный автопарк',
          uz: 'refrijerator avtoparki',
          en: 'refrigerated cold chain',
        },
      },
      {
        value: {
          ru: '25 SKU',
          uz: '25 SKU',
          en: '25 SKUs',
        },
        label: {
          ru: 'в прямом дистрибуционном портфеле',
          uz: 'distribyutsiya portfelida',
          en: 'in direct distribution portfolio',
        },
      },
    ],
    flowSteps: {
      ru: [
        'Прямой контракт с заводом',
        'Таможня и GDP-склад 10 000 м²',
        'Холодовая цепь +2…+8 °C',
        'Поставка в аптеки и клиники',
      ],
      uz: [
        'Zavod bilan toʻgʻridan-toʻgʻri shartnoma',
        '10 000 m² GDP ombor',
        'Sovuq zanjir +2…+8 °C',
        'Dorixona va klinikalarga yetkazish',
      ],
      en: [
        'Direct Factory Contract',
        '10,000 m² GDP Hub',
        '+2…+8 °C Cold Fleet',
        'Nationwide Pharmacy Delivery',
      ],
    },
    accentGradient: 'from-[#0B3B60] via-[#0E4D7B] to-[#0D9488]',
    accentBorder: 'border-teal-500/35',
    accentBadge: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
    subbrandIds: ['nl', 'greenwell'],
  },
  {
    id: 'promotion',
    stepNumber: '02',
    stageTag: {
      ru: 'НАПРАВЛЕНИЕ 02 · МЕДИЦИНСКАЯ И АПТЕЧНАЯ ПРОМОЦИЯ',
      uz: '02-YOʻNALISH · TIBBIY VA DORIXONA TARGʻIBOTI',
      en: 'PILLAR 02 · MEDICAL & PHARMACY PROMOTION',
    },
    title: {
      ru: 'Промоция: научная экспертиза в 13 регионах страны',
      uz: 'Targʻibot: mamlakatning 13 ta hududida ilmiy ekspertiza',
      en: 'Promotion: Scientific Detailing Across 13 Regional Offices',
    },
    subtitle: {
      ru: 'Три профильных промоционных субренда — 50 госпитальных, рецептурных и ОТС-препаратов',
      uz: 'Uchta ixtisoslashgan targʻibot sub-brendi — 50 ta gospital, Rx va OTC preparatlar',
      en: 'Three specialized promotional sub-brands covering 50 hospital, Rx, and OTC medicines',
    },
    description: {
      ru: 'Продвигаем препараты среди врачей стационаров, реаниматологов, кардионеврологов и провизоров через собственные команды медицинских представителей в 13 региональных офисах по всему Узбекистану.',
      uz: 'Oʻzbekiston boʻylab 13 ta hududiy ofisdagi tibbiy vakillar jamoalari orqali shifokorlar va farmatsevtlar oʻrtasida preparatlarni targʻib qilamiz.',
      en: 'We build clinical trust among hospital physicians, intensivists, neurologists, and pharmacists via dedicated medical representative teams across 13 regional offices.',
    },
    keyMetrics: [
      {
        value: {
          ru: '13 офисов',
          uz: '13 ta ofis',
          en: '13 offices',
        },
        label: {
          ru: 'региональная сеть медпредставителей',
          uz: 'hududiy tibbiy vakillar tarmogʻi',
          en: 'regional field-force offices',
        },
      },
      {
        value: {
          ru: '50 SKU',
          uz: '50 SKU',
          en: '50 SKUs',
        },
        label: {
          ru: 'препаратов в активной промоции',
          uz: 'faol targʻibotdagi preparatlar',
          en: 'medicines in active promotion',
        },
      },
      {
        value: {
          ru: '3 команды',
          uz: '3 ta jamoa',
          en: '3 teams',
        },
        label: {
          ru: 'узкопрофильных медицинских дивизиона',
          uz: 'ixtisoslashgan tibbiy divizion',
          en: 'specialized therapeutic divisions',
        },
      },
    ],
    flowSteps: {
      ru: [
        'Клинические симпозиумы и круглые столы',
        'Визиты медпредставителей в 13 регионах',
        'Госпитальный и реанимационный сегмент',
        'Обучение провизоров аптечных сетей',
      ],
      uz: [
        'Klinik simpoziumlar va davra suhbatlari',
        '13 hududda tibbiy vakillar tashrifi',
        'Gospital va reanimatsiya segmenti',
        'Dorixona farmatsevtlarini oʻqitish',
      ],
      en: [
        'Clinical Roundtables & CME',
        'Field Detailing in 13 Regions',
        'ICU & Hospital Formulary Access',
        'Retail Pharmacy Education',
      ],
    },
    accentGradient: 'from-indigo-900 via-[#0B3B60] to-sky-700',
    accentBorder: 'border-indigo-400/35',
    accentBadge: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
    subbrandIds: ['inom', 'hb', 'lps'],
  },
  {
    id: 'services',
    stepNumber: '03',
    stageTag: {
      ru: 'НАПРАВЛЕНИЕ 03 · СЕРВИС И КОНСАЛТИНГ ПОД КЛЮЧ',
      uz: '03-YOʻNALISH · SERVIS VA KONSALTING XIZMATLARI',
      en: 'PILLAR 03 · TURNKEY REGULATORY & SOURCING SERVICES',
    },
    title: {
      ru: 'Сервисные услуги: от поиска молекулы до готового продукта',
      uz: 'Servis xizmatlari: molekula izlashdan tayyor mahsulotgacha',
      en: 'Services: From Molecule Scouting to Market-Ready Product',
    },
    subtitle: {
      ru: 'INSO Service — единое окно вывода фармацевтических продуктов на рынок Центральной Азии',
      uz: 'INSO Service — Markaziy Osiyo bozoriga farmatsevtik mahsulotlarni olib kirish markazi',
      en: 'INSO Service — single-window market entry across Uzbekistan & Central Asia',
    },
    description: {
      ru: 'Находим востребованные молекулы у 25+ сертифицированных заводов из 6 стран мира, полностью берём на себя сборку CTD-досье, государственную регистрацию и передаём партнёрам готовый к продажам продукт.',
      uz: '6 mamlakatdagi 25+ zavoddan kerakli molekulalarni topamiz, CTD hujjatlari va davlat roʻyxatidan oʻtkazishni toʻliq rasmiylashtiramiz va hamkorlarga tayyor mahsulotni topshiramiz.',
      en: 'We scout high-demand molecules across 25+ GMP plants in 6 countries, execute full CTD dossier compilation and regulatory registration, and hand over a market-ready product.',
    },
    keyMetrics: [
      {
        value: {
          ru: '25+ заводов',
          uz: '25+ zavod',
          en: '25+ plants',
        },
        label: {
          ru: 'производственных партнёров GMP',
          uz: 'GMP ishlab chiqarish hamkorlari',
          en: 'certified GMP manufacturing plants',
        },
      },
      {
        value: {
          ru: '6 стран',
          uz: '6 mamlakat',
          en: '6 countries',
        },
        label: {
          ru: 'Индия, Китай, Германия, Польша, Корея, РУз',
          uz: 'Hindiston, Xitoy, Germaniya, Polsha, Koreya, OʻzR',
          en: 'India, China, Germany, Poland, Korea, UZ',
        },
      },
      {
        value: {
          ru: 'Под ключ',
          uz: 'Tayyor holda',
          en: 'Turnkey',
        },
        label: {
          ru: 'поиск молекулы + CTD + РУ',
          uz: 'molekula + CTD + guvohnoma',
          en: 'Molecule Scouting + CTD + MA',
        },
      },
    ],
    flowSteps: {
      ru: [
        'Аналитика рынка и подбор молекулы',
        'Аудит и контракт с заводом (25+ площадок)',
        'Сборка CTD-досье и экспертиза в Минздраве',
        'Выдача РУ и запуск коммерческих поставок',
      ],
      uz: [
        'Bozor tahlili va molekula tanlash',
        'Zavod auditi va shartnoma (25+ zavod)',
        'CTD-dosye va ekspertiza',
        'Guvohnoma olish va savdoni boshlash',
      ],
      en: [
        'Market Analytics & Molecule Scouting',
        'GMP Plant Audit & Contracting',
        'CTD Dossier & MoH Registration',
        'Marketing Authorization & Launch',
      ],
    },
    accentGradient: 'from-amber-600 via-[#0B3B60] to-teal-700',
    accentBorder: 'border-amber-400/40',
    accentBadge: 'bg-amber-500/20 text-amber-200 border-amber-400/35',
    subbrandIds: ['service'],
  },
];

const ORDERED_SUBBRAND_IDS: SubbrandId[] = [
  'nl',
  'greenwell',
  'inom',
  'hb',
  'lps',
  'service',
];

const SUBBRAND_EXTENDED_META: Record<
  SubbrandId,
  {
    orderNumber: string;
    skuRatio: number;
    shareLabel: { ru: string; uz: string; en: string };
    origins: { ru: string[]; uz: string[]; en: string[] };
    highlightFact: { ru: string; uz: string; en: string };
    orbitAngle: number;
    ringRadius: number;
    hexColor: string;
  }
> = {
  nl: {
    orderNumber: '01',
    skuRatio: 22,
    shareLabel: {
      ru: '12 препаратов на рынке · +7 в регистрации',
      uz: '12 ta preparat bozorda · +7 tasi roʻyxatdan oʻtmoqda',
      en: '12 marketed SKUs · +7 in registration pipeline',
    },
    origins: {
      ru: ['Европа', 'Индия', 'Китай', 'Узбекистан'],
      uz: ['Yevropa', 'Hindiston', 'Xitoy', 'Oʻzbekiston'],
      en: ['Europe', 'India', 'China', 'Uzbekistan'],
    },
    highlightFact: {
      ru: 'Склад 10 000 м² GDP + собственный рефрижераторный автопарк и 13 офисов',
      uz: '10 000 m² GDP ombor + xususiy refrijerator avtoparki va 13 ta ofis',
      en: '10,000 m² GDP hub + proprietary refrigerated fleet & 13 regional offices',
    },
    orbitAngle: -125,
    ringRadius: 100,
    hexColor: '#38BDF8',
  },
  greenwell: {
    orderNumber: '02',
    skuRatio: 18,
    shareLabel: {
      ru: '13 биоактивных комплексов · 100% натуральный состав',
      uz: '13 ta biofaol kompleks · 100% tabiiy tarkib',
      en: '13 bioactive complexes · 100% natural formulation',
    },
    origins: {
      ru: ['США · Технология Vitaprotein®'],
      uz: ['AQSh · Vitaprotein® texnologiyasi'],
      en: ['USA · Vitaprotein® Technology'],
    },
    highlightFact: {
      ru: 'Американский бренд нутрицевтиков с целевой доставкой активных веществ Vitaprotein®',
      uz: 'Vitaprotein® maqsadli yetkazish texnologiyasiga ega AQSh nutrisevtik brendi',
      en: 'US nutraceutical brand featuring Vitaprotein® targeted bioavailability technology',
    },
    orbitAngle: -55,
    ringRadius: 100,
    hexColor: '#10B981',
  },
  inom: {
    orderNumber: '03',
    skuRatio: 28,
    shareLabel: {
      ru: '21 позиция · Крупнейший портфель группы (28% SKU)',
      uz: '21 pozitsiya · Guruhning eng yirik portfeli (28% SKU)',
      en: '21 SKUs · Largest portfolio in the holding (28% share)',
    },
    origins: {
      ru: ['Германия', 'Польша', 'Южная Корея', 'Индия'],
      uz: ['Germaniya', 'Polsha', 'Janubiy Koreya', 'Hindiston'],
      en: ['Germany', 'Poland', 'South Korea', 'India'],
    },
    highlightFact: {
      ru: 'Синергия госпитальных препаратов (гемостаз, гепатология) и европейских/корейских БАД',
      uz: 'Shifoxona preparatlari va Yevropa/Koreya biofaol qoʻshimchalari sinergiyasi',
      en: 'Synergy of hospital care (haemostasis, hepatology) and German/Korean supplements',
    },
    orbitAngle: 15,
    ringRadius: 100,
    hexColor: '#818CF8',
  },
  hb: {
    orderNumber: '04',
    skuRatio: 25,
    shareLabel: {
      ru: '19 препаратов · Кардионеврология и стационары',
      uz: '19 preparat · Kardionevrologiya va shifoxonalar',
      en: '19 SKUs · Cardio-Neurology & Parenteral Care',
    },
    origins: {
      ru: ['Индия · WHO-GMP', 'Узбекистан'],
      uz: ['Hindiston · WHO-GMP', 'Oʻzbekiston'],
      en: ['India · WHO-GMP', 'Uzbekistan'],
    },
    highlightFact: {
      ru: 'Специализированный фокус на парентеральном питании, инфузиях и анестезиологии',
      uz: 'Parenteral oziqlantirish, infuziyalar va anesteziologiyaga ixtisoslashgan fokus',
      en: 'Specialized focus on parenteral nutrition, amino acid infusions, and anaesthesia',
    },
    orbitAngle: 75,
    ringRadius: 100,
    hexColor: '#2DD4BF',
  },
  lps: {
    orderNumber: '05',
    skuRatio: 14,
    shareLabel: {
      ru: '10 препаратов · Интенсивная терапия и реанимация',
      uz: '10 preparat · Intensiv terapiya va reanimatsiya',
      en: '10 SKUs · Intensive Care & Resuscitation',
    },
    origins: {
      ru: ['Узбекистан', 'Индия', 'Китай'],
      uz: ['Oʻzbekiston', 'Hindiston', 'Xitoy'],
      en: ['Uzbekistan', 'India', 'China'],
    },
    highlightFact: {
      ru: 'Инъекционные и инфузионные решения для отделений реанимации и стационаров',
      uz: 'Reanimatsiya va shifoxona boʻlimlari uchun inyeksiya va infuzion yechimlar',
      en: 'Injectable and infusion critical-care therapies for hospital ICU departments',
    },
    orbitAngle: 135,
    ringRadius: 100,
    hexColor: '#0EA5E9',
  },
  service: {
    orderNumber: '06',
    skuRatio: 100,
    shareLabel: {
      ru: '25+ заводов из 6 стран · Вывод молекул «под ключ»',
      uz: '6 mamlakatdan 25+ zavod · Tayyor mahsulotgacha',
      en: '25+ plants across 6 countries · Turnkey Market Entry',
    },
    origins: {
      ru: ['Индия', 'Китай', 'Германия', 'Польша', 'Южная Корея', 'РУз'],
      uz: ['Hindiston', 'Xitoy', 'Germaniya', 'Polsha', 'Koreya', 'OʻzR'],
      en: ['India', 'China', 'Germany', 'Poland', 'South Korea', 'UZ'],
    },
    highlightFact: {
      ru: 'Самостоятельно находим молекулу, собираем CTD-досье и передаём партнёру готовое РУ',
      uz: 'Molekulani topamiz, CTD hujjatlarni yigʻamiz va tayyor guvohnomani topshiramiz',
      en: 'End-to-end molecule scouting, CTD dossier compilation, and Marketing Authorization',
    },
    orbitAngle: 195,
    ringRadius: 100,
    hexColor: '#F59E0B',
  },
};

export function InsoHoldingStructureScroll({
  lang,
}: InsoHoldingStructureScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeDirection, setActiveDirection] =
    useState<DirectionKey>('distribution');
  const [activeSubbrandId, setActiveSubbrandId] = useState<SubbrandId>('nl');
  const [mobileDirectionFilter, setMobileDirectionFilter] = useState<
    'all' | DirectionKey
  >('all');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ['8%', '100%']);

  const subbrandsMap = React.useMemo(() => {
    const map = {} as Record<SubbrandId, SubbrandItem>;
    for (const item of SUBBRANDS) {
      map[item.id] = item;
    }
    return map;
  }, []);

  // Deterministic clockwise scroll synchronization (01 NL -> 02 GW -> 03 INOM -> 04 HB -> 05 LPS -> 06 SERVICE)
  React.useEffect(() => {
    let rafId: number | null = null;

    const updateActiveOnScroll = () => {
      rafId = null;
      if (window.innerWidth < 1024) return;
      const focalY = window.innerHeight * 0.45;
      let closestId: SubbrandId | null = null;
      let minDistance = Infinity;

      for (const id of ORDERED_SUBBRAND_IDS) {
        const el = document.getElementById(`subbrand-card-${id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const distance =
          focalY >= rect.top && focalY <= rect.bottom
            ? 0
            : Math.min(Math.abs(focalY - rect.top), Math.abs(focalY - rect.bottom));

        if (distance < minDistance) {
          minDistance = distance;
          closestId = id;
        }
      }

      if (closestId) {
        setActiveSubbrandId((prev) => (prev === closestId ? prev : closestId));
        const matchedSb = subbrandsMap[closestId];
        if (matchedSb) {
          setActiveDirection((prev) =>
            prev === matchedSb.directionType ? prev : matchedSb.directionType
          );
        }
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateActiveOnScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [subbrandsMap]);

  const currentChapter =
    DIRECTION_CHAPTERS.find((c) => c.id === activeDirection) ||
    DIRECTION_CHAPTERS[0];
  const currentSubbrand = subbrandsMap[activeSubbrandId] || SUBBRANDS[0];
  const currentExt = SUBBRAND_EXTENDED_META[currentSubbrand.id];

  const scrollToElement = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderSubbrandIcon = (id: SubbrandId, className = 'w-4 h-4') => {
    switch (id) {
      case 'nl':
        return <Truck className={className} />;
      case 'greenwell':
        return <Sparkles className={className} />;
      case 'inom':
        return <Microscope className={className} />;
      case 'hb':
        return <HeartPulse className={className} />;
      case 'lps':
        return <FlaskConical className={className} />;
      case 'service':
        return <FileCheck2 className={className} />;
    }
  };

  const renderMatrixCards = (items: SubbrandItem[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
      {items.map((sb, idx) => {
        const ext = SUBBRAND_EXTENDED_META[sb.id];
        return (
          <motion.div
            key={sb.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#0B3B60] p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_30px_-12px_rgba(15,23,42,0.06)] transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
                    style={{ backgroundColor: ext.hexColor }}
                  >
                    {renderSubbrandIcon(sb.id, 'w-4 h-4')}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-extrabold text-white uppercase tracking-wider"
                    style={{ backgroundColor: ext.hexColor }}
                  >
                    {sb.shortCode}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#0D9488] text-right">
                  {sb.badge[lang]}
                </span>
              </div>

              <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900">
                {sb.name}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sb.description[lang]}
              </p>

              <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'ru'
                    ? 'Терапевтические ниши:'
                    : lang === 'uz'
                    ? 'Terapevtik yoʻnalishlar:'
                    : 'Therapeutic Areas:'}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-700 leading-snug">
                  {sb.therapeuticAreas[lang]}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                  {lang === 'ru'
                    ? 'Страны:'
                    : lang === 'uz'
                    ? 'Mamlakatlar:'
                    : 'Origins:'}
                </span>
                {ext.origins[lang].map((country) => (
                  <span
                    key={country}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-[#0B3B60]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {sb.id === 'service'
                    ? lang === 'ru'
                      ? 'Ключевые компетенции:'
                      : lang === 'uz'
                      ? 'Asosiy xizmatlar:'
                      : 'Core Capabilities:'
                    : lang === 'ru'
                    ? 'Флагманские продукты:'
                    : lang === 'uz'
                    ? 'Flagman mahsulotlar:'
                    : 'Flagship Products:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sb.flagshipProducts[lang].map((prod) => (
                    <span
                      key={prod}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-800"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>

              {sb.id === 'service' ? (
                <a
                  href="#contacts"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-xs font-bold text-amber-900 transition-colors"
                >
                  <span>
                    {lang === 'ru'
                      ? 'Запросить поиск молекул и регистрацию'
                      : lang === 'uz'
                      ? 'Molekula izlash va roʻyxatdan oʻtkazish'
                      : 'Request Molecule Scouting & Registration'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href={`/portfolio?subbrand=${sb.id}&lang=${lang}`}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0B3B60] text-xs font-bold text-[#0B3B60] hover:text-white transition-colors"
                >
                  <span>
                    {lang === 'ru'
                      ? `Открыть портфель ${sb.name}`
                      : lang === 'uz'
                      ? `${sb.name} portfelini koʻrish`
                      : `Explore ${sb.name} Portfolio`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section
      id="subbrands"
      ref={containerRef}
      className="relative py-14 sm:py-20 lg:py-26 bg-[#F8FAFC] border-b border-slate-200/80 overflow-clip"
    >
      {/* Subtle Architectural Blueprint Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(11, 59, 96, 0.14) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-40 right-0 w-[540px] h-[540px] rounded-full bg-teal-500/6 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[540px] h-[540px] rounded-full bg-[#0B3B60]/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* =================================================================
            SECTION HEADER
           ================================================================= */}
        <div className="pb-8 sm:pb-12 border-b border-slate-200/90">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3B60]/6 border border-[#0B3B60]/15 text-[#0D9488] text-[12px] font-extrabold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-[#0B3B60]" />
              <span>
                {lang === 'ru'
                  ? 'СТРУКТУРА ХОЛДИНГА · 3 НАПРАВЛЕНИЯ И 6 СУБРЕНДОВ'
                  : lang === 'uz'
                  ? 'XOLDING TUZILMASI · 3 YOʻNALISH VA 6 SUB-BREND'
                  : 'HOLDING STRUCTURE · 3 PILLARS & 6 SUB-BRANDS'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-slate-900 text-balance leading-[1.15]">
              {lang === 'ru'
                ? 'Экосистема субрендов INSO Group: от завода до пациента'
                : lang === 'uz'
                ? 'INSO Group sub-brendlari ekotizimi: zavoddan bemorgacha'
                : 'INSO Group Sub-Brand Ecosystem: From Factory to Patient'}
            </h2>

            <p className="mt-3 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed">
              {lang === 'ru'
                ? 'Каждый из шести субрендов отвечает за свой этап пути препарата и свои терапевтические ниши — без внутренней конкуренции и дублирования функций.'
                : lang === 'uz'
                ? 'Oltita sub-brendning har biri preparat yoʻlining oʻz bosqichi va terapevtik yoʻnalishlari uchun javob beradi — ichki raqobat va takrorlanishlarsiz.'
                : 'Each of our six specialized sub-brands owns a distinct stage of the medicine lifecycle and therapeutic focus — operating with zero internal overlap.'}
            </p>
          </div>
        </div>

        {/* =================================================================
            MOBILE & TABLET (< lg): ALWAYS SHOW "ВСЯ МАТРИЦА (6)"
           ================================================================= */}
        <div className="lg:hidden mt-6 space-y-6">
          {/* Compact 3-Direction Filter Pills for Mobile & Tablet */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              {
                id: 'all' as const,
                label:
                  lang === 'ru'
                    ? 'Вся матрица (6)'
                    : lang === 'uz'
                    ? 'Barchasi (6)'
                    : 'All Sub-Brands (6)',
              },
              {
                id: 'distribution' as const,
                label:
                  lang === 'ru'
                    ? '01 Дистрибуция (2)'
                    : lang === 'uz'
                    ? '01 Distribyutsiya (2)'
                    : '01 Distribution (2)',
              },
              {
                id: 'promotion' as const,
                label:
                  lang === 'ru'
                    ? '02 Промоция (3)'
                    : lang === 'uz'
                    ? '02 Targʻibot (3)'
                    : '02 Promotion (3)',
              },
              {
                id: 'services' as const,
                label:
                  lang === 'ru'
                    ? '03 Сервис (1)'
                    : lang === 'uz'
                    ? '03 Servis (1)'
                    : '03 Services (1)',
              },
            ].map((tab) => {
              const active = mobileDirectionFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMobileDirectionFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:border-[#0B3B60]/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Full 6-Subbrand Matrix Grid for Mobile & Tablet (Ordered 01 -> 06) */}
          {renderMatrixCards(
            ORDERED_SUBBRAND_IDS.map((id) => subbrandsMap[id]).filter(
              (sb): sb is SubbrandItem =>
                Boolean(sb) &&
                (mobileDirectionFilter === 'all' ||
                  sb.directionType === mobileDirectionFilter)
            )
          )}
        </div>

        {/* =================================================================
            DESKTOP (lg+): "СКРОЛЛ-ЭКСКУРСИЯ"
           ================================================================= */}
        <div className="hidden lg:block">
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* -------------------------------------------------------------
                  LEFT COLUMN: STICKY INTERACTIVE HOLDING CORE CONSOLE (5 COLS)
                 ------------------------------------------------------------- */}
              <div className="lg:col-span-5 lg:sticky lg:top-22 space-y-4">
                <div className="relative rounded-3xl bg-gradient-to-br from-[#061527] via-[#0B2948] to-[#071D35] text-white p-4 sm:p-5 border border-slate-800 shadow-[0_28px_60px_-18px_rgba(7,26,48,0.55)] overflow-hidden">
                  {/* Ambient Telemetry Grid inside Sticky Console */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.14]"
                    style={{
                      backgroundImage:
                        'radial-gradient(rgba(45, 212, 191, 0.55) 1px, transparent 1px)',
                      backgroundSize: '22px 22px',
                    }}
                  />

                  {/* Top Console Bar: Active Direction Indicator */}
                  <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-teal-400/15 border border-teal-400/30 font-[family-name:var(--font-mono)] text-xs font-extrabold text-teal-300">
                        {currentChapter.stepNumber}
                      </span>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-teal-300/90 leading-none">
                          {lang === 'ru'
                            ? 'АКТИВНЫЙ ЭТАП ЭКОСИСТЕМЫ'
                            : lang === 'uz'
                            ? 'FAOL EKOTIZIM BOSQICHI'
                            : 'ACTIVE ECOSYSTEM STAGE'}
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 leading-tight">
                          {currentChapter.id === 'distribution'
                            ? lang === 'ru'
                              ? '01 · Прямая GDP-Дистрибуция'
                              : lang === 'uz'
                              ? '01 · GDP Distribyutsiya'
                              : '01 · Direct GDP Distribution'
                            : currentChapter.id === 'promotion'
                            ? lang === 'ru'
                              ? '02 · Медицинская промоция'
                              : lang === 'uz'
                              ? '02 · Tibbiy targʻibot'
                              : '02 · Medical Promotion'
                            : lang === 'ru'
                            ? '03 · Сервисные услуги (CTD)'
                            : lang === 'uz'
                            ? '03 · Servis va konsalting'
                            : '03 · Turnkey Services (CTD)'}
                        </div>
                      </div>
                    </div>

                    {/* 3 Stage Quick-Jump Dots */}
                    <div className="flex items-center gap-1.5">
                      {DIRECTION_CHAPTERS.map((chap) => {
                        const active = activeDirection === chap.id;
                        return (
                          <button
                            key={chap.id}
                            type="button"
                            onClick={() => {
                              setActiveDirection(chap.id);
                              setActiveSubbrandId(chap.subbrandIds[0]);
                              scrollToElement(`chapter-${chap.id}`);
                            }}
                            title={chap.title[lang]}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              active
                                ? 'w-6 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]'
                                : 'w-2 bg-white/25 hover:bg-white/45'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Orbital Radar & 6 Sub-Brands Constellation (Compact 15% Reduced Height) */}
                  <div className="relative z-10 my-2.5 flex items-center justify-center">
                    <div className="relative w-[248px] h-[248px] sm:w-[264px] sm:h-[264px] flex items-center justify-center">
                      {/* Outer & Inner Orbital SVG Rings + Clockwise Progress Arc + Dynamic Spokes */}
                      <svg
                        viewBox="0 0 264 264"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                      >
                        <defs>
                          <linearGradient
                            id="insoActiveBeam"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
                          </linearGradient>
                        </defs>

                        {/* Outer Ring */}
                        <circle
                          cx="132"
                          cy="132"
                          r="100"
                          fill="none"
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />

                        {/* Clockwise Progress Arc from #01 (NL at -125 deg) to Active Sub-Brand */}
                        {(() => {
                          const startAngle = SUBBRAND_EXTENDED_META.nl.orbitAngle; // -125
                          const endAngle = currentExt.orbitAngle;
                          const sweepDeg = Math.max(0, endAngle - startAngle);
                          if (sweepDeg <= 0) return null;
                          const r = 100;
                          const startRad = (startAngle * Math.PI) / 180;
                          const endRad = (endAngle * Math.PI) / 180;
                          const x1 = 132 + Math.cos(startRad) * r;
                          const y1 = 132 + Math.sin(startRad) * r;
                          const x2 = 132 + Math.cos(endRad) * r;
                          const y2 = 132 + Math.sin(endRad) * r;
                          const largeArcFlag = sweepDeg > 180 ? 1 : 0;
                          return (
                            <path
                              d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                              fill="none"
                              stroke="url(#insoActiveBeam)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          );
                        })()}

                        {/* Middle Ring */}
                        <circle
                          cx="132"
                          cy="132"
                          r="64"
                          fill="none"
                          stroke="rgba(45,212,191,0.18)"
                          strokeWidth="1"
                        />

                        {/* Dynamic Spokes from Center (132,132) to each of the 6 Subbrands in Clockwise Order */}
                        {ORDERED_SUBBRAND_IDS.map((id) => {
                          const sb = subbrandsMap[id];
                          if (!sb) return null;
                          const meta = SUBBRAND_EXTENDED_META[sb.id];
                          const rad = (meta.orbitAngle * Math.PI) / 180;
                          const x = 132 + Math.cos(rad) * meta.ringRadius;
                          const y = 132 + Math.sin(rad) * meta.ringRadius;
                          const isSelected = activeSubbrandId === sb.id;
                          const isSameDirection =
                            sb.directionType === activeDirection;

                          return (
                            <g key={sb.id}>
                              <line
                                x1="132"
                                y1="132"
                                x2={x}
                                y2={y}
                                stroke={
                                  isSelected
                                    ? meta.hexColor
                                    : isSameDirection
                                    ? 'rgba(45,212,191,0.4)'
                                    : 'rgba(255,255,255,0.08)'
                                }
                                strokeWidth={isSelected ? '2.5' : '1.2'}
                                strokeDasharray={isSelected ? 'none' : '3 3'}
                              />
                              {isSelected && (
                                <circle
                                  cx={(132 + x) / 2}
                                  cy={(132 + y) / 2}
                                  r="3.5"
                                  fill={meta.hexColor}
                                />
                              )}
                            </g>
                          );
                        })}
                      </svg>

                      {/* Center Core: INSO GROUP Hub */}
                      <div className="relative z-20 w-22 h-22 rounded-full bg-gradient-to-br from-[#0B3B60] via-[#092C49] to-[#0D9488] border-2 border-teal-300/50 shadow-[0_0_30px_rgba(13,148,136,0.45)] flex flex-col items-center justify-center text-center p-1.5">
                        <span className="text-[8px] font-bold tracking-[0.18em] text-teal-300 uppercase">
                          {lang === 'ru'
                            ? 'ХОЛДИНГ'
                            : lang === 'uz'
                            ? 'XOLDING'
                            : 'HOLDING'}
                        </span>
                        <span className="text-base font-extrabold tracking-[0.14em] text-white leading-none mt-0.5">
                          INSO
                        </span>
                        <span className="text-[7px] font-bold tracking-[0.2em] text-teal-200 uppercase mt-0.5">
                          GROUP
                        </span>
                        <span className="mt-0.5 px-1.5 py-0.5 rounded-full bg-white/10 font-[family-name:var(--font-mono)] text-[8px] font-bold text-white/90 leading-none">
                          {currentExt.orderNumber} / 06
                        </span>
                      </div>

                      {/* 6 Interactive Sub-Brand Satellite Nodes (Ordered Clockwise 01 -> 06) */}
                      {ORDERED_SUBBRAND_IDS.map((id) => {
                        const sb = subbrandsMap[id];
                        if (!sb) return null;
                        const meta = SUBBRAND_EXTENDED_META[sb.id];
                        const rad = (meta.orbitAngle * Math.PI) / 180;
                        const xOffset = Math.cos(rad) * meta.ringRadius;
                        const yOffset = Math.sin(rad) * meta.ringRadius;
                        const isSelected = activeSubbrandId === sb.id;
                        const isSameDirection =
                          sb.directionType === activeDirection;

                        return (
                          <button
                            key={sb.id}
                            type="button"
                            onClick={() => {
                              setActiveSubbrandId(sb.id);
                              setActiveDirection(sb.directionType);
                              scrollToElement(`subbrand-card-${sb.id}`);
                            }}
                            style={{
                              transform: `translate(${xOffset}px, ${yOffset}px)`,
                            }}
                            className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-white text-slate-950 border-teal-300 scale-108 shadow-[0_0_20px_rgba(45,212,191,0.65)]'
                                : isSameDirection
                                ? 'bg-[#0F3156]/95 text-white border-teal-400/50 hover:scale-105'
                                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:text-white hover:border-white/30'
                            }`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: meta.hexColor }}
                            />
                            <div className="leading-none">
                              <div className="font-[family-name:var(--font-mono)] text-[9.5px] font-extrabold tracking-tight">
                                <span
                                  className={
                                    isSelected ? 'text-[#0D9488]' : 'text-teal-300/80'
                                  }
                                >
                                  {meta.orderNumber}
                                </span>{' '}
                                · {sb.shortCode}
                              </div>
                              <div
                                className={`text-[7.5px] font-semibold mt-0.5 ${
                                  isSelected ? 'text-slate-600' : 'text-slate-400'
                                }`}
                              >
                                {sb.skuCountLabel[lang]}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Active Sub-Brand Telemetry Readout */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSubbrand.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 p-3.5 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-7 h-7 rounded-xl flex items-center justify-center text-white font-bold shadow-xs shrink-0"
                            style={{ backgroundColor: currentExt.hexColor }}
                          >
                            {renderSubbrandIcon(currentSubbrand.id, 'w-3.5 h-3.5')}
                          </span>
                          <div>
                            <div className="text-xs font-extrabold text-white leading-tight">
                              {currentSubbrand.name}
                            </div>
                            <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-teal-300">
                              {currentSubbrand.badge[lang]}
                            </div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-white/10 font-[family-name:var(--font-mono)] text-[10px] font-bold text-slate-200">
                          {currentExt.orderNumber} · {currentSubbrand.shortCode}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-200/90 leading-snug">
                        {currentExt.highlightFact[lang]}
                      </p>

                      {/* Geography Pills */}
                      <div className="pt-1.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300">
                          <Globe2 className="w-3 h-3 text-teal-300" />
                          <span>
                            {lang === 'ru'
                              ? 'География:'
                              : lang === 'uz'
                              ? 'Geografiya:'
                              : 'Origins:'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {currentExt.origins[lang].map((orig) => (
                            <span
                              key={orig}
                              className="px-1.5 py-0.5 rounded-md bg-white/10 text-[9.5px] font-semibold text-teal-200"
                            >
                              {orig}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom Quick-Jump Subbrand Bar */}
                  <div className="relative z-10 mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10.5px] text-slate-300">
                    <span>
                      {lang === 'ru'
                        ? 'Нажмите на узел орбиты для перехода'
                        : lang === 'uz'
                        ? 'Oʻtish uchun orbita tugmasini bosing'
                        : 'Click any orbital node to jump'}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-teal-300 font-bold">
                      {lang === 'ru'
                        ? `ШАГ ${currentExt.orderNumber} ИЗ 06`
                        : lang === 'uz'
                        ? `${currentExt.orderNumber} / 06 QADAM`
                        : `STEP ${currentExt.orderNumber} OF 06`}
                    </span>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  RIGHT COLUMN: SCROLL-DRIVEN VALUE-CHAIN STREAM (7 COLS)
                 ------------------------------------------------------------- */}
              <div className="lg:col-span-7 relative pl-8">
                {/* Vertical Scroll-Linked Supply-Chain Progress Rail */}
                <div
                  aria-hidden="true"
                  className="block absolute left-2.5 top-4 bottom-4 w-1 rounded-full bg-slate-200/90 overflow-hidden"
                >
                  <motion.div
                    style={{ height: progressHeight }}
                    className="w-full rounded-full bg-gradient-to-b from-[#0D9488] via-[#0B3B60] to-amber-500 shadow-[0_0_14px_rgba(13,148,136,0.5)]"
                  />
                </div>

                <div className="space-y-18">
                  {DIRECTION_CHAPTERS.map((chapter) => {
                    const chapterSubbrands = chapter.subbrandIds
                      .map((id) => subbrandsMap[id])
                      .filter(Boolean);
                    const isChapterActive = activeDirection === chapter.id;

                    return (
                      <div
                        key={chapter.id}
                        id={`chapter-${chapter.id}`}
                        className="relative space-y-6"
                      >
                        {/* Glowing Node on the Vertical Scroll Rail */}
                        <div
                          aria-hidden="true"
                          className={`flex absolute -left-8 top-6 w-6 h-6 rounded-full items-center justify-center border-2 transition-all duration-300 ${
                            isChapterActive
                              ? 'bg-[#0B3B60] border-teal-400 text-teal-300 scale-115 shadow-[0_0_16px_rgba(13,148,136,0.55)]'
                              : 'bg-white border-slate-300 text-slate-500'
                          }`}
                        >
                          <span className="font-[family-name:var(--font-mono)] text-[9px] font-extrabold">
                            {chapter.stepNumber}
                          </span>
                        </div>

                        {/* CHAPTER ARCHITECTURAL BANNER */}
                        <motion.div
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className={`relative rounded-3xl bg-gradient-to-br ${chapter.accentGradient} text-white p-8 shadow-[0_20px_44px_-15px_rgba(11,59,96,0.3)] border border-white/15 overflow-hidden`}
                        >
                          {/* Subtle Background Pattern */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-[0.1]"
                            style={{
                              backgroundImage:
                                'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
                              backgroundSize: '20px 20px',
                            }}
                          />

                          <div className="relative z-10 space-y-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-extrabold tracking-wider uppercase ${chapter.accentBadge}`}
                              >
                                <Activity className="w-3.5 h-3.5" />
                                <span>{chapter.stageTag[lang]}</span>
                              </span>
                              <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-white/80">
                                {lang === 'ru'
                                  ? `Этап ${chapter.stepNumber} из 03`
                                  : lang === 'uz'
                                  ? `${chapter.stepNumber} / 03 bosqich`
                                  : `Stage ${chapter.stepNumber} of 03`}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-extrabold tracking-tight text-white leading-snug">
                                {chapter.title[lang]}
                              </h3>
                              <p className="mt-2 text-[15px] sm:text-[16px] text-slate-100/90 leading-relaxed">
                                {chapter.description[lang]}
                              </p>
                            </div>

                            {/* 3 Key Chapter Telemetry Counters */}
                            <div className="grid grid-cols-3 gap-4 pt-2">
                              {chapter.keyMetrics.map((m) => (
                                <div
                                  key={m.value.en}
                                  className="rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 p-3"
                                >
                                  <div className="font-[family-name:var(--font-mono)] text-lg font-extrabold text-teal-300 leading-none">
                                    {m.value[lang]}
                                  </div>
                                  <div className="mt-1 text-xs text-slate-200 leading-tight">
                                    {m.label[lang]}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Interactive 4-Step Pipeline Strip inside the Chapter */}
                            <div className="pt-3 border-t border-white/15">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-200/90 mb-2.5">
                                {lang === 'ru'
                                  ? 'Цепочка процессов направления:'
                                  : lang === 'uz'
                                  ? 'Yoʻnalish jarayonlari zanjiri:'
                                  : 'Operational Value Chain:'}
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {chapter.flowSteps[lang].map((stepText, sIdx) => (
                                  <div
                                    key={stepText}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/25 border border-white/10 text-xs font-semibold text-white"
                                  >
                                    <span className="w-5 h-5 rounded-full bg-teal-400/20 border border-teal-300/40 font-[family-name:var(--font-mono)] text-[10px] font-extrabold text-teal-300 flex items-center justify-center shrink-0">
                                      {sIdx + 1}
                                    </span>
                                    <span className="leading-snug">{stepText}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* UNFOLDING SUB-BRAND SHOWCASE CARDS FOR THIS CHAPTER */}
                        <div className="space-y-5">
                          {chapterSubbrands.map((sb, sbIdx) => {
                            const ext = SUBBRAND_EXTENDED_META[sb.id];
                            const isFocused = activeSubbrandId === sb.id;

                            return (
                              <motion.article
                                key={sb.id}
                                id={`subbrand-card-${sb.id}`}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                  duration: 0.45,
                                  delay: sbIdx * 0.05,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                onClick={() => {
                                  setActiveSubbrandId(sb.id);
                                  setActiveDirection(sb.directionType);
                                }}
                                className={`group relative rounded-3xl bg-white p-7 border transition-all duration-300 cursor-pointer ${
                                  isFocused
                                    ? 'border-[#0B3B60] shadow-[0_22px_48px_-14px_rgba(11,59,96,0.18)] ring-2 ring-[#0D9488]/25'
                                    : 'border-slate-200/90 hover:border-[#0B3B60]/45 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.06)]'
                                }`}
                              >
                                {/* Top Accent Line */}
                                <div
                                  className="absolute inset-x-6 top-0 h-1 rounded-b-full transition-opacity"
                                  style={{
                                    backgroundColor: ext.hexColor,
                                    opacity: isFocused ? 1 : 0.35,
                                  }}
                                />

                                {/* Header Row: Subbrand Identity + Live Sync Indicator */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
                                      style={{ backgroundColor: ext.hexColor }}
                                    >
                                      {renderSubbrandIcon(sb.id, 'w-5 h-5')}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded-md bg-[#0B3B60] text-white font-[family-name:var(--font-mono)] text-[11px] font-extrabold">
                                          {ext.orderNumber}
                                        </span>
                                        <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-[#0B3B60] transition-colors">
                                          {sb.name}
                                        </h4>
                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-[family-name:var(--font-mono)] text-[11px] font-extrabold text-slate-700">
                                          {sb.shortCode}
                                        </span>
                                      </div>
                                      <div className="text-xs font-bold text-[#0D9488] mt-0.5">
                                        {ext.shareLabel[lang]}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {isFocused && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[11px] font-extrabold text-[#0D9488]">
                                        <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-ping" />
                                        <span>
                                          {lang === 'ru'
                                            ? 'В фокусе на орбите'
                                            : lang === 'uz'
                                            ? 'Orbitada faol'
                                            : 'Active on Orbit'}
                                        </span>
                                      </span>
                                    )}
                                    <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-[family-name:var(--font-mono)] text-xs font-bold">
                                      {sb.skuCountLabel[lang]}
                                    </span>
                                  </div>
                                </div>

                                {/* Description + Visual Progress Bar */}
                                <div className="mt-4 space-y-4">
                                  <p className="text-sm text-slate-600 leading-relaxed">
                                    {sb.description[lang]}
                                  </p>

                                  {/* Visual Therapeutic & Country Breakdown Grid */}
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                        <Stethoscope className="w-3.5 h-3.5 text-[#0D9488]" />
                                        <span>
                                          {lang === 'ru'
                                            ? 'Терапевтические ниши'
                                            : lang === 'uz'
                                            ? 'Terapevtik yoʻnalishlar'
                                            : 'Therapeutic Focus'}
                                        </span>
                                      </div>
                                      <div className="mt-1.5 text-xs font-bold text-slate-800 leading-snug">
                                        {sb.therapeuticAreas[lang]}
                                      </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
                                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                        <Globe2 className="w-3.5 h-3.5 text-[#0B3B60]" />
                                        <span>
                                          {lang === 'ru'
                                            ? 'География производства'
                                            : lang === 'uz'
                                            ? 'Ishlab chiqarish geografiyasi'
                                            : 'Manufacturing Origins'}
                                        </span>
                                      </div>
                                      <div className="mt-2 flex flex-wrap gap-1.5">
                                        {ext.origins[lang].map((country) => (
                                          <span
                                            key={country}
                                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-[#0B3B60]"
                                          >
                                            {country}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Flagship Molecules & Direct Portfolio Action */}
                                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                                    <div>
                                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                                        {sb.id === 'service'
                                          ? lang === 'ru'
                                            ? 'Ключевые сервисы:'
                                            : lang === 'uz'
                                            ? 'Asosiy xizmatlar:'
                                            : 'Core Capabilities:'
                                          : lang === 'ru'
                                          ? 'Флагманские бренды:'
                                          : lang === 'uz'
                                          ? 'Flagman brendlar:'
                                          : 'Flagship Brands:'}
                                      </div>
                                      <div className="flex flex-wrap gap-1.5">
                                        {sb.flagshipProducts[lang].map((prod) => (
                                          <span
                                            key={prod}
                                            className="px-2.5 py-1 rounded-lg bg-slate-100 group-hover:bg-teal-50 text-[11px] font-bold text-slate-800 group-hover:text-[#0B3B60] transition-colors"
                                          >
                                            {prod}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="shrink-0">
                                      {sb.id === 'service' ? (
                                        <a
                                          href="#contacts"
                                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-extrabold text-slate-950 transition-colors shadow-xs"
                                        >
                                          <span>
                                            {lang === 'ru'
                                              ? 'Запросить проект под ключ'
                                              : lang === 'uz'
                                              ? 'Loyiha soʻrash'
                                              : 'Request Turnkey Project'}
                                          </span>
                                          <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                      ) : (
                                        <Link
                                          href={`/portfolio?subbrand=${sb.id}&lang=${lang}`}
                                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#0D9488] text-xs font-extrabold text-white transition-colors shadow-xs"
                                        >
                                          <span>
                                            {lang === 'ru'
                                              ? `Портфель ${sb.shortCode}`
                                              : lang === 'uz'
                                              ? `${sb.shortCode} portfeli`
                                              : `${sb.shortCode} Portfolio`}
                                          </span>
                                          <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.article>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
