'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ChevronDown,
  Phone,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Mail,
  Send,
  BookOpen,
  X,
  Check,
  ArrowUp,
  Menu,
  HelpCircle,
  Plus,
  Minus,
  Pill,
  Briefcase,
  Users,
  TrendingUp,
  Compass,
  FileText,
  Play,
  Pause,
  Globe,
  ChevronUp,
} from 'lucide-react';
import {
  PRODUCTS,
  SUBBRANDS,
  CORE_VALUES,
  RESEARCH_ITEMS,
  FAQ_ITEMS,
  ResearchItem,
  Language,
} from '@/lib/insopharm-data';
import {
  MedicalAmbientBackground,
  AnimatedMetricValue,
} from '@/components/InsoBrandGraphics';
import InsoLocationMap from '@/components/InsoLocationMap';
import { InsoHoldingStructureScroll } from '@/components/InsoHoldingStructureScroll';

// Crisp CSS Flag Icon (renders reliably across all mobile/desktop platforms without custom SVGs)
function LanguageFlag({ code, size = 'md' }: { code: Language; size?: 'sm' | 'md' }) {
  const dimensions = size === 'sm' ? 'w-5 h-3.5' : 'w-6 h-4';

  if (code === 'ru') {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex flex-col ${dimensions} rounded-[4px] overflow-hidden border border-slate-300/80 shadow-2xs shrink-0`}
      >
        <span className="w-full h-1/3 bg-white" />
        <span className="w-full h-1/3 bg-[#0039A6]" />
        <span className="w-full h-1/3 bg-[#D52B1E]" />
      </span>
    );
  }

  if (code === 'uz') {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex flex-col ${dimensions} rounded-[4px] overflow-hidden border border-slate-300/80 shadow-2xs shrink-0`}
      >
        <span className="w-full h-[32%] bg-[#0099B5]" />
        <span className="w-full h-[4%] bg-[#CE1126]" />
        <span className="w-full h-[28%] bg-white" />
        <span className="w-full h-[4%] bg-[#CE1126]" />
        <span className="w-full h-[32%] bg-[#1EB53A]" />
      </span>
    );
  }

  // 'en' (UK / International English)
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex items-center justify-center ${dimensions} rounded-[4px] overflow-hidden bg-[#012169] border border-slate-300/80 shadow-2xs shrink-0`}
    >
      <span className="absolute inset-x-0 h-[32%] bg-white" />
      <span className="absolute inset-y-0 w-[24%] bg-white" />
      <span className="absolute inset-x-0 h-[18%] bg-[#C8102E]" />
      <span className="absolute inset-y-0 w-[14%] bg-[#C8102E]" />
    </span>
  );
}

const UI_COPY = {
  ru: {
    navCatalogShort: 'Каталог',
    navAbout: 'О компании',
    navSubbrands: 'Субренды',
    navNews: 'Новости',
    navCareer: 'Карьера',
    navCatalog: 'Каталог препаратов',
    navFaq: 'FAQ',
    navMap: 'Карта',
    navContacts: 'Контакты',
    ctaContact: 'Связаться с нами',
    menuOpen: 'Меню',
    menuClose: 'Закрыть',
    sinceBadge: 'КАЧЕСТВО · ДОВЕРИЕ · ДОСТУПНОСТЬ · С 2017 ГОДА',
    heroHeadlineBefore: 'Один из ведущих',
    heroHeadlineItalic: 'фармацевтических',
    heroHeadlineAfter: 'холдингов Узбекистана',
    heroHeadline: 'Один из ведущих фармхолдингов Узбекистана',
    heroDescription:
      'Прямая дистрибуция по стандартам GDP, национальная промоция и портфель препаратов от заводов Китая и Индии. От производителя — до пациента.',
    heroPrimaryBtn: 'Каталог препаратов',
    heroSecondaryBtn: 'Стать партнёром',
    filterCardio: 'Кардиология',
    filterNeuro: 'Неврология',
    filterGastro: 'Гастроэнтерология',
    filterAntibiotics: 'Антибактериальные',
    newsBadge: 'НОВОСТИ, СОБЫТИЯ И КЛИНИЧЕСКИЕ ОБЗОРЫ',
    newsTitle: 'Новости холдинга и медицинская экспертиза',
    newsSubtitle:
      'Ключевые события развития INSO Group, международные партнёрства, научные конференции и клинические обзоры для специалистов здравоохранения.',
    newsBtnArchive: 'Запросить пресс-кит и архив публикаций',
    newsDisclaimer:
      'Клинические материалы предназначены для лицензированных медицинских и фармацевтических работников',
    faqBadge: 'Ответы на ключевые вопросы · B2B и Регуляторика',
    faqTitle: 'Часто задаваемые вопросы (FAQ)',
    faqSubtitle:
      'Подробная информация о регистрации препаратов, GDP-логистике, холодовой цепи и условиях дистрибуции в Узбекистане.',
    faqCtaTitle: 'Остались вопросы по вашему проекту?',
    faqCtaBody:
      'Запросите индивидуальную дорожную карту вывода препарата на рынок Узбекистана или актуальный оптовый прайс-лист.',
    faqCtaBtn: 'Задать вопрос эксперту',
    contactTitle: 'Связаться с нами',
    contactSubtitle:
      'Мы открыты для взаимовыгодного и долгосрочного сотрудничества с производителями, аптечными сетями и талантливыми специалистами',
    formHeading: 'Отправьте нам сообщение',
    formName: 'Имя и организация',
    formNamePlaceholder: 'Ваше имя или название компании',
    formEmail: 'Корпоративный Email или Телефон',
    formEmailPlaceholder: 'partner@company.com / +998 ...',
    formTopic: 'Направление запроса',
    formMessage: 'Сообщение',
    formMessagePlaceholder:
      'Опишите ваш запрос: дистрибуция, регистрация ЛС, запрос прайс-листа или отклик на вакансию...',
    formSubmit: 'Отправить сообщение',
    infoHeading: 'Контактная информация',
    addressLabel: 'Адрес головного офиса и GDP-склада',
    addressValue:
      '100005, Республика Узбекистан, г. Ташкент, Юнусабадский район, ул. Богишамол, 160',
    phoneLabel: 'Телефон и горячая линия фармаконадзора',
    emailLabel: 'Корпоративная почта по департаментам',
    partnerCardSubtitle:
      'Ваш надёжный партнёр в фармацевтической индустрии Центральной Азии с 2017 года',
    heroCertMhuz: 'Лицензия Минздрава РУз · Фармкомитет',
    heroCertGdp: 'Стандарты GDP & WHO-GMP',
    heroContractsCnIn: 'Прямой импорт: Китай 🇨🇳 и Индия 🇮🇳',
  },
  uz: {
    navCatalogShort: 'Katalog',
    navAbout: 'Kompaniya haqida',
    navSubbrands: 'Sub-brendlar',
    navNews: 'Yangiliklar',
    navCareer: 'Karyera',
    navCatalog: 'Dori vositalari katalogi',
    navFaq: 'FAQ',
    navMap: 'Xarita',
    navContacts: 'Aloqa',
    ctaContact: 'Bog‘lanish',
    menuOpen: 'Menyu',
    menuClose: 'Yopish',
    sinceBadge: 'SIFAT · ISHONCH · HAMYONBOPLIK · 2017-YILDAN BUYON',
    heroHeadlineBefore: 'Oʻzbekistonning yetakchi',
    heroHeadlineItalic: 'farmatsevtika xoldingi',
    heroHeadlineAfter: '',
    heroHeadline: 'Oʻzbekistonning yetakchi farmxoldinglaridan biri',
    heroDescription:
      'GDP standartidagi toʻgʻridan-toʻgʻri taʼminot, milliy targʻibot va Xitoy hamda Hindiston zavodlaridan preparatlar portfeli. Ishlab chiqaruvchidan — bemorgacha.',
    heroPrimaryBtn: 'Dori vositalari katalogi',
    heroSecondaryBtn: 'Hamkor boʻlish',
    filterCardio: 'Kardiologiya',
    filterNeuro: 'Nevrologiya',
    filterGastro: 'Gastroenterologiya',
    filterAntibiotics: 'Antibakterial',
    newsBadge: 'YANGILIKLAR, TADBIRLAR VA KLINIK SHARHLAR',
    newsTitle: 'Xolding yangiliklari va tibbiy ekspertiza',
    newsSubtitle:
      'INSO Group rivojlanishining muhim voqealari, xalqaro hamkorliklar, ilmiy anjumanlar va sogʻliqni saqlash mutaxassislari uchun klinik sharhlar.',
    newsBtnArchive: 'Press-kit va maqolalar arxivini soʻrash',
    newsDisclaimer:
      'Klinik materiallar faqat litsenziyalangan tibbiyot va farmatsevtika xodimlari uchun moʻljallangan',
    faqBadge: 'Ko‘p beriladigan savollar · B2B va Regulyatorika',
    faqTitle: 'Ko‘p beriladigan savollar (FAQ)',
    faqSubtitle:
      'O‘zbekistonda dori vositalarini ro‘yxatdan o‘tkazish, GDP-logistika, sovuqlik zanjiri va ulgurji yetkazib berish shartlari haqida.',
    faqCtaTitle: 'Loyihangiz bo‘yicha savollaringiz bormi?',
    faqCtaBody:
      'Preparatingizni O‘zbekiston bozoriga olib kirish bo‘yicha individual yo‘l xaritasi yoki ulgurji prays-listni so‘rang.',
    faqCtaBtn: 'Mutaxassisga savol berish',
    contactTitle: 'Biz bilan bog‘lanish',
    contactSubtitle:
      'Biz ishlab chiqaruvchilar, dorixona tarmoqlari va iqtidorli mutaxassislar bilan uzoq muddatli hamkorlik uchun doimo ochiqmiz',
    formHeading: 'Bizga xabar yuboring',
    formName: 'Ism va tashkilot nomi',
    formNamePlaceholder: 'Ismingiz yoki kompaniya nomi',
    formEmail: 'Korporativ Email yoki Telefon',
    formEmailPlaceholder: 'partner@company.com / +998 ...',
    formTopic: 'Murojaat yo‘nalishi',
    formMessage: 'Xabar matni',
    formMessagePlaceholder:
      'So‘rovingizni yozing: distributsiya, ro‘yxatdan o‘tkazish, prays-list olish yoki boʻsh ish oʻrniga ariza...',
    formSubmit: 'Xabarni yuborish',
    infoHeading: 'Aloqa ma’lumotlari',
    addressLabel: 'Bosh ofis va GDP-ombor manzili',
    addressValue:
      '100005, O‘zbekiston Respublikasi, Toshkent sh., Yunusobod tumani, Bog‘ishamol ko‘chasi, 160',
    phoneLabel: 'Telefon va farmakonazorat liniyasi',
    emailLabel: 'Bo‘limlar elektron pochtasi',
    partnerCardSubtitle:
      '2017-yildan buyon Markaziy Osiyo farmatsevtika sanoatidagi ishonchli hamkoringiz',
    heroCertMhuz: 'OʻzR Sogʻliqni saqlash vazirligi litsenziyasi',
    heroCertGdp: 'GDP va WHO-GMP standartlari',
    heroContractsCnIn: 'Toʻgʻridan-toʻgʻri import: Xitoy 🇨🇳 va Hindiston 🇮🇳',
  },
  en: {
    navCatalogShort: 'Catalog',
    navAbout: 'About Us',
    navSubbrands: 'Subbrands',
    navNews: 'News',
    navCareer: 'Career',
    navCatalog: 'Product Portfolio',
    navFaq: 'FAQ',
    navMap: 'Map',
    navContacts: 'Contacts',
    ctaContact: 'Partner With Us',
    menuOpen: 'Menu',
    menuClose: 'Close',
    sinceBadge: 'SCIENCE · TRUST · AFFORDABILITY · SINCE 2017',
    heroHeadlineBefore: 'One of Uzbekistan’s leading',
    heroHeadlineItalic: 'pharmaceutical holdings',
    heroHeadlineAfter: '',
    heroHeadline: 'One of Uzbekistan’s Leading Pharma Holdings',
    heroDescription:
      'Direct GDP distribution, nationwide medical promotion, and a portfolio of pharmaceuticals from plants in China and India. From manufacturer to patient.',
    heroPrimaryBtn: 'Explore Portfolio',
    heroSecondaryBtn: 'Partner With Us',
    filterCardio: 'Cardiology',
    filterNeuro: 'Neurology',
    filterGastro: 'Gastroenterology',
    filterAntibiotics: 'Antibacterials',
    newsBadge: 'CORPORATE NEWS, EVENTS & CLINICAL UPDATES',
    newsTitle: 'Holding News & Medical Expertise',
    newsSubtitle:
      'Key milestones of INSO Group’s expansion, international GMP partnerships, medical symposia, and evidence-based reviews for healthcare professionals.',
    newsBtnArchive: 'Request Press Kit & Clinical Archive',
    newsDisclaimer:
      'Clinical publications are intended for licensed healthcare and pharmaceutical professionals',
    faqBadge: 'Key Questions Answered · B2B & Regulatory',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqSubtitle:
      'Essential details on CTD drug registration timelines, GDP cold-chain storage, wholesale pharmacy supply, and medical promotion in Uzbekistan.',
    faqCtaTitle: 'Have a specific regulatory or commercial question?',
    faqCtaBody:
      'Request a tailored market-entry roadmap for Uzbekistan or our current wholesale pharmacy catalog.',
    faqCtaBtn: 'Ask Our Specialists',
    contactTitle: 'Contact Our Team',
    contactSubtitle:
      'We are open to long-term strategic partnerships with manufacturers, pharmacy chains, and talented industry professionals',
    formHeading: 'Send Us a Message',
    formName: 'Full Name & Organization',
    formNamePlaceholder: 'Your name or pharmaceutical company',
    formEmail: 'Corporate Email or Phone',
    formEmailPlaceholder: 'partner@company.com / +998 ...',
    formTopic: 'Inquiry Department',
    formMessage: 'Message',
    formMessagePlaceholder:
      'Describe your inquiry: market entry, CTD registration, wholesale supply, or career application...',
    formSubmit: 'Send Inquiry',
    infoHeading: 'Corporate Contact Information',
    addressLabel: 'Headquarters & GDP Warehouse',
    addressValue:
      '160 Bogishamol Street, Yunusabad District, Tashkent 100005, Republic of Uzbekistan',
    phoneLabel: 'Phone & Pharmacovigilance Hotline',
    emailLabel: 'Departmental Email Contacts',
    partnerCardSubtitle:
      'Your trusted pharmaceutical commercialization partner in Central Asia since 2017',
    heroCertMhuz: 'Ministry of Health License · Uzbekistan',
    heroCertGdp: 'GDP & WHO-GMP Compliant',
    heroContractsCnIn: 'Direct Import: China 🇨🇳 & India 🇮🇳',
  },
};

// 6 Key Holding Sub-brands showcased in Hero Brand Strip
const HERO_BRAND_ITEMS = [
  { id: 'inom', displayName: 'INSO Inom' },
  { id: 'hb', displayName: 'INSO Health Business' },
  { id: 'lps', displayName: 'Life Pharm Systems' },
  { id: 'greenwell', displayName: 'Greenwell' },
  { id: 'nl', displayName: 'Neues Leben' },
  { id: 'service', displayName: 'INSO Service' },
] as const;

// Verified Company Licenses & Regulatory Documents
interface CompanyLicenseDoc {
  id: string;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  authority: {
    ru: string;
    uz: string;
    en: string;
  };
  details: {
    ru: string;
    uz: string;
    en: string;
  };
  fileUrl?: string;
  fileSize?: string;
  statusLabel?: {
    ru: string;
    uz: string;
    en: string;
  };
}

const COMPANY_LICENSES: CompanyLicenseDoc[] = [
  {
    id: 'gdp-cert',
    title: {
      ru: 'Сертификат соответствия стандартам GDP',
      uz: 'GDP standartlariga muvofiqlik sertifikati',
      en: 'GDP Compliance Certificate',
    },
    authority: {
      ru: 'Надлежащая дистрибьюторская практика · Фарминспекция',
      uz: 'Tegishli distribyutorlik amaliyoti · Farminspeksiya',
      en: 'Good Distribution Practice (GDP)',
    },
    details: {
      ru: 'Фармацевтический складской комплекс 10 000 м² (г. Ташкент), валидированная холодовая цепь (+2…+8 °C и +15…+25 °C), сертифицированный спецтранспорт.',
      uz: '10 000 m² farmatsevtika ombor majmuasi (Toshkent), tasdiqlangan sovuqlik zanjiri (+2…+8 °C va +15…+25 °C), maxsus refrijerator transporti.',
      en: 'Pharmaceutical warehouse complex 10,000 m² (Tashkent), validated cold chain (+2…+8 °C & +15…+25 °C) and certified refrigerated transport.',
    },
    fileUrl: '/license/inso_gdp.pdf',
    fileSize: 'PDF · 230 КБ',
    statusLabel: {
      ru: 'Действующий сертификат',
      uz: 'Amaldagi sertifikat',
      en: 'Active Certificate',
    },
  },
  {
    id: 'moh-license',
    title: {
      ru: 'Лицензия Минздрава РУз на фармацевтическую деятельность',
      uz: 'OʻzR SSV farmatsevtik faoliyat litsenziyasi',
      en: 'MoH Uzbekistan Pharmaceutical Activity License',
    },
    authority: {
      ru: 'Министерство здравоохранения Республики Узбекистан · Фармкомитет',
      uz: 'Oʻzbekiston Respublikasi Sogʻliqni saqlash vazirligi · Farmkomitet',
      en: 'Ministry of Health of the Republic of Uzbekistan · Pharma Committee',
    },
    details: {
      ru: 'Официальный допуск на оптовую реализацию, хранение и прямой импорт лекарственных средств и изделий медицинского назначения.',
      uz: 'Dori vositalari va tibbiy buyumlarni ulgurji sotish, saqlash va toʻgʻridan-toʻgʻri import qilish uchun rasmiy ruxsatnoma.',
      en: 'State authorization for wholesale distribution, storage and direct pharmaceutical import.',
    },
    fileUrl: '/license/inso_gdp.pdf',
    fileSize: 'Госрегуляторика',
    statusLabel: {
      ru: 'Бессрочная лицензия',
      uz: 'Muddatsiz litsenziya',
      en: 'Permanent License',
    },
  },
  {
    id: 'gmp-partners',
    title: {
      ru: 'Сертификаты GMP & WHO-GMP заводов-производителей',
      uz: 'Ishlab chiqaruvchi zavodlarning GMP & WHO-GMP sertifikatlari',
      en: 'Manufacturer GMP & WHO-GMP Partner Certificates',
    },
    authority: {
      ru: 'Прямые контракты с фармзаводами Китая 🇨🇳 и Индии 🇮🇳',
      uz: 'Xitoy 🇨🇳 va Hindiston 🇮🇳 zavodlari bilan toʻgʻridan-toʻgʻri shartnomalar',
      en: 'Direct factory supply contracts · China 🇨🇳 & India 🇮🇳',
    },
    details: {
      ru: 'Официальные серии препаратов с подтверждённым контролем качества по международным стандартам ВОЗ (70+ наименований в каталоге).',
      uz: 'JSST xalqaro standartlari boʻyicha tasdiqlangan sifat nazoratiga ega rasmiy dori partiyalari (katalogda 70+ mahsulot).',
      en: 'Original batches manufactured under strict WHO-GMP compliance with verified quality control (70+ SKUs).',
    },
    fileUrl: '/portfolio?lang=ru',
    fileSize: '70+ SKU',
    statusLabel: {
      ru: 'Стандарты ВОЗ',
      uz: 'JSST standartlari',
      en: 'WHO Standards',
    },
  },
];

export default function InsopharmHomepage({
  googleMapsApiKey = '',
}: {
  googleMapsApiKey?: string;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<Language>('ru');
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [showBehavioralValues, setShowBehavioralValues] = useState<boolean>(false);
  const [showSubbrandsSection, setShowSubbrandsSection] = useState<boolean>(false);
  const [activeBrandPopover, setActiveBrandPopover] = useState<string | null>(null);
  const [mobileBrandsDrawerOpen, setMobileBrandsDrawerOpen] = useState<boolean>(false);
  const [mobileAccordionBrand, setMobileAccordionBrand] = useState<string | null>('inom');
  const [licensesModalOpen, setLicensesModalOpen] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  // Keyboard accessibility: Escape key closes active popovers, drawers and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveBrandPopover(null);
        setMobileBrandsDrawerOpen(false);
        setLicensesModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleHeroVideo = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  // Smooth scroll-linked parallax transitions for Main Hero (Synthon-style depth)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const heroVideoScale = useTransform(heroScrollProgress, [0, 1], [1.03, 1.14]);
  const heroVideoY = useTransform(heroScrollProgress, [0, 1], ['0%', '10%']);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], ['0%', '18%']);
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  // Google Maps Platform Demo Quota State (Section 8 Case A)
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && heroVideoRef.current) {
      heroVideoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  const handleSetLang = (nextLang: Language) => {
    setLang(nextLang);
    window.localStorage.setItem('inso_lang', nextLang);
  };

  const handleToggleSubbrandsSection = () => {
    setShowSubbrandsSection((prev) => {
      const next = !prev;
      if (next) {
        window.setTimeout(() => {
          const el = document.getElementById('subbrands');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
      return next;
    });
  };

  const languageOptions: {
    code: Language;
    label: string;
    short: string;
  }[] = [
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'uz', label: 'O‘zbekcha', short: 'UZ' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  // Interactive modals
  const [activeResearch, setActiveResearch] = useState<ResearchItem | null>(null);
  const [designSystemOpen, setDesignSystemOpen] = useState<boolean>(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('distribution');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const t = UI_COPY[lang];

  // 4 HR-Brand Culture Pillars from Official Platform v12 (Page 7 of Teksty dlya sayta)
  const hrCultureValues = useMemo(
    () => CORE_VALUES.filter((v) => ['03', '04', '05', '06'].includes(v.number)),
    []
  );

  const handleSelectCatalogCategory = (catId: string) => {
    setMobileMenuOpen(false);
    router.push(`/portfolio?category=${catId}&lang=${lang}`);
  };

  const handleApplyCareerTrack = (trackTitle: string) => {
    setContactTopic('career');
    setContactMessage(
      lang === 'ru'
        ? `Здравствуйте! Хочу откликнуться на направление «${trackTitle}» в INSO Group.`
        : lang === 'uz'
        ? `Assalomu alaykum! INSO Group kompaniyasining «${trackTitle}» yoʻnalishi boʻyicha murojaat qilmoqchiman.`
        : `Hello! I would like to apply for the "${trackTitle}" career track at INSO Group.`
    );
    const el = document.getElementById('contacts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError(
        lang === 'ru'
          ? 'Пожалуйста, заполните имя, контактный email/телефон и текст сообщения.'
          : lang === 'uz'
          ? 'Iltimos, ismingiz, email/telefon va xabar matnini kiriting.'
          : 'Please fill in your name, contact email/phone, and message.'
      );
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  const resolvedMapsKey =
    googleMapsApiKey ||
    (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) ||
    '';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Mandatory Demo Key Quota Banner (Section 8 Case A) */}
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* =====================================================================
          1. STICKY HEADER (Main Menu: About Us · Subbrands · News · Career)
         ===================================================================== */}
      <header className="sticky top-0 z-40 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-6">
          {/* Zone 1: Two-line Brand Lockup (36x36px Round Mark + INSO Group) */}
          <motion.a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="INSO Group"
            whileHover="hover"
            initial="idle"
            className="group inline-flex items-center gap-[10px] shrink-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B60]"
          >
            {/* Round Mark (36 × 36 px) */}
            <motion.div
              variants={{
                idle: { y: 0, rotate: 0, scale: 1 },
                hover: { y: -0.5, rotate: [0, -2, 2, 0], scale: 1.05 },
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-[36px] h-[36px] shrink-0 flex items-center justify-center"
            >
              <Image
                src="/assets/photos/inso-mark.webp"
                alt="INSO Mark"
                width={36}
                height={36}
                priority
                className="w-[36px] h-[36px] object-contain"
              />
            </motion.div>

            {/* Two-line Text: INSO (26px) + GROUP (10px), aligned to common left edge */}
            <div className="flex flex-col items-start gap-[2px] justify-center leading-none">
              <span className="font-['Instrument_Sans',sans-serif] font-bold text-[24px] leading-none text-[#0B3B60] tracking-[0.02em] transition-colors group-hover:text-[#082B47]">
                INSO
              </span>
              <span className="font-['Instrument_Sans',sans-serif] font-semibold text-[8px] leading-none text-[#0D9488] tracking-[0.18em] uppercase transition-colors group-hover:text-[#0F766E]">
                GROUP
              </span>
            </div>
          </motion.a>

          {/* Zone 2: Main Menu on Header */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-[16px] font-semibold text-slate-700"
          >
            <Link
              href={`/portfolio?lang=${lang}`}
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navCatalogShort}
            </Link>
            <a
              href="#about"
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navAbout}
            </a>
            {showSubbrandsSection && (
              <a
                href="#subbrands"
                className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                {t.navSubbrands}
              </a>
            )}
            <a
              href="#news"
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navNews}
            </a>
            <a
              href="#career"
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navCareer}
            </a>
          </nav>

          {/* Zone 3: Compact Flag-Only Language Dropdown + Primary CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Compact Flag-Only Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                aria-expanded={langDropdownOpen}
                aria-label="Select language"
                className="inline-flex items-center gap-1.5 h-10 px-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 transition-all cursor-pointer shadow-2xs"
              >
                <LanguageFlag code={lang} size="md" />
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180 text-[#0B3B60]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setLangDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-40 rounded-2xl bg-white border border-slate-200/90 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.16)] p-1.5 z-30"
                    >
                      {languageOptions.map((item) => {
                        const active = lang === item.code;
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              handleSetLang(item.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full px-2.5 py-2 rounded-xl flex items-center justify-between gap-2.5 text-left transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#0B3B60] text-white'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <LanguageFlag code={item.code} size="sm" />
                              <span className="text-xs font-bold leading-none">
                                {item.label}
                              </span>
                            </div>
                            {active && (
                              <Check className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Primary CTA */}
            <a
              href="#contacts"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-[14px] font-semibold text-white bg-[#0B3B60] hover:bg-[#082B47] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-teal-300" />
              <span>{t.ctaContact}</span>
            </a>

            {/* Ergonomic Mobile & Tablet Menu Button (< lg) */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
              className={`lg:hidden inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                mobileMenuOpen
                  ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-[0_8px_20px_-4px_rgba(13,148,136,0.45)]'
                  : 'bg-[#0B3B60] text-white border-[#0B3B60] hover:bg-[#082B47]'
              }`}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4" />
                  <span>{t.menuClose}</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-teal-300" />
                  <span>{t.menuOpen}</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* High-Craft Mobile & Tablet Navigation Sheet + Backdrop Scrim */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed inset-x-0 top-18 bottom-0 bg-slate-950/45 backdrop-blur-xs z-40"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden fixed inset-x-0 top-18 z-50 bg-white border-b border-slate-200 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
              >
                <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-6 space-y-4">
                  {/* Compact Flag Selector Row in Mobile Drawer */}
                  <div className="grid grid-cols-3 gap-2 pb-3 border-b border-slate-100">
                    {languageOptions.map((item) => {
                      const active = lang === item.code;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => handleSetLang(item.code)}
                          className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            active
                              ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          <LanguageFlag code={item.code} size="sm" />
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Primary Navigation List (4 Main Menu Items: About Us, Subbrands, News, Career) */}
                  <nav aria-label="Mobile Navigation" className="space-y-2.5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { href: '#about', label: t.navAbout },
                        ...(showSubbrandsSection
                          ? [{ href: '#subbrands', label: t.navSubbrands }]
                          : []),
                        { href: '#news', label: t.navNews },
                        { href: '#career', label: t.navCareer },
                      ].map((navItem) => (
                        <a
                          key={navItem.href}
                          href={navItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-slate-200/80 bg-white hover:border-[#0B3B60]/40 text-xs sm:text-sm font-bold text-slate-900 transition-colors"
                        >
                          <span className="truncate">{navItem.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </a>
                      ))}
                    </div>

                    <Link
                      href={`/portfolio?lang=${lang}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs sm:text-sm font-bold text-[#0B3B60] transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Pill className="w-4 h-4 text-[#0D9488]" />
                        <span>{t.navCatalog}</span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-slate-400">
                          ({PRODUCTS.length})
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#0D9488]" />
                    </Link>
                  </nav>

                  {/* Mobile Drawer Footer */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                    <a
                      href="tel:+998935056552"
                      className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-[#0B3B60] font-[family-name:var(--font-mono)] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0D9488]" />
                      <span>+998 93 505 65 52</span>
                    </a>

                    <a
                      href="#contacts"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082B47] text-xs font-bold text-white shadow-xs transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-teal-300" />
                      <span>{t.ctaContact}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          2. MAIN HERO SECTION (Synthon-Inspired Minimalist Elegance & Smooth Transitions)
         ===================================================================== */}
      <section
        id="top"
        ref={heroSectionRef}
        className="relative h-[calc(100dvh-4.5rem)] min-h-[560px] flex flex-col justify-between overflow-hidden bg-[#04101E] text-white"
      >
        {/* Full-Bleed Parallax Background Video + Refined Architectural Scrims */}
        <motion.div
          aria-hidden="true"
          style={{ scale: heroVideoScale, y: heroVideoY }}
          className="absolute inset-0 z-0 origin-center will-change-transform"
        >
          <video
            ref={heroVideoRef}
            src="/assets/video/warehouse-2-bg.mp4"
            poster="/assets/video/inso-warehouse-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Architectural Vignette — dense dark on left for high typography readability, smooth fade to transparent on right so warehouse is open */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101E]/95 via-[#04101E]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/80 via-transparent to-[#04101E]/20" />
        </motion.div>

        {/* Main Hero Foreground Content — Minimalist Editorial Typography */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 flex-1 flex flex-col justify-center"
        >
          {/* Left Column: Primary Typography & CTAs (Clean, Breathable Editorial) */}
          <div className="max-w-[720px] lg:max-w-[840px] xl:max-w-[880px]">
            {/* Minimal Kicker with Expanding Accent Line */}
            <div className="overflow-hidden mb-2.5 sm:mb-3.5">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-teal-300"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-8 h-[1.5px] bg-teal-400 origin-left inline-block"
                />
                <span>{t.sinceBadge}</span>
              </motion.div>
            </div>

            {/* Statement Display Headline with Signature Synthon Italic Accent (up to 64px on wide screens) */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '38%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.1rem,4.2vw,64px)] font-bold tracking-normal text-white leading-[1.08] lg:leading-[1.06]"
              >
                <span className="block">{t.heroHeadlineBefore}</span>
                <span className="block font-serif italic font-normal text-teal-200 tracking-normal">
                  {t.heroHeadlineItalic}
                </span>
                {t.heroHeadlineAfter ? (
                  <span className="block lg:whitespace-nowrap">
                    {t.heroHeadlineAfter}
                  </span>
                ) : (
                  ''
                )}
              </motion.h1>
            </div>

            {/* Single-Breath Sub-line (18px / 27px with elevated contrast) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[18px] leading-relaxed lg:leading-[27px] text-white/95 sm:text-slate-100 font-normal max-w-[56ch]"
            >
              {t.heroDescription}
            </motion.p>

            {/* Actions: Primary Button + Minimalist Text Link with ArrowUpRight */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-6 flex flex-wrap items-center gap-5 sm:gap-7"
            >
              <Link
                href={`/portfolio?lang=${lang}`}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-white hover:bg-teal-300 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap shadow-[0_14px_34px_-10px_rgba(255,255,255,0.28)]"
              >
                <span>{t.heroPrimaryBtn}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="#contacts"
                className="group relative inline-flex items-center gap-2 py-2 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                <span>{t.heroSecondaryBtn}</span>
                <ArrowUpRight className="w-4 h-4 text-teal-300 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-white/30 overflow-hidden">
                  <span className="block w-full h-full bg-teal-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </span>
              </a>
            </motion.div>

            {/* Secondary Quick Action: Company Licenses Link (mt-4 ~16px below buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <button
                type="button"
                onClick={() => setLicensesModalOpen(true)}
                className="group inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-slate-300/90 hover:text-white transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-300/90 group-hover:text-teal-300 transition-colors" />
                <span className="group-hover:underline underline-offset-4 decoration-teal-400/60">
                  {lang === 'ru'
                    ? 'Лицензии компании →'
                    : lang === 'uz'
                    ? 'Kompaniya litsenziyalari →'
                    : 'Company Licenses →'}
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Compact Video Play/Pause Toggle in bottom-right corner above Brand Bar */}
        <div className="absolute bottom-[58px] sm:bottom-[62px] right-4 sm:right-6 lg:right-8 z-20">
          <button
            type="button"
            onClick={toggleHeroVideo}
            aria-label={
              isVideoPlaying
                ? lang === 'ru'
                  ? 'Приостановить фоновое видео'
                  : lang === 'uz'
                  ? 'Videoni toʻxtatish'
                  : 'Pause background video'
                : lang === 'ru'
                ? 'Воспроизвести фоновое видео'
                : lang === 'uz'
                ? 'Videoni ijro etish'
                : 'Play background video'
            }
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#04101E]/75 hover:bg-[#04101E]/90 backdrop-blur-md border border-white/20 hover:border-teal-400 text-xs text-white/85 hover:text-white transition-all duration-200 cursor-pointer shadow-lg"
          >
            <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-teal-400/20 flex items-center justify-center transition-colors">
              {isVideoPlaying ? (
                <Pause className="w-2.5 h-2.5 text-teal-300" />
              ) : (
                <Play className="w-2.5 h-2.5 text-teal-300 ml-0.5" />
              )}
            </span>
            <span className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-300 group-hover:text-teal-200 hidden sm:inline">
              {isVideoPlaying
                ? lang === 'ru'
                  ? 'Пауза'
                  : lang === 'uz'
                  ? 'Toʻxtatish'
                  : 'Pause'
                : lang === 'ru'
                ? 'Видео'
                : lang === 'uz'
                ? 'Ijro'
                : 'Play'}
            </span>
          </button>
        </div>

        {/* Transparent Click-Catcher (closes popovers outside without dimming screen or interrupting video) */}
        {activeBrandPopover && (
          <div
            className="fixed inset-0 z-30 pointer-events-auto"
            onClick={() => setActiveBrandPopover(null)}
          />
        )}

        {/* Bottom Brands Bar (Semi-transparent dark-navy pinned to bottom of Hero) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 border-t border-white/15 bg-[#04101E]/75 backdrop-blur-md"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop View (>= 1024px): "Наши бренды" + 6 clickable names in one row */}
            <div className="hidden lg:flex items-center justify-between py-3">
              <div className="flex items-center gap-4 xl:gap-6 w-full min-w-0">
                <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300 font-[family-name:var(--font-mono)] whitespace-nowrap">
                    {lang === 'ru'
                      ? 'Наши бренды'
                      : lang === 'uz'
                      ? 'Bizning brendlar'
                      : 'Our Brands'}
                  </span>
                </div>

                {/* 6 Clickable Brand Names */}
                <div className="flex items-center gap-1 xl:gap-2 flex-1 justify-between min-w-0">
                  {HERO_BRAND_ITEMS.map((item, index) => {
                    const isSelected = activeBrandPopover === item.id;
                    const sb = SUBBRANDS.find((s) => s.id === item.id);
                    if (!sb) return null;

                    // Clamping popover to stay within viewport bounds:
                    // First brand (inom) aligned left-0
                    // Last brand (service) aligned right-0
                    // Middle brands centered
                    const alignmentClasses =
                      index === 0
                        ? 'left-0 origin-bottom-left'
                        : index === HERO_BRAND_ITEMS.length - 1
                        ? 'right-0 origin-bottom-right'
                        : 'left-1/2 -translate-x-1/2 origin-bottom';

                    return (
                      <div key={item.id} className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveBrandPopover(isSelected ? null : item.id);
                          }}
                          className={`group relative py-1.5 px-2 xl:px-3 text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer rounded-lg whitespace-nowrap ${
                            isSelected
                              ? 'text-white bg-white/[0.08]'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <span>{item.displayName}</span>
                          {/* Subtle teal underline for selected brand */}
                          <span
                            className={`absolute bottom-0 left-2 right-2 h-[2px] bg-teal-400 rounded-full transition-all duration-300 ${
                              isSelected
                                ? 'opacity-100 scale-x-100'
                                : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75'
                            }`}
                          />
                        </button>

                        {/* Compact Popover Card above the bar */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.96 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute bottom-full mb-3 z-40 w-[320px] sm:w-[360px] max-w-[calc(100vw-2rem)] p-4 rounded-2xl bg-[#07182C]/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)] text-left ${alignmentClasses}`}
                            >
                              <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-white/10">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                                      {sb.shortCode}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-200 border border-teal-400/20 font-medium">
                                      {sb.badge[lang] || sb.badge.ru}
                                    </span>
                                  </div>
                                  <h4 className="mt-1 text-sm font-bold text-white tracking-normal">
                                    {item.displayName}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setActiveBrandPopover(null)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                  aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed line-clamp-3">
                                {sb.description[lang] || sb.description.ru}
                              </p>

                              <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-[family-name:var(--font-mono)]">
                                  {sb.skuCountLabel[lang] || sb.skuCountLabel.ru}
                                </span>
                                <Link
                                  href={`/portfolio?subbrand=${sb.id}&lang=${lang}`}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors group/link"
                                >
                                  <span>
                                    {lang === 'ru'
                                      ? 'В портфель бренда'
                                      : lang === 'uz'
                                      ? 'Brend portfeli'
                                      : 'Brand Portfolio'}
                                  </span>
                                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Responsive Mode (< 1024px): Single Button */}
            <div className="flex lg:hidden items-center justify-start py-2.5">
              <button
                type="button"
                onClick={() => setMobileBrandsDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>
                  {lang === 'ru'
                    ? 'Бренды холдинга · 6'
                    : lang === 'uz'
                    ? 'Xolding brendlari · 6'
                    : 'Holding Brands · 6'}
                </span>
                <ChevronUp className="w-3.5 h-3.5 text-teal-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mobile / Tablet Brands Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {mobileBrandsDrawerOpen && (
          <>
            {/* Dimmed backdrop for mobile bottom sheet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileBrandsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-up Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] flex flex-col rounded-t-3xl bg-[#07182C] border-t border-white/20 text-white shadow-2xl lg:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {lang === 'ru'
                      ? 'Бренды холдинга INSO'
                      : lang === 'uz'
                      ? 'INSO xolding brendlari'
                      : 'INSO Holding Brands'}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-300 border border-teal-400/20 font-[family-name:var(--font-mono)]">
                    6
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileBrandsDrawerOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Accordion Body */}
              <div className="p-4 sm:p-5 overflow-y-auto divide-y divide-white/10">
                {HERO_BRAND_ITEMS.map((item) => {
                  const isExpanded = mobileAccordionBrand === item.id;
                  const sb = SUBBRANDS.find((s) => s.id === item.id);
                  if (!sb) return null;

                  return (
                    <div key={item.id} className="py-3 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileAccordionBrand(isExpanded ? null : item.id)
                        }
                        className="w-full flex items-center justify-between py-1 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold text-teal-300 w-14 shrink-0">
                            {sb.shortCode}
                          </span>
                          <span
                            className={`text-sm font-semibold transition-colors ${
                              isExpanded ? 'text-teal-200' : 'text-white'
                            }`}
                          >
                            {item.displayName}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                            isExpanded ? 'rotate-180 text-teal-300' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pt-2 pb-1 pl-3.5 border-l-2 border-teal-400/40 ml-2"
                          >
                            <div className="text-[11px] font-medium text-teal-300 mb-1">
                              {sb.badge[lang] || sb.badge.ru}
                            </div>
                            <p className="text-xs text-slate-300/90 leading-relaxed">
                              {sb.description[lang] || sb.description.ru}
                            </p>
                            <div className="mt-3">
                              <Link
                                href={`/portfolio?subbrand=${sb.id}&lang=${lang}`}
                                onClick={() => setMobileBrandsDrawerOpen(false)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                              >
                                <span>
                                  {lang === 'ru'
                                    ? 'Смотреть продукцию бренда'
                                    : lang === 'uz'
                                    ? 'Brend mahsulotlarini koʻrish'
                                    : 'View Brand Products'}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================================
          2.4 COMPACT COMPANY LICENSES & CERTIFICATES MODAL DIALOG
         ===================================================================== */}
      <AnimatePresence>
        {licensesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Dark translucent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLicensesModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-3xl bg-[#07182C] border border-white/20 p-5 sm:p-7 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-400/10 border border-teal-400/30 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-normal">
                      {lang === 'ru'
                        ? 'Лицензии и сертификаты компании'
                        : lang === 'uz'
                        ? 'Kompaniyaning litsenziya va sertifikatlari'
                        : 'Company Licenses & Certificates'}
                    </h3>
                    <p className="text-xs text-slate-300/80 mt-0.5">
                      {lang === 'ru'
                        ? 'Официальные государственные и международные разрешительные документы INSO Group'
                        : lang === 'uz'
                        ? 'INSO Group kompaniyasining rasmiy davlat va xalqaro ruxsatnomalari'
                        : 'Official state and international regulatory credentials of INSO Group'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLicensesModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
                  aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Documents List */}
              <div className="py-4 space-y-3.5 overflow-y-auto divide-y divide-white/10">
                {COMPANY_LICENSES.map((doc) => (
                  <div
                    key={doc.id}
                    className="pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-400/30 transition-all"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-white">
                          {doc.title[lang] || doc.title.ru}
                        </span>
                        {doc.fileSize && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-400/10 text-teal-300 border border-teal-400/20 font-[family-name:var(--font-mono)]">
                            {doc.fileSize}
                          </span>
                        )}
                        {doc.statusLabel && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                            {doc.statusLabel[lang] || doc.statusLabel.ru}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-teal-200/90 font-medium">
                        {doc.authority[lang] || doc.authority.ru}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed">
                        {doc.details[lang] || doc.details.ru}
                      </p>
                    </div>

                    <div className="shrink-0 sm:self-center">
                      {doc.fileUrl ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-teal-400/15 hover:bg-teal-400/25 border border-teal-400/30 text-xs font-semibold text-teal-200 hover:text-white transition-all whitespace-nowrap shadow-xs"
                        >
                          <span>
                            {lang === 'ru'
                              ? 'Открыть документ'
                              : lang === 'uz'
                              ? 'Hujjatni ochish'
                              : 'Open Document'}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-teal-300" />
                        </a>
                      ) : (
                        <a
                          href="#contacts"
                          onClick={() => setLicensesModalOpen(false)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-slate-200 hover:text-white transition-colors"
                        >
                          <span>
                            {lang === 'ru'
                              ? 'Запросить скан'
                              : lang === 'uz'
                              ? 'Nusxa soʻrash'
                              : 'Request Copy'}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>
                    {lang === 'ru'
                      ? 'Оригиналы документов зарегистрированы в Минздраве РУз'
                      : lang === 'uz'
                      ? 'Hujjatlarning asl nusxalari OʻzR SSVda roʻyxatdan oʻtgan'
                      : 'Original credentials registered with MoH Uzbekistan'}
                  </span>
                </div>
                <a
                  href="#contacts"
                  onClick={() => setLicensesModalOpen(false)}
                  className="text-teal-300 hover:text-teal-200 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>
                    {lang === 'ru'
                      ? 'Запросить пакет документов'
                      : lang === 'uz'
                      ? 'Toʻliq paketni soʻrash'
                      : 'Request Full Package'}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          2.5 REGULATORY & TRUST CREDENTIALS BANNER (Licenses, Logistics & Direct Contracts)
         ===================================================================== */}
      <section
        id="credentials"
        className="relative z-10 bg-[#06182C] border-b border-white/10 text-white py-6 sm:py-8 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Pillar 01: License from Ministry of Health */}
            <a
              href="#contacts"
              className="group relative pt-4 md:pt-0 md:px-6 first:pl-0 hover:bg-white/[0.03] rounded-2xl p-4 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>
                    {lang === 'ru'
                      ? '01 · Госрегуляторика'
                      : lang === 'uz'
                      ? '01 · Davlat regulyatorikasi'
                      : '01 · Regulatory Affairs'}
                  </span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  РУз
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-teal-200 transition-colors flex items-center justify-between gap-2">
                  <span>
                    {lang === 'ru'
                      ? 'Лицензия Минздрава РУз · Фармкомитет'
                      : lang === 'uz'
                      ? 'OʻzR SSV litsenziyasi · Farmkomitet'
                      : 'MoH License & Pharma Committee'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-teal-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <p className="mt-1 text-xs text-slate-300/80 leading-relaxed">
                  {lang === 'ru'
                    ? 'Официальный фармимпортёр и дистрибьютор. Полный аудит фармдеятельности и регистрация ЛС.'
                    : lang === 'uz'
                    ? 'Rasmiy farm-importyor va distribyutor. Toʻliq farm-audit va dori vositalarini roʻyxatdan oʻtkazish.'
                    : 'Officially licensed pharmaceutical importer and distributor in Uzbekistan.'}
                </p>
              </div>
            </a>

            {/* Pillar 02: Standards GDP & WHO-GMP */}
            <a
              href="#about"
              className="group relative pt-4 md:pt-0 md:px-6 hover:bg-white/[0.03] rounded-2xl p-4 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>
                    {lang === 'ru'
                      ? '02 · Качество & Логистика'
                      : lang === 'uz'
                      ? '02 · Sifat va Logistika'
                      : '02 · Quality & Logistics'}
                  </span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  10 000 м²
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-teal-200 transition-colors flex items-center justify-between gap-2">
                  <span>
                    {lang === 'ru'
                      ? 'Стандарты GDP & WHO-GMP'
                      : lang === 'uz'
                      ? 'GDP & WHO-GMP standartlari'
                      : 'GDP & WHO-GMP Standards'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-teal-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <p className="mt-1 text-xs text-slate-300/80 leading-relaxed">
                  {lang === 'ru'
                    ? 'Холодовая цепь (+2…+8 °C), адресный EPAL-хаб в Ташкенте и валидированный спецтранспорт.'
                    : lang === 'uz'
                    ? 'Sovuqlik zanjiri (+2…+8 °C), Toshkentdagi EPAL xabi va sertifikatlangan maxsus transport.'
                    : 'Validated cold chain (+2…+8 °C) with 10,000 m² EPAL warehouse in Tashkent.'}
                </p>
              </div>
            </a>

            {/* Pillar 03: Direct Import China & India */}
            <Link
              href={`/portfolio?lang=${lang}`}
              className="group relative pt-4 md:pt-0 md:px-6 hover:bg-white/[0.03] rounded-2xl p-4 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  <Globe className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>
                    {lang === 'ru'
                      ? '03 · Прямой импорт'
                      : lang === 'uz'
                      ? '03 · Toʻgʻridan-toʻgʻri import'
                      : '03 · Direct Factory Supply'}
                  </span>
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <span title="Китай">🇨🇳</span>
                  <span title="Индия">🇮🇳</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    70+ SKU
                  </span>
                </div>
              </div>
              <div className="mt-2.5">
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-teal-200 transition-colors flex items-center justify-between gap-2">
                  <span>
                    {lang === 'ru'
                      ? 'Прямые контракты: Китай и Индия'
                      : lang === 'uz'
                      ? 'Toʻgʻridan-toʻgʻri import: Xitoy va Hindiston'
                      : 'Direct Import: China & India'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-teal-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <p className="mt-1 text-xs text-slate-300/80 leading-relaxed">
                  {lang === 'ru'
                    ? 'Оригинальные партии напрямую с фармзаводов без посредников с подтверждённым контролем серий.'
                    : lang === 'uz'
                    ? 'Vositachilarsiz toʻgʻridan-toʻgʻri farmatsevtika zavodlaridan asl partiyalar.'
                    : 'Direct supply contracts with certified pharmaceutical plants in China and India.'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ABOUT US (#about): SYNTHON-INSPIRED EDITORIAL HERITAGE + CHRONOLOGY
         ===================================================================== */}
      <section
        id="about"
        className="py-20 sm:py-24 lg:py-28 bg-white border-b border-slate-200/80 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {/* Part 1: Editorial Header — Synthon Typography & Clean Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="inline-flex items-center gap-3 text-xs font-semibold text-[#0D9488] uppercase tracking-[0.2em]">
                <span className="w-6 h-[1.5px] bg-[#0D9488] inline-block" />
                <span>
                  {lang === 'ru'
                    ? '01. О компании · История с 2017 года'
                    : lang === 'uz'
                    ? '01. Kompaniya haqida · 2017-yildan buyon'
                    : '01. About Us · Heritage Since 2017'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
                {lang === 'ru' ? (
                  <>
                    От первого контракта до{' '}
                    <em className="font-serif italic font-normal text-[#0D9488]">
                      национального холдинга
                    </em>
                  </>
                ) : lang === 'uz' ? (
                  <>
                    Ilk distribyutsiya shartnomasidan{' '}
                    <em className="font-serif italic font-normal text-[#0D9488]">
                      milliy farmxoldinggacha
                    </em>
                  </>
                ) : (
                  <>
                    From First Contract to a{' '}
                    <em className="font-serif italic font-normal text-[#0D9488]">
                      Nationwide Pharma Holding
                    </em>
                  </>
                )}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed"
            >
              <p>
                {lang === 'ru'
                  ? 'Основанная в 2017 году в Ташкенте, компания INSO Group прошла путь от специализированного дистрибьютора до многопрофильного холдинга из шести специализированных субрендов. Сегодня мы объединяем прямые контракты с фармзаводами Китая, Индии и Европы, собственный GDP-складской комплекс 10 000 м² и разветвлённую сеть медицинской промоции.'
                  : lang === 'uz'
                  ? '2017-yilda Toshkentda tashkil etilgan INSO Group ixtisoslashgan distribyutordan oltita yoʻnalishli sub-brendni birlashtirgan xoldingga aylandi. Bugun biz Xitoy, Hindiston va Yevropa farmzavodlari bilan toʻgʻridan-toʻgʻri shartnomalar, 10 000 m² xususiy GDP ombor majmuasi va keng qamrovli tibbiy targʻibot tarmogʻini birlashtiramiz.'
                  : 'Founded in 2017 in Tashkent, INSO Group has evolved from a pharmaceutical distributor into a multi-division holding uniting six specialized sub-brands. Today, we bridge direct GMP contracts from China, India, and Europe with a proprietary 10,000 m² GDP warehouse and nationwide promotion.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-slate-800">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                  <span>
                    {lang === 'ru'
                      ? 'Лицензия Минздрава РУз'
                      : lang === 'uz'
                      ? 'OʻzR SSV litsenziyasi'
                      : 'MoH License · Uzbekistan'}
                  </span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                  <span>
                    {lang === 'ru'
                      ? 'Стандарты GDP & WHO-GMP'
                      : lang === 'uz'
                      ? 'GDP & WHO-GMP standartlari'
                      : 'GDP & WHO-GMP Compliant'}
                  </span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0D9488]" />
                  <span>
                    {lang === 'ru'
                      ? 'Ташкент, ул. Богишамол, 160'
                      : lang === 'uz'
                      ? 'Toshkent, Bogʻishamol koʻch., 160'
                      : 'Tashkent, Bogishamol 160'}
                  </span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Part 2: Interactive Synthon-Style 5-Stage Timeline (Scroll-Linked Linear Entrance) */}
          <div className="relative pt-6 sm:pt-8">
            {/* Horizontal Continuous Progress Line (Desktop) */}
            <div className="hidden lg:block absolute top-[43px] left-0 right-0 h-[2px] bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-gradient-to-r from-[#0D9488] via-[#0B3B60] to-[#0D9488] origin-left"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
              {[
                {
                  year: '2017',
                  tag:
                    lang === 'ru'
                      ? 'Основание'
                      : lang === 'uz'
                      ? 'Asos solinishi'
                      : 'Foundation',
                  title:
                    lang === 'ru'
                      ? 'Старт в Ташкенте'
                      : lang === 'uz'
                      ? 'Toshkentda start'
                      : 'Operations in Tashkent',
                  desc:
                    lang === 'ru'
                      ? 'Регистрация компании, первые прямые контракты с производителями и запуск оптовой фармдистрибуции.'
                      : lang === 'uz'
                      ? 'Kompaniya roʻyxatdan oʻtkazildi, zavodlar bilan ilk shartnomalar va ulgurji distribyutsiya yoʻlga qoʻyildi.'
                      : 'Foundation in Tashkent, securing initial direct manufacturer contracts and launching wholesale supply.',
                  status: 'past',
                },
                {
                  year: '2021',
                  tag:
                    lang === 'ru'
                      ? 'Охват'
                      : lang === 'uz'
                      ? 'Qamrov'
                      : 'Nationwide Reach',
                  title:
                    lang === 'ru'
                      ? '13 регионов Узбекистана'
                      : lang === 'uz'
                      ? '13 ta hududiy vakolatxona'
                      : '13 Regional Offices',
                  desc:
                    lang === 'ru'
                      ? 'Формирование собственной сети медицинских представителей во всех вилоятах страны и регулярные поставки в аптеки.'
                      : lang === 'uz'
                      ? 'Respublikaning barcha hududlarida tibbiy vakillar jamoalari va dorixonalar bilan tizimli taʼminot yoʻlga qoʻyildi.'
                      : 'Proprietary field medical rep teams deployed across all 13 regions with direct pharmacy fulfillment.',
                  status: 'past',
                },
                {
                  year: '2024',
                  tag:
                    lang === 'ru'
                      ? 'Инфраструктура'
                      : lang === 'uz'
                      ? 'Infratuzilma'
                      : 'Infrastructure',
                  title:
                    lang === 'ru'
                      ? 'GDP-комплекс 10 000 м²'
                      : lang === 'uz'
                      ? '10 000 m² GDP ombor'
                      : '10,000 m² GDP Hub',
                  desc:
                    lang === 'ru'
                      ? 'Запуск собственного логистического комплекса класса «А» с валидированной холодовой цепью (+2…+8 °C).'
                      : lang === 'uz'
                      ? '+2…+8 °C validatsiyalangan sovuqlik zanjiriga ega «A» toifali zamonaviy logistika xabi ishga tushirildi.'
                      : 'Commissioning of a Class-A warehouse complex with continuous cold chain (+2…+8 °C) and high-bay storage.',
                  status: 'past',
                },
                {
                  year: '2026',
                  tag:
                    lang === 'ru'
                      ? 'Холдинг'
                      : lang === 'uz'
                      ? 'Xolding'
                      : 'Ecosystem',
                  title:
                    lang === 'ru'
                      ? '6 специализированных суббрендов'
                      : lang === 'uz'
                      ? '6 ta ixtisoslashgan sub-brend'
                      : '6 Dedicated Sub-brands',
                  desc:
                    lang === 'ru'
                      ? 'Полный цикл: дистрибуция, медпромоция, маркетинг и регистрация. Портфель 70+ SKU (Китай, Индия, ЕС).'
                      : lang === 'uz'
                      ? 'Toʻliq sikl: distribyutsiya, medpromotsiya, marketing va registratsiya. 70+ SKU portfeli (Xitoy, Hindiston, YeI).'
                      : 'Full-cycle holding: distribution, medical promotion, regulatory affairs. 70+ SKU portfolio from China, India, and EU.',
                  status: 'current',
                },
                {
                  year: '2029',
                  tag:
                    lang === 'ru'
                      ? 'Стратегия'
                      : lang === 'uz'
                      ? 'Strategiya'
                      : 'Vision 2029',
                  title:
                    lang === 'ru'
                      ? 'Экспансия в Центральную Азию'
                      : lang === 'uz'
                      ? 'Markaziy Osiyoga chiqish'
                      : 'Central Asia Expansion',
                  desc:
                    lang === 'ru'
                      ? 'Партнёр первого выбора для мировых производителей при выводе препаратов на рынки стран Центральной Азии.'
                      : lang === 'uz'
                      ? 'Jahon ishlab chiqaruvchilari Markaziy Osiyo bozorlariga chiqishda birinchi boʻlib tanlaydigan xalqaro hamkor.'
                      : 'The partner of choice for global pharmaceutical manufacturers entering the Central Asian healthcare markets.',
                  status: 'future',
                },
              ].map((milestone, idx) => {
                const isCurrent = milestone.status === 'current';
                const isFuture = milestone.status === 'future';

                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-slate-50/90 border-2 border-[#0D9488]/40 shadow-[0_12px_30px_-10px_rgba(13,148,136,0.12)]'
                        : isFuture
                        ? 'bg-white border border-dashed border-slate-300/90'
                        : 'bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Node Dot with Animated Pulse on Current */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-3 h-3 rounded-full flex items-center justify-center ${
                            isCurrent
                              ? 'bg-[#0D9488] ring-4 ring-[#0D9488]/20'
                              : isFuture
                              ? 'bg-slate-300 border-2 border-white'
                              : 'bg-[#0B3B60]'
                          }`}
                        />
                        <span className="font-[family-name:var(--font-mono)] tabular-nums text-xl sm:text-2xl font-extrabold text-[#0B3B60]">
                          {milestone.year}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                          isCurrent
                            ? 'text-[#0D9488] px-2 py-0.5 rounded-full bg-[#0D9488]/10'
                            : 'text-slate-400'
                        }`}
                      >
                        {milestone.tag}
                      </span>
                    </div>

                    <div className="mt-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {milestone.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                          {milestone.desc}
                        </p>
                      </div>

                      {isCurrent && (
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#0D9488]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
                          <span>
                            {lang === 'ru'
                              ? 'Текущий статус'
                              : lang === 'uz'
                              ? 'Hozirgi holat'
                              : 'Current Status'}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Part 3: Scale in Numbers (Clean Open Typographic Band with Hairline Dividers) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="py-8 sm:py-10 border-y border-slate-200/90 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/80"
          >
            {[
              {
                target: 10000,
                suffix: lang === 'ru' ? ' м²' : ' m²',
                kicker: 'GDP +2…+8 °C',
                label:
                  lang === 'ru'
                    ? 'Складской комплекс в Ташкенте'
                    : lang === 'uz'
                    ? 'Toshkentdagi ombor majmuasi'
                    : 'Class-A Warehouse in Tashkent',
              },
              {
                target: 70,
                suffix: '+',
                kicker:
                  lang === 'ru'
                    ? 'Rx · OTC · БАД'
                    : lang === 'uz'
                    ? 'Rx · OTC · BFQ'
                    : 'Rx · OTC · Supplements',
                label:
                  lang === 'ru'
                    ? 'Препаратов в портфеле'
                    : lang === 'uz'
                    ? 'Portfeldagi preparatlar'
                    : 'Medicines & Health Products',
              },
              {
                target: 13,
                suffix: '',
                kicker:
                  lang === 'ru'
                    ? 'Узбекистан'
                    : lang === 'uz'
                    ? 'Oʻzbekiston'
                    : 'Uzbekistan',
                label:
                  lang === 'ru'
                    ? 'Регионов национального охвата'
                    : lang === 'uz'
                    ? 'Milliy qamrovdagi hudud'
                    : 'Regions of Nationwide Reach',
              },
              {
                target: 6,
                suffix: '',
                kicker: 'China · India · EU',
                label:
                  lang === 'ru'
                    ? 'Стран прямого импорта'
                    : lang === 'uz'
                    ? 'Toʻgʻridan-toʻgʻri import mamlakati'
                    : 'Direct Import Countries',
              },
              {
                target: 6,
                suffix: '',
                kicker: 'INSO Ecosystem',
                label:
                  lang === 'ru'
                    ? 'Специализированных суббрендов'
                    : lang === 'uz'
                    ? 'Ixtisoslashgan sub-brend'
                    : 'Specialized Sub-brands',
              },
            ].map((stat, sIdx) => (
              <motion.div
                key={stat.kicker}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.55,
                  delay: sIdx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-5 sm:p-6 flex flex-col justify-between first:pl-0 last:pr-0"
              >
                <div className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider font-[family-name:var(--font-mono)]">
                  {stat.kicker}
                </div>
                <div className="mt-3">
                  <div className="font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B60] tracking-tight leading-none">
                    <AnimatedMetricValue target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Part 4: Editorial Split — Authentic Warehouse Infrastructure + Mission / Vision 2029 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Authentic GDP Warehouse Photo Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-7 min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden border border-slate-200/90 bg-[#04101E] flex flex-col justify-between shadow-lg"
            >
              <Image
                src="/assets/photos/gdp-pallet-amgv.jpg"
                alt={
                  lang === 'ru'
                    ? 'GDP-склад INSO Group 10 000 м² — высотное паллетное хранение'
                    : lang === 'uz'
                    ? 'INSO Group 10 000 m² GDP ombori — palletli saqlash'
                    : 'INSO Group 10,000 m² GDP warehouse'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              {/* Deep Legibility Scrim — ensures crystal clear text over bright cardboard boxes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E] via-[#04101E]/65 to-[#04101E]/20" />

              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#04101E]/85 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-teal-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>GDP LOGISTICS HUB · 10 000 M²</span>
                </span>
                <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] text-white/90">
                  EPAL · +15…+25 °C / +2…+8 °C
                </span>
              </div>

              <div className="relative z-10 p-6 sm:p-8 text-white space-y-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Собственная фармацевтическая инфраструктура'
                    : lang === 'uz'
                    ? 'Xususiy farmatsevtika infratuzilmasi'
                    : 'Proprietary Healthcare Infrastructure'}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-normal leading-snug">
                  {lang === 'ru'
                    ? 'Складской комплекс 10 000 м² по стандарту GDP'
                    : lang === 'uz'
                    ? 'GDP standartidagi 10 000 m² ombor majmuasi'
                    : '10,000 m² GDP-Compliant Logistics Hub'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 font-normal leading-relaxed max-w-xl">
                  {lang === 'ru'
                    ? 'Адресное высотное паллетное хранение, валидированная холодовая цепь (+2…+8 °C) и сквозной партионный контроль каждой серии.'
                    : lang === 'uz'
                    ? 'Manzilli baland palletli saqlash, validatsiyalangan sovuqlik zanjiri (+2…+8 °C) va har bir partiyaning toʻliq nazorati.'
                    : 'High-bay pallet storage, continuous validated cold chain (+2…+8 °C), and strict batch-level quality tracking.'}
                </p>
              </div>
            </motion.div>

            {/* Right: Integrated Mission & Vision 2029 Card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-3xl bg-[#0B3B60] text-white p-7 sm:p-9 flex flex-col justify-between shadow-xl space-y-8"
            >
              {/* Mission */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 tracking-[0.16em] uppercase">
                  <Compass className="w-4 h-4" />
                  <span>
                    {lang === 'ru'
                      ? 'Миссия холдинга'
                      : lang === 'uz'
                      ? 'Xolding missiyasi'
                      : 'Corporate Mission'}
                  </span>
                </div>
                <blockquote className="text-base sm:text-lg lg:text-xl font-normal text-slate-100 leading-relaxed">
                  «
                  {lang === 'ru' ? (
                    <>
                      Открываем людям доступ к{' '}
                      <em className="font-serif italic font-normal text-teal-200">
                        качественным лекарствам
                      </em>{' '}
                      и продуктам для здоровья: надёжно доводим их от мирового производителя до пациента.
                    </>
                  ) : lang === 'uz' ? (
                    <>
                      Odamlarga{' '}
                      <em className="font-serif italic font-normal text-teal-200">
                        sifatli dori vositalari
                      </em>{' '}
                      va salomatlik mahsulotlariga yoʻl ochamiz: ularni ishlab chiqaruvchidan bemorgacha yetkazamiz.
                    </>
                  ) : (
                    <>
                      We expand access to{' '}
                      <em className="font-serif italic font-normal text-teal-200">
                        quality medicines
                      </em>{' '}
                      and health products: delivering them reliably from manufacturer to patient.
                    </>
                  )}
                  »
                </blockquote>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-teal-200 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>
                      {lang === 'ru'
                        ? 'Слоган: «От производителя — до пациента.»'
                        : lang === 'uz'
                        ? 'Shior: «Ishlab chiqaruvchidan — bemorgacha.»'
                        : 'Slogan: “From manufacturer to patient.”'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Hairline Divider */}
              <div className="border-t border-white/15 pt-6 space-y-3.5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 tracking-[0.16em] uppercase">
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    {lang === 'ru'
                      ? 'Видение 2029 · Стратегия'
                      : lang === 'uz'
                      ? 'Nigoh 2029 · Strategiya'
                      : 'Vision 2029 · Strategic Horizon'}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
                  {lang === 'ru'
                    ? 'К 2029 году — международный холдинг, который фармпроизводители выбирают первым для выхода на рынки Центральной Азии.'
                    : lang === 'uz'
                    ? '2029-yilga kelib — farmatsevtika ishlab chiqaruvchilari Markaziy Osiyo bozorlariga chiqishda birinchi boʻlib tanlaydigan xalqaro xolding.'
                    : 'By 2029 — an international holding chosen first by global pharma manufacturers to enter Central Asian markets.'}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-teal-300/90 font-[family-name:var(--font-mono)] border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>2017 Ташкент</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
                    <span>2029 Центральная Азия</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SUBBRANDS (#subbrands): 3 DIRECTIONS & 6 SUB-BRANDS ECOSYSTEM
          (Deactivated by default; revealed via double-click on "НАДЁЖНОСТЬ · ОТВЕТСТВЕННОСТЬ" in #values)
         ===================================================================== */}
      {showSubbrandsSection && <InsoHoldingStructureScroll lang={lang} />}

      {/* =====================================================================
          5. CORE VALUES (#values): IMMEDIATELY AFTER SUBBRANDS (04 ЦЕННОСТИ INSO GROUP)
         ===================================================================== */}
      <section
        id="values"
        className="relative py-16 sm:py-20 lg:py-24 bg-[#0B2545] text-white border-b border-slate-800 overflow-hidden"
      >
        <MedicalAmbientBackground variant="dark" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-teal-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {lang === 'ru'
                    ? '04. Ценности INSO Group · Как мы принимаем решения'
                    : lang === 'uz'
                    ? '04. INSO Group qadriyatlari · Qanday qaror qabul qilamiz'
                    : '04. INSO Group Core Values · How We Make Decisions'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight text-balance">
                {lang === 'ru'
                  ? '«Бережём доверие, берём ответственность, опираемся на факты, доводим до конца, видим дальше, ценим людей.»'
                  : lang === 'uz'
                  ? '«Ishonchni asraymiz, masʼuliyatli ishlaymiz, dalillarga tayanamiz, oxirigacha yetkazamiz, uzoqni koʻramiz, insonni qadrlaymiz.»'
                  : '“We safeguard trust, take ownership, rely on facts, see it through, look further and value people.”'}
              </h2>
            </div>

            {/* Interactive Mode Toggle: Concise Website View vs. Behavioral "We Do / We Don't" View */}
            <div className="inline-flex items-center bg-[#081C36] border border-white/15 p-1 rounded-xl shrink-0 self-start">
              <button
                type="button"
                onClick={() => setShowBehavioralValues(false)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  !showBehavioralValues
                    ? 'bg-teal-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lang === 'ru'
                  ? 'Коротко (6)'
                  : lang === 'uz'
                  ? 'Qisqacha (6)'
                  : 'Overview (6)'}
              </button>
              <button
                type="button"
                onClick={() => setShowBehavioralValues(true)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  showBehavioralValues
                    ? 'bg-teal-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lang === 'ru'
                  ? 'В поведении: Делаем / Не делаем'
                  : lang === 'uz'
                  ? 'Amalda: Qilamiz / Qilmaymiz'
                  : 'In Action: We Do / We Don’t'}
              </button>
            </div>
          </div>

          {/* Priority Rule Banner (Clean Hairline Callout) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-teal-400/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-extrabold text-teal-300 uppercase tracking-wider">
                {lang === 'ru'
                  ? 'Правило приоритета (Фундамент 01 — «Бережём доверие»)'
                  : lang === 'uz'
                  ? 'Ustuvorlik qoidasi (Fundament 01 — «Ishonchni asraymiz»)'
                  : 'Priority Rule (Foundation 01 — “We safeguard trust”)'}
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-medium">
                {lang === 'ru'
                  ? 'Если ценности вступают в конфликт, побеждает эта: скорость, план и прибыль никогда не важнее качества, безопасности и этики.'
                  : lang === 'uz'
                  ? 'Agar qadriyatlar toʻqnash kelsa, shu qadriyat ustun keladi: tezlik, reja va foyda hech qachon sifat, xavfsizlik va axloqdan muhim emas.'
                  : 'If values ever conflict, this one wins: speed, targets, and profit never outweigh quality, patient safety, and ethics.'}
              </p>
            </div>
            <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-teal-300 shrink-0 self-start sm:self-center">
              Foundation #01
            </span>
          </div>

          {/* 6 Core Values Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {CORE_VALUES.map((val, idx) => {
              const isOwnershipTrigger = val.id === 'ownership';
              return (
                <motion.div
                  key={val.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  onDoubleClick={
                    isOwnershipTrigger ? handleToggleSubbrandsSection : undefined
                  }
                  className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                    isOwnershipTrigger ? 'select-none' : ''
                  } ${
                    val.isFoundation
                      ? 'bg-gradient-to-br from-teal-500/20 via-[#081C36] to-sky-500/15 border-teal-400/60 shadow-[0_18px_40px_-12px_rgba(13,148,136,0.35)] ring-1 ring-teal-400/30'
                      : 'bg-[#081C36]/90 border-white/12 hover:border-teal-400/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <span
                        className={`font-[family-name:var(--font-mono)] text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                          val.isFoundation
                            ? 'bg-teal-400 text-slate-950'
                            : 'bg-white/10 text-teal-300'
                        }`}
                      >
                        {val.number}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold tracking-wider text-teal-300 uppercase text-right ${
                          isOwnershipTrigger ? 'cursor-pointer select-none' : ''
                        }`}
                      >
                        {val.keywords[lang]}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-white">
                      {val.title[lang]}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {val.description[lang]}
                    </p>
                  </div>

                {showBehavioralValues && (
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-3 text-xs">
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300">
                        {lang === 'ru'
                          ? 'Мы делаем:'
                          : lang === 'uz'
                          ? 'Biz qilamiz:'
                          : 'We do:'}
                      </div>
                      {val.weDo[lang].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-200">
                          <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300">
                        {lang === 'ru'
                          ? 'Мы не делаем:'
                          : lang === 'uz'
                          ? 'Biz qilmaymiz:'
                          : 'We don’t:'}
                      </div>
                      {val.weDont[lang].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-300">
                          <Minus className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. THERAPEUTIC LINES VISUAL SHOWCASE & CLINICAL NEWS (#news)
         ===================================================================== */}
      <section
        id="news"
        className="relative py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="text-xs font-extrabold text-[#0D9488] uppercase tracking-wider">
                {t.newsBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
                {t.newsTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t.newsSubtitle}
              </p>
            </div>

            <Link
              href={`/portfolio?lang=${lang}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0B3B60] text-xs font-bold text-[#0B3B60] hover:text-white border border-slate-200/90 transition-colors self-start lg:self-auto shrink-0"
            >
              <span>{t.navCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Visual Diversity Strip: 4 Real Therapeutic Line Photography Tiles (Featuring Authentic Warehouse & Greenwell Photos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                category: 'cardiology',
                image: '/assets/pharma/cardio_neuro.jpg',
                title:
                  lang === 'ru'
                    ? 'Кардиология и неврология'
                    : lang === 'uz'
                    ? 'Kardiologiya va nevrologiya'
                    : 'Cardiology & Neurology',
                subtitle:
                  lang === 'ru'
                    ? 'Госпитальные и рецептурные схемы'
                    : lang === 'uz'
                    ? 'Gospital va retseptli sxemalar'
                    : 'Hospital & Rx formulations',
              },
              {
                category: 'infusion',
                image: '/assets/photos/gdp-pallet-amgv.jpg',
                title:
                  lang === 'ru'
                    ? 'Инфузии и парентеральные растворы'
                    : lang === 'uz'
                    ? 'Infuziyalar va parenteral eritmalar'
                    : 'Infusions & Parenteral Solutions',
                subtitle:
                  lang === 'ru'
                    ? 'Госпитальные поставки со склада GDP'
                    : lang === 'uz'
                    ? 'GDP omboridan gospital yetkazib berish'
                    : 'Direct hospital supply from GDP hub',
              },
              {
                category: 'vitamins',
                image: '/assets/photos/greenwell-vitamin-c.jpg',
                title:
                  lang === 'ru'
                    ? 'Нутрицевтики Greenwell (США)'
                    : lang === 'uz'
                    ? 'Greenwell nutrisevtiklari (AQSh)'
                    : 'Greenwell Nutraceuticals (US)',
                subtitle:
                  lang === 'ru'
                    ? 'Vitamin C + Rosehip и линейка Vitaprotein®'
                    : lang === 'uz'
                    ? 'Vitamin C + Rosehip va Vitaprotein® liniyasi'
                    : 'Vitamin C + Rosehip & Vitaprotein® line',
              },
              {
                category: 'all',
                image: '/assets/photos/greenwell-weightloss-box.jpg',
                title:
                  lang === 'ru'
                    ? 'Весь портфель (70+ SKU)'
                    : lang === 'uz'
                    ? 'Barcha portfel (70+ SKU)'
                    : 'Full Portfolio (70+ SKUs)',
                subtitle:
                  lang === 'ru'
                    ? 'Оригинальные партии EU и WHO GMP'
                    : lang === 'uz'
                    ? 'EU va WHO GMP original partiyalari'
                    : 'Authentic EU & WHO GMP batches',
              },
            ].map((tile) => (
              <Link
                key={tile.category}
                href={`/portfolio?category=${tile.category}&lang=${lang}`}
                className="group relative h-52 sm:h-56 rounded-2xl overflow-hidden border border-slate-200/80 block bg-slate-900"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061527]/90 via-[#061527]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="text-sm font-extrabold leading-snug group-hover:text-teal-300 transition-colors">
                    {tile.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-200/90">
                    <span className="truncate">{tile.subtitle}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-teal-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 3 Editorial Publication Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {RESEARCH_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveResearch(item)}
                className="group text-left rounded-2xl border border-slate-200/90 hover:border-[#0B3B60]/50 bg-[#F8FAFC] hover:bg-white p-6 flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-[family-name:var(--font-mono)] tabular-nums font-bold text-[#0D9488]">
                      0{idx + 1} · {item.date}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] tabular-nums text-slate-400">
                      {item.articlesCount} PDF
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-lg font-extrabold text-slate-900 group-hover:text-[#0B3B60] transition-colors leading-snug">
                    {item.title[lang]}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.subtitle[lang]}
                  </p>

                  <p className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-semibold text-slate-700 line-clamp-2">
                    {item.latestTopic[lang]}
                  </p>
                </div>

                <div className="mt-5 pt-2 flex items-center justify-between text-xs font-bold text-[#0B3B60]">
                  <span>
                    {item.articlesCount}{' '}
                    {lang === 'ru'
                      ? 'материалов'
                      : lang === 'uz'
                      ? 'materiallar'
                      : 'publications'}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>
                      {lang === 'ru'
                        ? 'Читать'
                        : lang === 'uz'
                        ? 'Batafsil'
                        : 'Read more'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">{t.newsDisclaimer}</p>
            <button
              type="button"
              onClick={() => setActiveResearch(RESEARCH_ITEMS[1])}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{t.newsBtnArchive}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. CAREER & HR-BRAND (#career) — Light Editorial Layout with Real Team Portraits
         ===================================================================== */}
      <section
        id="career"
        className="relative py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80 overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D9488] uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ru'
                    ? 'Карьера в INSO Group · HR-бренд холдинга'
                    : lang === 'uz'
                    ? 'INSO Group karyera · Xolding HR-brendi'
                    : 'Career at INSO Group · Employer Brand'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance leading-[1.15]">
                {lang === 'ru'
                  ? 'Строим лучшее место работы в фармацевтической отрасли Центральной Азии'
                  : lang === 'uz'
                  ? 'Markaziy Osiyo farmatsevtika sohasidagi eng yaxshi ish joyini barpo etmoqdamiz'
                  : 'Building the Best Workplace in Central Asia’s Pharmaceutical Industry'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ru'
                  ? 'С 2017 года команда INSO Group растёт вместе с масштабом бизнеса. Наша цель к 2029 году — стать лучшим работодателем отрасли, где сильные специалисты растут по результатам, опираются на факты и видят реальный вклад своей работы в здоровье пациентов.'
                  : lang === 'uz'
                  ? '2017-yildan buyon INSO Group jamoasi biznes miqyosi bilan birga kengayib bormoqda. 2029-yilgacha boʻlgan maqsadimiz — kuchli mutaxassislar natijaga koʻra oʻsadigan, dalillarga tayanadigan va bemorlar salomatligiga real hissa qoʻshadigan sohadagi eng yaxshi ish beruvchiga aylanishdir.'
                  : 'Since 2017, the INSO Group team has grown alongside our regional footprint. Our 2029 goal is to be the industry’s best employer — where professionals advance on merit, rely on facts, and make a tangible impact on patient health.'}
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <div className="w-full sm:w-auto p-6 rounded-2xl bg-white border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0B3B60] uppercase tracking-wider">
                  <Users className="w-4 h-4 text-[#0D9488]" />
                  <span>
                    {lang === 'ru'
                      ? 'Присоединяйтесь к команде'
                      : lang === 'uz'
                      ? 'Jamoamizga qoʻshiling'
                      : 'Join Our Growing Team'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'ru'
                    ? 'Открыты вакансии в головном офисе в Ташкенте, в 13 региональных представительствах и новых зарубежных офисах.'
                    : lang === 'uz'
                    ? 'Toshkentdagi bosh ofisda, 13 ta hududiy vakolatxonada va yangi xorijiy ofislarda boʻsh ish oʻrinlari ochiq.'
                    : 'Open positions at our Tashkent HQ, across 13 regional offices, and in our new international representative offices.'}
                </p>
                <button
                  type="button"
                  onClick={() => handleApplyCareerTrack('Общий конкурс / Резюме в HR')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082B47] text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  <span>
                    {lang === 'ru'
                      ? 'Отправить резюме в HR-департамент'
                      : lang === 'uz'
                      ? 'HR boʻlimiga rezyume yuborish'
                      : 'Submit CV to HR Department'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Synthon-Style Editorial People & Culture Diptych (Real INSO Group Warehouse & Quality Specialists) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-6 min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900"
            >
              <Image
                src="/assets/photos/team-specialists-men.jpg"
                alt={
                  lang === 'ru'
                    ? 'Специалисты складской GDP-логистики INSO Group в Ташкенте'
                    : lang === 'uz'
                    ? 'Toshkentdagi INSO Group GDP-ombor logistikasi mutaxassislari'
                    : 'INSO Group GDP warehouse logistics specialists in Tashkent'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/90 via-[#04101E]/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04101E]/75 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-teal-300">
                  <span>06 · ЦЕНИМ ЛЮДЕЙ · TASHKENT GDP HUB</span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Команда операционной и GDP-логистики'
                    : lang === 'uz'
                    ? 'Operatsion va GDP-logistika jamoasi'
                    : 'Operations & GDP Logistics Team'}
                </div>
                <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {lang === 'ru'
                    ? 'Сотрудник для нас — партнёр, а не ресурс: точность, ответственность и взаимное уважение в каждой смене'
                    : lang === 'uz'
                    ? 'Xodim biz uchun resurs emas, hamkor: har bir ish smenasida aniqlik, masʼuliyat va oʻzaro hurmat'
                    : 'Colleagues Are Partners, Not Resources: Precision, Ownership, and Mutual Respect on Every Shift'}
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-6 min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900"
            >
              <Image
                src="/assets/photos/team-specialists-women.jpg"
                alt={
                  lang === 'ru'
                    ? 'Специалисты контроля качества и комплектации фармацевтического склада INSO Group'
                    : lang === 'uz'
                    ? 'INSO Group farmatsevtika ombori sifat nazorati va komplektatsiya mutaxassislari'
                    : 'INSO Group pharmaceutical quality control and order fulfillment specialists'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/90 via-[#04101E]/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04101E]/75 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-white/90">
                  <span>01 · БЕРЕЖЁМ ДОВЕРИЕ · QA & GDP</span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Контроль качества и фармацевтический порядок'
                    : lang === 'uz'
                    ? 'Sifat nazorati va farmatsevtik tartib'
                    : 'Quality Assurance & Order Fulfillment'}
                </div>
                <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {lang === 'ru'
                    ? 'За каждой упаковкой стоит пациент: строгие стандарты комплектации и хранения'
                    : lang === 'uz'
                    ? 'Har bir qadoq ortida bemor turadi: saqlash va yetkazib berishning qatʼiy standartlari'
                    : 'Behind Every Package Is a Patient: Rigorous Standards in Pharmaceutical Handling'}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* 4 HR Culture Pillars from Teksty dlya sayta Page 7 ("Опираемся на факты", "Доводим до конца", "Видим дальше", "Ценим людей") */}
          <div className="space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
              {lang === 'ru'
                ? 'КУЛЬТУРА РАБОТЫ В INSO GROUP · 4 ПРИНЦИПА КОМАНДЫ С ПРИМЕРАМИ ИЗ ПРАВИЛ ПОВЕДЕНИЯ'
                : lang === 'uz'
                ? 'INSO GROUP MEHNAT MADANIYATI · JAMOANING 4 TA AMALIY PRINSIPI'
                : 'WORKING CULTURE AT INSO GROUP · 4 TEAM PRINCIPLES IN ACTION'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
              {hrCultureValues.map((val) => (
                <div
                  key={val.id}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#0B3B60]/40 p-5 flex flex-col justify-between transition-all shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#0B3B60] text-white font-[family-name:var(--font-mono)] text-xs font-bold">
                        {val.number}
                      </span>
                      <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-wider text-right">
                        {val.keywords[lang]}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-base sm:text-lg font-extrabold text-slate-900">
                      {val.title[lang]}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {val.description[lang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70 space-y-1.5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3B60]">
                      {lang === 'ru'
                        ? 'Как это работает у нас:'
                        : lang === 'uz'
                        ? 'Bizda bu qanday ishlaydi:'
                        : 'How we practice this:'}
                    </div>
                    {val.weDo[lang].slice(0, 2).map((rule, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Career Directions Across the Holding */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-5 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {lang === 'ru'
                    ? 'Открытые карьерные направления в субрендах холдинга'
                    : lang === 'uz'
                    ? 'Xolding sub-brendlarida ochiq karyera yoʻnalishlari'
                    : 'Open Career Tracks Across Holding Sub-Brands'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {lang === 'ru'
                    ? 'Выберите профильное направление, чтобы отправить отклик напрямую в HR-департамент'
                    : lang === 'uz'
                    ? 'HR boʻlimiga toʻgʻridan-toʻgʻri murojaat yuborish uchun yoʻnalishni tanlang'
                    : 'Select a track below to submit your application directly to our HR team'}
                </p>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#0D9488]">
                hr@inso.uz · info@inso.uz
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                {
                  title:
                    lang === 'ru'
                      ? 'Медицинская промоция и КАМ'
                      : lang === 'uz'
                      ? 'Tibbiy targʻibot va KAM'
                      : 'Medical Promotion & KAM',
                  subbrand: 'INOM · Health Biotech · LPS',
                  location:
                    lang === 'ru'
                      ? 'Ташкент и 13 регионов'
                      : lang === 'uz'
                      ? 'Toshkent va 13 viloyat'
                      : 'Tashkent & 13 Regions',
                },
                {
                  title:
                    lang === 'ru'
                      ? 'GDP-логистика и цепочки поставок'
                      : lang === 'uz'
                      ? 'GDP-logistika va taʼminot zanjiri'
                      : 'GDP Logistics & Cold Chain',
                  subbrand: 'NovaLine · GreenWell',
                  location:
                    lang === 'ru'
                      ? 'Ташкент (GDP-комплекс)'
                      : lang === 'uz'
                      ? 'Toshkent (GDP-majmua)'
                      : 'Tashkent (GDP Hub)',
                },
                {
                  title:
                    lang === 'ru'
                      ? 'Регуляторика и регистрация (CTD)'
                      : lang === 'uz'
                      ? 'Regulyatorika va roʻyxatdan oʻtkazish'
                      : 'Regulatory Affairs & CTD',
                  subbrand: 'INSO Service',
                  location:
                    lang === 'ru'
                      ? 'Головной офис · Ташкент'
                      : lang === 'uz'
                      ? 'Bosh ofis · Toshkent'
                      : 'Headquarters · Tashkent',
                },
                {
                  title:
                    lang === 'ru'
                      ? 'Международное развитие и ВЭД'
                      : lang === 'uz'
                      ? 'Xalqaro rivojlanish va TIF'
                      : 'International Business & Sourcing',
                  subbrand: 'INSO Group International',
                  location:
                    lang === 'ru'
                      ? 'Узбекистан и страны ЦА'
                      : lang === 'uz'
                      ? 'Oʻzbekiston va MO davlatlari'
                      : 'Uzbekistan & Central Asia',
                },
              ].map((track) => (
                <button
                  key={track.title}
                  type="button"
                  onClick={() => handleApplyCareerTrack(track.title)}
                  className="group text-left p-4 rounded-2xl bg-white hover:bg-[#0B3B60] border border-slate-200/90 hover:border-[#0B3B60] transition-all flex flex-col justify-between gap-3 cursor-pointer shadow-2xs"
                >
                  <div>
                    <div className="text-[11px] font-bold text-[#0D9488] group-hover:text-teal-300 font-[family-name:var(--font-mono)]">
                      {track.subbrand}
                    </div>
                    <div className="mt-1 text-sm font-extrabold text-slate-900 group-hover:text-white leading-snug">
                      {track.title}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 group-hover:border-white/15 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-200">
                    <span>{track.location}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0D9488] group-hover:text-teal-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FAQ SECTION (Interactive Accordion + Expert Consultation Card)
         ===================================================================== */}
      <section
        id="faq"
        className="relative py-14 sm:py-18 lg:py-24 bg-white overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Title + CTA Card */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] uppercase tracking-wider mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t.faqBadge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
                  {t.faqTitle}
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {t.faqSubtitle}
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#0B3B60] to-[#0B2545] text-white p-6 sm:p-7 space-y-4 shadow-[0_16px_36px_-12px_rgba(11,59,96,0.3)]">
                <div className="flex items-center">
                  <Image
                    src="/assets/photos/logo-white.webp"
                    alt="INSO"
                    width={96}
                    height={40}
                    className="h-10 w-auto object-contain mix-blend-screen"
                  />
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {t.faqCtaTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {t.faqCtaBody}
                </p>
                <a
                  href="#contacts"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-xs font-bold text-white transition-colors"
                >
                  <span>{t.faqCtaBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Accordion Items */}
            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#0B3B60]/40 shadow-[0_12px_28px_-10px_rgba(11,59,96,0.12)]'
                        : 'bg-white/90 border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[11px] font-bold text-[#0D9488] uppercase tracking-wider">
                          {faq.category[lang]}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {faq.question[lang]}
                        </h3>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isOpen
                            ? 'bg-[#0B3B60] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {faq.answer[lang]}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. INTERACTIVE GOOGLE MAPS LOCATION & INFRASTRUCTURE SECTION (#map)
         ===================================================================== */}
      <InsoLocationMap apiKey={resolvedMapsKey} lang={lang} />

      {/* =====================================================================
          10. CONTACT SECTION ("Связаться с нами" + Career & B2B Topics)
         ===================================================================== */}
      <section id="contacts" className="relative overflow-hidden py-14 sm:py-18 lg:py-24 bg-[#F8FAFC]">
        <MedicalAmbientBackground variant="contact" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.contactTitle}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.06)] p-5 sm:p-8"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
                {t.formHeading}
              </h3>

              {contactSubmitted ? (
                <div className="p-5 rounded-xl bg-teal-50/80 border border-teal-200 text-slate-800 space-y-3">
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0F766E]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {lang === 'ru'
                        ? 'Ваше обращение успешно зарегистрировано!'
                        : lang === 'uz'
                        ? 'Murojaatingiz muvaffaqiyatli roʻyxatga olindi!'
                        : 'Your inquiry has been successfully registered!'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'ru'
                      ? `Специалист профильного департамента INSO Group свяжется с вами по указанному контакту (${contactEmail}) в течение 2 рабочих часов.`
                      : lang === 'uz'
                      ? `INSO Group tegishli departamenti mutaxassisi koʻrsatilgan aloqa (${contactEmail}) orqali 2 ish soati ichida siz bilan bogʻlanadi.`
                      : `A specialist from the relevant INSO Group department will contact you at (${contactEmail}) within 2 business hours.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactMessage('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0B3B60] rounded-lg hover:bg-[#082B47] transition-colors cursor-pointer"
                  >
                    {lang === 'ru'
                      ? 'Отправить еще одно сообщение'
                      : lang === 'uz'
                      ? 'Yana bitta xabar yuborish'
                      : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {t.formName}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={t.formNamePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B3B60] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        {t.formEmail}
                      </label>
                      <input
                        id="contact-email"
                        type="text"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder={t.formEmailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B3B60] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        {t.formTopic}
                      </label>
                      <select
                        id="contact-topic"
                        value={contactTopic}
                        onChange={(e) => setContactTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0B3B60] transition-colors"
                      >
                        <option value="distribution">
                          {lang === 'ru'
                            ? 'Дистрибуция и вывод на рынок ЦА'
                            : lang === 'uz'
                            ? 'Distribyutsiya va MO bozoriga olib chiqish'
                            : 'Distribution & Central Asia Market Entry'}
                        </option>
                        <option value="wholesale">
                          {lang === 'ru'
                            ? 'Оптовая закупка / Прайс-лист'
                            : lang === 'uz'
                            ? 'Ulgurji xarid / Prays-list'
                            : 'Wholesale Procurement / Price List'}
                        </option>
                        <option value="registration">
                          {lang === 'ru'
                            ? 'Регистрация ЛС, БАД и ИМН (INSO Service)'
                            : lang === 'uz'
                            ? 'DV, BFQ va tibbiy buyumlarni roʻyxatdan oʻtkazish'
                            : 'Registration of Rx, Supplements & Medical Devices'}
                        </option>
                        <option value="career">
                          {lang === 'ru'
                            ? 'Карьера в INSO Group / Отклик на вакансию'
                            : lang === 'uz'
                            ? 'INSO Group karyera / Boʻsh ish oʻrniga ariza'
                            : 'Career at INSO Group / Job Application'}
                        </option>
                        <option value="pharmacovigilance">
                          {lang === 'ru'
                            ? 'Фармаконадзор / Безопасность ЛС'
                            : lang === 'uz'
                            ? 'Farmakonazorat / Dori xavfsizligi'
                            : 'Pharmacovigilance / Drug Safety (GVP)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {t.formMessage}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={t.formMessagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B3B60] transition-colors resize-y"
                    />
                  </div>

                  {contactError && (
                    <p className="text-xs font-medium text-rose-600">{contactError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-[0_8px_20px_-6px_rgba(13,148,136,0.45)] transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.formSubmit}</span>
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.06)] p-5 sm:p-8 space-y-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t.infoHeading}
                </h3>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {t.addressLabel}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t.addressValue}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {t.phoneLabel}
                    </div>
                    <div className="mt-1 space-y-1 text-xs sm:text-sm text-slate-600 font-[family-name:var(--font-mono)]">
                      <div>
                        <a href="tel:+998935056552" className="hover:text-[#0B3B60] transition-colors">
                          +998 93 505 65 52
                        </a>
                      </div>
                      <div>
                        <a href="tel:+998712006552" className="hover:text-[#0B3B60] transition-colors">
                          +998 71 200 65 52
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {t.emailLabel}
                    </div>
                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs sm:text-sm text-slate-600">
                      <a href="mailto:info@inso.uz" className="hover:text-[#0B3B60]">
                        info@inso.uz
                      </a>
                      <a href="mailto:sales@inso.uz" className="hover:text-[#0B3B60]">
                        sales@inso.uz
                      </a>
                      <a href="mailto:registration@inso.uz" className="hover:text-[#0B3B60]">
                        registration@inso.uz
                      </a>
                      <a href="mailto:hr@inso.uz" className="hover:text-[#0B3B60]">
                        hr@inso.uz
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.06)] p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                <Image
                  src="/assets/photos/logo.webp"
                  alt="INSO"
                  width={120}
                  height={56}
                  className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply shrink-0"
                />
                <div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t.partnerCardSubtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. STRUCTURED CORPORATE FOOTER (Since 2017)
         ===================================================================== */}
      <footer className="bg-white border-t border-slate-200 text-slate-600">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-100">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center">
                <Image
                  src="/assets/photos/logo.webp"
                  alt="INSO"
                  width={140}
                  height={52}
                  className="h-12 w-auto object-contain mix-blend-multiply"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
                {lang === 'ru'
                  ? 'С 2017 года INSO Group — один из ведущих фармацевтических холдингов Узбекистана: дистрибуция, промоция и сервисные услуги для производителей лекарств и продуктов для здоровья. От производителя — до пациента.'
                  : lang === 'uz'
                  ? '2017-yildan buyon INSO Group — Oʻzbekistonning yetakchi farmatsevtika xoldinglaridan biri: dori vositalari va salomatlik mahsulotlari ishlab chiqaruvchilari uchun distribyutsiya, targʻibot va servis xizmatlari. Ishlab chiqaruvchidan — bemorgacha.'
                  : 'Since 2017, INSO Group is one of the leading pharmaceutical holdings in Uzbekistan, providing distribution, promotion, and turnkey services for manufacturers of medicines and health products. From manufacturer to patient.'}
              </p>
              <div className="pt-1 text-xs text-slate-400 font-[family-name:var(--font-mono)]">
                {lang === 'ru'
                  ? 'Основано в 2017 г. · Лицензия Фармацевтического комитета РУз · Стандарт GDP'
                  : lang === 'uz'
                  ? '2017-yilda asos solingan · OʻzR Farmatsevtika qoʻmitasi litsenziyasi · GDP standarti'
                  : 'Founded in 2017 · Licensed by Pharmaceutical Agency of Uzbekistan · GDP Standard'}
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="font-bold text-slate-900">
                {lang === 'ru'
                  ? 'Разделы сайта'
                  : lang === 'uz'
                  ? 'Sayt boʻlimlari'
                  : 'Main Navigation'}
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a href="#about" className="hover:text-[#0B3B60]">
                    {t.navAbout}
                  </a>
                </li>
                <li>
                  <a href="#subbrands" className="hover:text-[#0B3B60]">
                    {t.navSubbrands}
                  </a>
                </li>
                <li>
                  <a href="#news" className="hover:text-[#0B3B60]">
                    {t.navNews}
                  </a>
                </li>
                <li>
                  <a href="#career" className="hover:text-[#0B3B60]">
                    {t.navCareer}
                  </a>
                </li>
                <li>
                  <Link href={`/portfolio?lang=${lang}`} className="hover:text-[#0B3B60]">
                    {t.navCatalog}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="font-bold text-slate-900">
                {lang === 'ru'
                  ? 'Терапевтические линии'
                  : lang === 'uz'
                  ? 'Terapevtik yoʻnalishlar'
                  : 'Therapeutic Lines'}
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCatalogCategory('cardiology')}
                    className="hover:text-[#0B3B60] cursor-pointer"
                  >
                    {t.filterCardio}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCatalogCategory('neurology')}
                    className="hover:text-[#0B3B60] cursor-pointer"
                  >
                    {t.filterNeuro}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCatalogCategory('gastro')}
                    className="hover:text-[#0B3B60] cursor-pointer"
                  >
                    {t.filterGastro}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCatalogCategory('antibiotics')}
                    className="hover:text-[#0B3B60] cursor-pointer"
                  >
                    {t.filterAntibiotics}
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="font-bold text-slate-900">
                {lang === 'ru'
                  ? 'Регуляторика и качество'
                  : lang === 'uz'
                  ? 'Regulyatorika va sifat'
                  : 'Regulatory & Quality'}
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a href="#values" className="hover:text-[#0B3B60]">
                    {lang === 'ru'
                      ? 'Ценности INSO Group'
                      : lang === 'uz'
                      ? 'INSO Group qadriyatlari'
                      : 'INSO Group Core Values'}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#0B3B60]">
                    {t.navFaq}
                  </a>
                </li>
                <li>
                  <a href="#map" className="hover:text-[#0B3B60]">
                    {t.navMap}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setDesignSystemOpen(true)}
                    className="text-[#0D9488] font-semibold hover:underline cursor-pointer text-left"
                  >
                    {lang === 'ru'
                      ? 'Спецификация дизайн-системы (UI Kit)'
                      : lang === 'uz'
                      ? 'Dizayn-tizim spetsifikatsiyasi (UI Kit)'
                      : 'Design System Specification (UI Kit)'}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              {lang === 'ru'
                ? '© 2017–2026 INSO Group (insopharm.uz). Все права защищены.'
                : lang === 'uz'
                ? '© 2017–2026 INSO Group (insopharm.uz). Barcha huquqlar himoyalangan.'
                : '© 2017–2026 INSO Group (insopharm.uz). All rights reserved.'}
            </div>
            <a
              href="#top"
              aria-label={
                lang === 'ru' ? 'Наверх' : lang === 'uz' ? 'Yuqoriga' : 'Back to top'
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0B3B60] hover:border-slate-300 transition-colors"
            >
              <span>
                {lang === 'ru' ? 'Наверх' : lang === 'uz' ? 'Yuqoriga' : 'Top'}
              </span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: NEWS & CLINICAL ARCHIVE PREVIEW MODAL
         ===================================================================== */}
      <AnimatePresence>
        {activeResearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setActiveResearch(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-5 sm:p-8 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-semibold text-[#0D9488]">
                    INSO GROUP · {activeResearch.date}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {activeResearch.title[lang]}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveResearch(null)}
                  aria-label="Close modal"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {activeResearch.latestTopic[lang]}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeResearch.summary[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveResearch(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 rounded-lg border border-slate-200 cursor-pointer"
                >
                  {t.menuClose}
                </button>
                <a
                  href="#contacts"
                  onClick={() => setActiveResearch(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-lg"
                >
                  {lang === 'ru'
                    ? 'Запросить PDF-архив'
                    : lang === 'uz'
                    ? 'PDF-arxivni soʻrash'
                    : 'Request PDF Archive'}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 2: DESIGN SYSTEM EXTRACTION INSPECTOR
         ===================================================================== */}
      <AnimatePresence>
        {designSystemOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setDesignSystemOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">
                    Design System Specification
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {lang === 'ru'
                      ? 'Дизайн-система INSO Group'
                      : lang === 'uz'
                      ? 'INSO Group dizayn-tizimi'
                      : 'INSO Group Design System'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDesignSystemOpen(false)}
                  aria-label="Close modal"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-[#F8FAFC]">
                  <div className="w-full h-6 rounded-md bg-[#F8FAFC] border border-slate-200 mb-2" />
                  <div className="font-bold text-slate-900">#F8FAFC</div>
                  <div className="text-[11px] text-slate-500">Clinical Canvas</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="w-full h-6 rounded-md bg-[#0B3B60] mb-2" />
                  <div className="font-bold text-slate-900">#0B3B60</div>
                  <div className="text-[11px] text-slate-500">INSO Navy</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="w-full h-6 rounded-md bg-[#0D9488] mb-2" />
                  <div className="font-bold text-slate-900">#0D9488</div>
                  <div className="text-[11px] text-slate-500">Clinical Teal</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="w-full h-6 rounded-md bg-[#0F172A] mb-2" />
                  <div className="font-bold text-slate-900">#0F172A</div>
                  <div className="text-[11px] text-slate-500">Primary Ink</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setDesignSystemOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B3B60] rounded-xl cursor-pointer"
                >
                  {t.menuClose}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
