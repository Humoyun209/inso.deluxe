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
  Play,
  Pause,
} from 'lucide-react';
import {
  PRODUCTS,
  CORE_VALUES,
  RESEARCH_ITEMS,
  FAQ_ITEMS,
  ResearchItem,
  Language,
} from '@/lib/insopharm-data';
import {
  InsoOrbitalMark,
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
    sinceBadge: 'INSO GROUP · С 2017 ГОДА',
    heroHeadline: 'Один из ведущих фармхолдингов Узбекистана',
    heroDescription: 'Дистрибуция, промоция и вывод препаратов на рынок. От производителя — до пациента.',
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
  },
  uz: {
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
    sinceBadge: 'INSO GROUP · 2017-YILDAN BUYON',
    heroHeadline: 'Oʻzbekistonning yetakchi farmxoldinglaridan biri',
    heroDescription: 'Distribyutsiya, targʻibot va preparatlarni bozorga olib chiqish. Ishlab chiqaruvchidan — bemorgacha.',
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
  },
  en: {
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
    sinceBadge: 'INSO GROUP · SINCE 2017',
    heroHeadline: 'One of Uzbekistan’s Leading Pharma Holdings',
    heroDescription: 'Distribution, promotion, and turnkey market entry. From manufacturer to patient.',
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
  },
};

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
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-[family-name:var(--font-jakarta)]">
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
          {/* Zone 1: Brand Lockup — Prominent "INSO" + Secondary "GROUP" */}
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B60]"
          >
            <InsoOrbitalMark size="md" />
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-extrabold tracking-[0.14em] text-[#0B3B60]">
                INSO
              </span>
              <span className="mt-1 text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-[#0D9488] uppercase">
                GROUP
              </span>
            </div>
          </a>

          {/* Zone 2: Main Menu on Header (Strictly: About Us, Subbrands, News, Career) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700"
          >
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
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-xs font-semibold text-white bg-[#0B3B60] hover:bg-[#082B47] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
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
        className="relative min-h-[calc(100dvh-4.5rem)] max-h-[920px] flex flex-col justify-between overflow-hidden bg-[#04101E] text-white"
      >
        {/* Full-Bleed Parallax Background Video + Refined Architectural Scrims */}
        <motion.div
          aria-hidden="true"
          style={{ scale: heroVideoScale, y: heroVideoY }}
          className="absolute inset-0 z-0 origin-center will-change-transform"
        >
          <video
            ref={heroVideoRef}
            src="/assets/video/warehouse-2.mp4"
            poster="/assets/video/inso-warehouse-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Architectural Vignette — keeps Warehouse 1 bright and open on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101E]/85 via-[#04101E]/42 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/85 via-transparent to-[#04101E]/25" />
        </motion.div>

        {/* Main Hero Foreground Content — Minimalist Editorial Typography with Staggered Mask Reveals */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-12 flex-1 flex flex-col justify-center"
        >
          <div className="max-w-[660px]">
            {/* Minimal Kicker with Expanding Accent Line */}
            <div className="overflow-hidden mb-5">
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

            {/* Statement Display Headline (Curtain Mask Reveal) */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '38%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.25rem,4.4vw,3.9rem)] font-bold tracking-[-0.02em] text-white leading-[1.06] text-balance"
              >
                {t.heroHeadline}
              </motion.h1>
            </div>

            {/* Single-Breath Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed max-w-[46ch]"
            >
              {t.heroDescription}
            </motion.p>

            {/* Elegant Actions: Primary Button + Animated Underline Link */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8"
            >
              <Link
                href={`/portfolio?lang=${lang}`}
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-semibold text-slate-950 bg-white hover:bg-teal-300 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap shadow-[0_14px_34px_-10px_rgba(255,255,255,0.28)]"
              >
                <span>{t.heroPrimaryBtn}</span>
                <span className="w-6 h-6 rounded-full bg-slate-950/10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </span>
              </Link>

              <a
                href="#contacts"
                className="group relative inline-flex items-center gap-2 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                <span>{t.heroSecondaryBtn}</span>
                <ArrowRight className="w-4 h-4 text-teal-300 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-white/30 overflow-hidden">
                  <span className="block w-full h-full bg-teal-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Interactive Architectural Anchor Bar (3 Chapters + Video Control) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 border-t border-white/15 bg-[#04101E]/40 backdrop-blur-md"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between">
            {/* 3 Interactive Pillar Anchors with Hover Accent Sweep */}
            <div className="grid grid-cols-3 divide-x divide-white/12 flex-1">
              {[
                {
                  index: '01',
                  href: '#subbrands',
                  title:
                    lang === 'ru'
                      ? 'GDP-Дистрибуция'
                      : lang === 'uz'
                      ? 'GDP-Distribyutsiya'
                      : 'GDP Distribution',
                  meta: lang === 'ru' ? '10 000 м²' : '10,000 m²',
                },
                {
                  index: '02',
                  href: '#subbrands',
                  title:
                    lang === 'ru'
                      ? 'Медпромоция'
                      : lang === 'uz'
                      ? 'Tibbiy targʻibot'
                      : 'Medical Promotion',
                  meta:
                    lang === 'ru'
                      ? '13 регионов'
                      : lang === 'uz'
                      ? '13 viloyat'
                      : '13 Regions',
                },
                {
                  index: '03',
                  href: '/portfolio?lang=' + lang,
                  isRoute: true,
                  title:
                    lang === 'ru'
                      ? 'Портфель ЛС'
                      : lang === 'uz'
                      ? 'Preparatlar'
                      : 'Portfolio',
                  meta: '70+ SKU',
                },
              ].map((pillar) => {
                const inner = (
                  <>
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left" />
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-teal-300/90">
                        {pillar.index}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums text-[11px] text-white/60 group-hover:text-teal-300 transition-colors">
                        {pillar.meta}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white truncate">
                        {pillar.title}
                      </span>
                      <ArrowRight className="hidden md:block w-3.5 h-3.5 text-white/40 group-hover:text-teal-300 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </div>
                  </>
                );

                return pillar.isRoute ? (
                  <Link
                    key={pillar.index}
                    href={pillar.href}
                    className="group relative py-3.5 sm:py-4 px-3 sm:px-6 first:pl-0 hover:bg-white/[0.04] transition-colors block"
                  >
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={pillar.index}
                    href={pillar.href}
                    className="group relative py-3.5 sm:py-4 px-3 sm:px-6 first:pl-0 hover:bg-white/[0.04] transition-colors block"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            {/* Minimal Video Play/Pause Indicator */}
            <div className="hidden sm:flex items-center pl-6 border-l border-white/12 py-3.5">
              <button
                type="button"
                onClick={toggleHeroVideo}
                aria-label={
                  isVideoPlaying
                    ? lang === 'ru'
                      ? 'Пауза фонового видео'
                      : lang === 'uz'
                      ? 'Fon videosini toʻxtatish'
                      : 'Pause background video'
                    : lang === 'ru'
                    ? 'Воспроизвести фоновое видео'
                    : lang === 'uz'
                    ? 'Fon videosini ijro etish'
                    : 'Play background video'
                }
                className="group inline-flex items-center gap-2.5 text-xs font-medium text-white/75 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-7 h-7 rounded-full border border-white/25 group-hover:border-teal-300 flex items-center justify-center transition-colors">
                  {isVideoPlaying ? (
                    <Pause className="w-3 h-3 text-teal-300" />
                  ) : (
                    <Play className="w-3 h-3 text-teal-300 ml-0.5" />
                  )}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wider uppercase">
                  {isVideoPlaying ? 'Warehouse 1' : 'Paused'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          3. ABOUT US (#about): CRISP LIGHT EDITORIAL HERITAGE + CLEAN METRICS
         ===================================================================== */}
      <section
        id="about"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
          {/* Part 1: Heritage Narrative + Clean 3-Step Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="text-xs font-extrabold text-[#0D9488] uppercase tracking-wider">
                {lang === 'ru'
                  ? '01. О компании · История с 2017 года'
                  : lang === 'uz'
                  ? '01. Kompaniya haqida · 2017-yildan buyon'
                  : '01. About Us · Heritage Since 2017'}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.14] text-balance">
                {lang === 'ru'
                  ? 'С 2017 года строим надёжный мост между мировыми фармзаводами и пациентами'
                  : lang === 'uz'
                  ? '2017-yildan buyon jahon farmzavodlari va bemorlar oʻrtasida ishonchli koʻprik barpo etmoqdamiz'
                  : 'Building a Reliable Bridge Between Global Pharma Plants and Patients Since 2017'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ru'
                  ? 'Основанная в 2017 году в Ташкенте, компания INSO Group прошла путь от дистрибьютора лекарственных средств до многопрофильного холдинга из шести специализированных субрендов. Сегодня мы объединяем прямые контракты с заводами из 6 стран мира, собственный складской комплекс GDP и команды медицинской промоции.'
                  : lang === 'uz'
                  ? '2017-yilda Toshkentda tashkil etilgan INSO Group dori vositalari distribyutoridan oltita ixtisoslashgan sub-brendni birlashtirgan xoldingiga aylandi. Bugun biz 6 mamlakatdagi zavodlar bilan toʻgʻridan-toʻgʻri shartnomalar, xususiy GDP ombor majmuasi va tibbiy targʻibot jamoalarini birlashtiramiz.'
                  : 'Founded in 2017 in Tashkent, INSO Group has grown from a pharmaceutical distributor into a multi-division holding uniting six specialized sub-brands across direct GMP supply, warehousing, and nationwide medical promotion.'}
              </p>
            </motion.div>

            {/* Clean Light 3-Milestone Strip */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
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
                      ? 'Старт работы в Узбекистане'
                      : lang === 'uz'
                      ? 'Oʻzbekistonda faoliyat boshlanishi'
                      : 'Operations Launched in Tashkent',
                  desc:
                    lang === 'ru'
                      ? 'Запуск прямых поставок качественных препаратов и формирование первых региональных команд.'
                      : lang === 'uz'
                      ? 'Sifatli dori vositalarini toʻgʻridan-toʻgʻri yetkazib berish va ilk hududiy jamoalarni shakllantirish.'
                      : 'First direct GMP supply contracts and launch of regional pharmacy distribution.',
                  featured: false,
                },
                {
                  year: '2026',
                  tag:
                    lang === 'ru'
                      ? 'Экосистема'
                      : lang === 'uz'
                      ? 'Ekotizim'
                      : 'Ecosystem',
                  title:
                    lang === 'ru'
                      ? 'Холдинг из 6 субрендов'
                      : lang === 'uz'
                      ? '6 sub-brendli xolding'
                      : '6-Subbrand Holding',
                  desc:
                    lang === 'ru'
                      ? 'Три направления бизнеса: дистрибуция, промоция и сервисные услуги под ключ.'
                      : lang === 'uz'
                      ? 'Uchta biznes yoʻnalishi: distribyutsiya, targʻibot va tayyor servis xizmatlari.'
                      : 'Full-cycle structure covering distribution, promotion, and turnkey regulatory services.',
                  featured: true,
                },
                {
                  year: '2029',
                  tag:
                    lang === 'ru'
                      ? 'Стратегия'
                      : lang === 'uz'
                      ? 'Strategiya'
                      : 'Strategy',
                  title:
                    lang === 'ru'
                      ? 'Международный масштаб'
                      : lang === 'uz'
                      ? 'Xalqaro miqyos'
                      : 'Central Asia Expansion',
                  desc:
                    lang === 'ru'
                      ? 'Открытие зарубежных представительств и выбор №1 для выхода фармпроизводителей в ЦА.'
                      : lang === 'uz'
                      ? 'Xorijiy vakolatxonalar ochish va Markaziy Osiyo bozorlariga chiqishda 1-tanlov.'
                      : 'Opening international offices as the partner of choice for Central Asian market entry.',
                  featured: false,
                },
              ].map((milestone) => (
                <div
                  key={milestone.year}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                    milestone.featured
                      ? 'bg-[#F0FDFA]/70 border-[#0D9488]/35'
                      : 'bg-[#F8FAFC] border-slate-200/80'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-slate-200/80">
                      <span className="font-[family-name:var(--font-mono)] tabular-nums text-2xl font-extrabold text-[#0B3B60]">
                        {milestone.year}
                      </span>
                      <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider">
                        {milestone.tag}
                      </span>
                    </div>
                    <h3 className="mt-3.5 text-sm font-bold text-slate-900 leading-snug">
                      {milestone.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part 2: Lightweight 5-Column Hairline Typographic Metric Band */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {[
              {
                target: 6,
                suffix: '',
                kicker: 'INSO Group',
                label:
                  lang === 'ru'
                    ? 'субрендов в структуре холдинга'
                    : lang === 'uz'
                    ? 'xolding tarkibidagi sub-brend'
                    : 'specialized holding sub-brands',
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
                    ? 'препаратов и продуктов для здоровья'
                    : lang === 'uz'
                    ? 'preparat va salomatlik mahsuloti'
                    : 'medicines and health products',
              },
              {
                target: 25,
                suffix: '+',
                kicker: 'EU & WHO GMP',
                label:
                  lang === 'ru'
                    ? 'производителей из 6 стран мира'
                    : lang === 'uz'
                    ? '6 mamlakatdan ishlab chiqaruvchi'
                    : 'manufacturers from 6 countries',
              },
              {
                target: 10000,
                suffix: lang === 'ru' ? ' м²' : ' m²',
                kicker: 'GDP +2…+8 °C',
                label:
                  lang === 'ru'
                    ? 'склад по стандартам GDP'
                    : lang === 'uz'
                    ? 'GDP standartidagi ombor'
                    : 'GDP-compliant warehouse',
              },
              {
                target: 13,
                suffix: '',
                kicker:
                  lang === 'ru'
                    ? 'Узбекистан и ЦА'
                    : lang === 'uz'
                    ? 'Oʻzbekiston va MO'
                    : 'Uzbekistan & CA',
                label:
                  lang === 'ru'
                    ? 'региональных офисов по стране'
                    : lang === 'uz'
                    ? 'mamlakat boʻylab hududiy ofis'
                    : 'regional representative offices',
              },
            ].map((stat) => (
              <div key={stat.kicker} className="p-5 sm:p-6 flex flex-col justify-between">
                <div className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider">
                  {stat.kicker}
                </div>
                <div className="mt-3">
                  <div className="font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-extrabold text-[#0B3B60] tracking-tight leading-none">
                    <AnimatedMetricValue target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-snug">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Part 2.5: Authentic GDP Logistics & Product Quality Showcase (Real Warehouse Photography) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-7 min-h-[300px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950"
            >
              <Image
                src="/assets/photos/gdp-pallet-amgv.jpg"
                alt={
                  lang === 'ru'
                    ? 'GDP-склад INSO Group 10 000 м² — паллетное хранение и высотная техника'
                    : lang === 'uz'
                    ? 'INSO Group 10 000 m² GDP-ombori — palletli saqlash'
                    : 'INSO Group 10,000 m² GDP warehouse — high-bay pallet logistics'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/90 via-[#04101E]/25 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04101E]/75 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-teal-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>GDP HUB · TASHKENT · 10 000 M²</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] text-white/90">
                  EPAL · +15…+25 °C / +2…+8 °C
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Собственная инфраструктура · Ташкент'
                    : lang === 'uz'
                    ? 'Xususiy infratuzilma · Toshkent'
                    : 'Proprietary Infrastructure · Tashkent'}
                </div>
                <h3 className="mt-1.5 text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug max-w-xl">
                  {lang === 'ru'
                    ? 'Складской комплекс 10 000 м² по стандарту GDP: адресное хранение и контроль каждой серии'
                    : lang === 'uz'
                    ? 'GDP standartidagi 10 000 m² ombor majmuasi: manzilli saqlash va har bir seriya nazorati'
                    : '10,000 m² GDP Warehouse Hub: High-Bay Storage & Batch-Level Traceability'}
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-5 min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 flex flex-col justify-between"
            >
              <Image
                src="/assets/photos/greenwell-weightloss-box.jpg"
                alt={
                  lang === 'ru'
                    ? 'Оригинальная заводская упаковка препаратов и нутрицевтиков Greenwell на складе INSO Group'
                    : lang === 'uz'
                    ? 'INSO Group omborida Greenwell original zavod qadoqlari'
                    : 'Original factory master-carton packaging of Greenwell products at INSO Group warehouse'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/90 via-[#04101E]/30 to-[#04101E]/20" />

              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04101E]/75 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-emerald-300">
                  <span>DIRECT SUPPLY · 100% ORIGINAL</span>
                </span>
              </div>

              <div className="relative z-10 p-5 sm:p-7 text-white space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Прямые поставки с заводов'
                    : lang === 'uz'
                    ? 'Zavodlardan toʻgʻridan-toʻgʻri yetkazib berish'
                    : 'Direct Factory Shipments'}
                </div>
                <h3 className="text-base sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {lang === 'ru'
                    ? 'От заводской мастер-упаковки до аптечной полки — полная сохранность и прозрачность цепочки'
                    : lang === 'uz'
                    ? 'Zavod qadogʻidan dorixona peshtaxtasigacha — toʻliq xavfsizlik va shaffoflik'
                    : 'From Factory Master Carton to Pharmacy Shelf — Unbroken Chain of Custody'}
                </h3>
                <Link
                  href={`/portfolio?lang=${lang}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 hover:text-white transition-colors pt-1"
                >
                  <span>
                    {lang === 'ru'
                      ? 'Перейти в каталог препаратов (70+ SKU)'
                      : lang === 'uz'
                      ? 'Preparatlar katalogiga oʻtish (70+ SKU)'
                      : 'Explore Product Portfolio (70+ SKUs)'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Part 3: Asymmetric Mission (Light) vs Vision 2029 (Navy Focal) Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D9488] tracking-wider uppercase">
                  <Compass className="w-4 h-4" />
                  <span>
                    {lang === 'ru'
                      ? '02. Миссия · Зачем мы существуем'
                      : lang === 'uz'
                      ? '02. Missiya · Biz nima uchun mavjudmiz'
                      : '02. Mission · Why We Exist'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  {lang === 'ru'
                    ? 'Открываем людям доступ к качественным лекарствам и продуктам для здоровья: выводим на рынок проверенные препараты и надёжно доводим их от производителя до пациента.'
                    : lang === 'uz'
                    ? 'Odamlarga sifatli dori vositalari va salomatlik mahsulotlariga yoʻl ochamiz: sinovdan oʻtgan preparatlarni bozorga olib chiqamiz va ularni ishlab chiqaruvchidan bemorgacha ishonchli yetkazamiz.'
                    : 'We make quality medicines and health products accessible: we bring proven products to market and deliver them reliably from manufacturer to patient.'}
                </h3>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {lang === 'ru'
                    ? 'Слоган: «От производителя — до пациента.»'
                    : lang === 'uz'
                    ? 'Shior: «Ishlab chiqaruvchidan — bemorgacha.»'
                    : 'Slogan: “From manufacturer to patient.”'}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[#0B3B60] font-bold">
                  INSO Group
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B3B60] text-white flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-teal-300 tracking-wider uppercase">
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    {lang === 'ru'
                      ? '05. Видение 2029 · Стратегия 2026–2029'
                      : lang === 'uz'
                      ? '05. Nigoh 2029 · Strategiya 2026–2029'
                      : '05. Vision 2029 · Strategy 2026–2029'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-snug">
                  {lang === 'ru'
                    ? 'К 2029 году — международный холдинг, который фармпроизводители выбирают первым для выхода на рынки Центральной Азии, и лучшее место работы в отрасли.'
                    : lang === 'uz'
                    ? '2029-yilga kelib — farmatsevtika ishlab chiqaruvchilari Markaziy Osiyo bozorlariga chiqishda birinchi boʻlib tanlaydigan xalqaro xolding va sohadagi eng yaxshi ish beruvchi.'
                    : 'By 2029 — an international holding that pharmaceutical manufacturers choose first to enter Central Asian markets, and the best employer in the industry.'}
                </h3>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                <span>
                  {lang === 'ru'
                    ? 'Горизонт планирования: 3 года (2026–2029)'
                    : lang === 'uz'
                    ? 'Rejalashtirish ufqi: 3 yil (2026–2029)'
                    : 'Strategic Horizon: 3 Years (2026–2029)'}
                </span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-teal-300 font-bold">
                  2017 → 2029
                </span>
              </div>
            </div>
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
                <div className="flex items-center gap-3">
                  <InsoOrbitalMark size="sm" />
                  <div>
                    <div className="text-sm font-extrabold tracking-[0.14em] text-white">
                      INSO
                    </div>
                    <div className="text-[9px] font-bold tracking-[0.22em] text-teal-300 uppercase">
                      GROUP
                    </div>
                  </div>
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
                <InsoOrbitalMark size="lg" />
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-extrabold tracking-[0.14em] text-[#0B3B60]">
                      INSO
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#0D9488] uppercase">
                      GROUP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
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
              <div className="inline-flex items-center gap-3">
                <InsoOrbitalMark size="sm" />
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-extrabold tracking-[0.14em] text-[#0B3B60]">
                    INSO
                  </span>
                  <span className="mt-1 text-[9px] font-bold tracking-[0.22em] text-[#0D9488] uppercase">
                    GROUP
                  </span>
                </div>
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
