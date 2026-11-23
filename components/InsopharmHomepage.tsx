'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Phone,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Send,
  X,
  Check,
  Menu,
  Pill,
  FileText,
  ChevronUp,
} from 'lucide-react';
import {
  PRODUCTS,
  SUBBRANDS,
  Language,
} from '@/lib/insopharm-data';
import InsoHero from '@/components/InsoHero';
import InsoVisionValues from '@/components/InsoVisionValues';
import InsoLeadership from '@/components/InsoLeadership';
import InsoCredentials from '@/components/InsoCredentials';
import InsoScrollPalette from '@/components/InsoScrollPalette';
import InsoFooter from '@/components/InsoFooter';
import InsoPartnerContact from '@/components/InsoPartnerContact';
import InsoBusinessLines from '@/components/InsoBusinessLines';

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
    serviceContact: 'Обсудить регистрацию',
    navCatalogShort: 'Каталог',
    navAbout: 'О компании',
    navCareer: 'Карьера',
    navCatalog: 'Каталог препаратов',
    navFaq: 'FAQ',
    navContacts: 'Контакты',
    ctaContact: 'Связаться с нами',
    menuOpen: 'Меню',
    menuClose: 'Закрыть',
    sinceBadge: 'INSO Group · С 2017 года',
    heroHeadline: 'Помогаем вывести препараты',
    heroHeadlineAccent: 'на рынок Узбекистана',
    heroDescription:
      'Сопровождаем регистрацию, продвижение и поставки в аптеки и клиники по всей стране.',
    heroPartnerBtn: 'Обсудить сотрудничество',
  },
  uz: {
    serviceContact: 'Roʻyxatdan oʻtkazishni muhokama qilish',
    navCatalogShort: 'Katalog',
    navAbout: 'Kompaniya haqida',
    navCareer: 'Karyera',
    navCatalog: 'Dori vositalari katalogi',
    navFaq: 'FAQ',
    navContacts: 'Aloqa',
    ctaContact: 'Bog‘lanish',
    menuOpen: 'Menyu',
    menuClose: 'Yopish',
    sinceBadge: 'INSO Group · 2017-yildan beri',
    heroHeadline: 'Dori vositalarini',
    heroHeadlineAccent: 'Oʻzbekiston bozoriga olib chiqamiz',
    heroDescription:
      'Roʻyxatdan oʻtkazish, targʻib qilish va butun mamlakat boʻylab dorixona hamda klinikalarga yetkazib berishda koʻmaklashamiz.',
    heroPartnerBtn: 'Hamkorlikni muhokama qilish',
  },
  en: {
    serviceContact: 'Discuss registration',
    navCatalogShort: 'Catalog',
    navAbout: 'About Us',
    navCareer: 'Career',
    navCatalog: 'Product Portfolio',
    navFaq: 'FAQ',
    navContacts: 'Contacts',
    ctaContact: 'Partner With Us',
    menuOpen: 'Menu',
    menuClose: 'Close',
    sinceBadge: 'INSO Group · Since 2017',
    heroHeadline: 'Bringing medicines',
    heroHeadlineAccent: 'to the Uzbek market',
    heroDescription:
      'We support registration, promotion and delivery to pharmacies and clinics across Uzbekistan.',
    heroPartnerBtn: 'Discuss a partnership',
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
    statusLabel: {
      ru: 'Стандарты ВОЗ',
      uz: 'JSST standartlari',
      en: 'WHO Standards',
    },
  },
];

export default function InsopharmHomepage({ initialLang, directMail, animatedHero }: { initialLang: Language; directMail: boolean; animatedHero: boolean }) {
  const [lang, setLang] = useState<Language>(initialLang);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutButton = useRef<HTMLButtonElement>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeBrandPopover, setActiveBrandPopover] = useState<string | null>(null);
  const [mobileBrandsDrawerOpen, setMobileBrandsDrawerOpen] = useState<boolean>(false);
  const [mobileAccordionBrand, setMobileAccordionBrand] = useState<string | null>('inom');
  const [licensesModalOpen, setLicensesModalOpen] = useState<boolean>(false);
  const closeBrands = useCallback(() => {
    setActiveBrandPopover(null);
    setMobileBrandsDrawerOpen(false);
  }, []);
  useEffect(() => {
    if (!activeBrandPopover) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest('.inso-brand-strip')) setActiveBrandPopover(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [activeBrandPopover]);
  // Keyboard accessibility: Escape key closes active popovers, drawers and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (aboutButton.current?.parentElement?.contains(document.activeElement)) aboutButton.current.focus();
        setAboutOpen(false);
        setActiveBrandPopover(null);
        setMobileBrandsDrawerOpen(false);
        setLicensesModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSetLang = (nextLang: Language) => {
    setLang(nextLang);
    window.localStorage.setItem('inso_lang', nextLang);
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

  const t = UI_COPY[lang];
  const aboutLinks = [
    { href: '#credentials', label: { ru: 'Дистрибуция', uz: 'Distribyutsiya', en: 'Distribution' }[lang] },
    { href: '#about', label: { ru: 'История', uz: 'Tarix', en: 'History' }[lang] },
    { href: '#values', label: { ru: 'Видение и ценности', uz: 'Maqsad va qadriyatlar', en: 'Vision and values' }[lang] },
    { href: '#leadership', label: { ru: 'Руководство', uz: 'Rahbariyat', en: 'Leadership' }[lang] },
    { href: '#subbrands', label: { ru: 'Направления холдинга', uz: 'Xolding yoʻnalishlari', en: 'Our business lines' }[lang] },
  ];

  return (
    <div id="inso-home" className="inso-home min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* =====================================================================
          1. STICKY HEADER (Main Menu: About Us · Subbrands · News · Career)
         ===================================================================== */}
      <header className="inso-masthead sticky top-0 z-40 h-18 sm:h-20 backdrop-blur-md">
        <div className="max-w-[1360px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Official Holding Brand Logo */}
          <motion.a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="INSO Group"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="group inline-flex items-center shrink-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B60]"
          >
            <Image
              src="/logos/INSO-Group_A_GROUP_horizontal_black.png"
              alt="INSO Group"
              width={160}
              height={56}
              priority
              className="h-10 sm:h-12 md:h-[50px] w-auto object-contain"
            />
          </motion.a>

          {/* Zone 2: Main Menu on Header */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-8 text-[16px] font-semibold text-slate-800"
          >
            <Link
              href={`/portfolio?lang=${lang}`}
              className="inso-nav-link whitespace-nowrap shrink-0 text-[16px]"
            >
              {t.navCatalogShort}
            </Link>
            <div className="relative" onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setAboutOpen(false);
            }}>
              <button ref={aboutButton} type="button" aria-expanded={aboutOpen} aria-controls="about-links"
                onClick={() => setAboutOpen(open => !open)}
                className="inso-nav-link inline-flex items-center gap-1.5 cursor-pointer text-[16px]">
                {t.navAbout}<ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>
              <div id="about-links" inert={!aboutOpen} aria-hidden={!aboutOpen} data-open={aboutOpen} className="inso-nav-menu absolute top-full left-0 w-60 rounded-2xl border border-[#d7e5e2] bg-[#fcfefd] p-2.5 shadow-lg">
                {aboutLinks.map(link => (
                  <a key={link.href} href={link.href} onClick={() => setAboutOpen(false)}
                    className="block rounded-xl px-3 py-2 text-[15px] font-medium transition-colors duration-300 hover:bg-[#eaf4f1] focus-visible:bg-[#eaf4f1]">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#faq"
              className="inso-nav-link whitespace-nowrap shrink-0 text-[16px]"
            >
              {t.navFaq}
            </a>
            <a
              href={`/career?lang=${lang}`}
              className="inso-nav-link whitespace-nowrap shrink-0 text-[16px]"
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
                className="inline-flex items-center gap-2 h-10 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 transition-all cursor-pointer shadow-2xs"
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
              className="inso-action hidden sm:inline-flex items-center gap-2 h-10 sm:h-11 px-5 text-[15px] sm:text-[16px] font-semibold rounded-full whitespace-nowrap shrink-0"
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
              className="inso-action lg:hidden inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-full text-xs font-semibold cursor-pointer"
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
                className="lg:hidden fixed inset-x-0 top-18 sm:top-20 bottom-0 bg-slate-950/45 backdrop-blur-xs z-40"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden fixed inset-x-0 top-18 sm:top-20 z-50 bg-white border-b border-slate-200 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)] max-h-[calc(100dvh-5rem)] overflow-y-auto"
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
                        ...aboutLinks,
                        { href: '#faq', label: t.navFaq },
                        { href: `/career?lang=${lang}`, label: t.navCareer },
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
      <section id="top" className="relative isolate bg-[#fafaf6] text-[#183f48]">
        <InsoHero key={animatedHero ? 'animated' : 'static'} animated={animatedHero} copy={t} lang={lang} onDocuments={() => setLicensesModalOpen(true)} onBrandsHidden={closeBrands}>
        <div className="inso-brand-strip relative z-30 border-t border-[var(--brand-rule)]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop View (>= 1024px): "Наши бренды" + 6 clickable names in one row */}
            <div className="hidden lg:flex items-center justify-between py-3">
              <div className="flex items-center gap-4 xl:gap-6 w-full min-w-0">
                <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-[var(--brand-rule)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-accent)] font-[family-name:var(--font-mono)] whitespace-nowrap">
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
                          aria-expanded={isSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveBrandPopover(isSelected ? null : item.id);
                          }}
                          className={`group relative py-1.5 px-2 xl:px-3 text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer rounded-lg whitespace-nowrap ${
                            isSelected
                              ? 'text-[var(--brand-ink)] bg-[var(--brand-hover)]'
                              : 'text-[var(--brand-ink)] hover:bg-[var(--brand-hover)]'
                          }`}
                        >
                          <span>{item.displayName}</span>
                          {/* Subtle teal underline for selected brand */}
                          <span
                            className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--brand-accent)] rounded-full transition-all duration-300 ${
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
                                  href={sb.id === 'service' ? 'mailto:registration@inso.uz' : `/portfolio?subbrand=${sb.id}&lang=${lang}`}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors group/link"
                                >
                                  <span>
                                    {sb.id === 'service' ? t.serviceContact : lang === 'ru'
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
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full inso-soft-link text-xs font-semibold transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
                <span>
                  {lang === 'ru'
                    ? 'Бренды холдинга · 6'
                    : lang === 'uz'
                    ? 'Xolding brendlari · 6'
                    : 'Holding Brands · 6'}
                </span>
                <ChevronUp className="w-3.5 h-3.5 text-current" />
              </button>
            </div>
          </div>
        </div>
        </InsoHero>
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
                                href={sb.id === 'service' ? 'mailto:registration@inso.uz' : `/portfolio?subbrand=${sb.id}&lang=${lang}`}
                                onClick={() => setMobileBrandsDrawerOpen(false)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                              >
                                <span>
                                  {sb.id === 'service' ? t.serviceContact : lang === 'ru'
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
                          href="mailto:registration@inso.uz"
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

      <InsoScrollPalette animatedHero={animatedHero}>
      <InsoCredentials lang={lang} />

      {/* =====================================================================
          3. ABOUT US (#about): SYNTHON-INSPIRED EDITORIAL HERITAGE + CHRONOLOGY
         ===================================================================== */}
      <section
        id="about"
        className="scroll-mt-20 pt-12 sm:pt-16 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Part 1: Editorial Header — Synthon Typography & Clean Narrative */}
          <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-16">
            <div className="vision-reveal space-y-4 md:order-2">
              <div className="inline-flex items-center gap-3 text-xs font-semibold text-[#26736f] uppercase tracking-[0.2em]">
                <span className="w-6 h-[1.5px] bg-[#26736f] inline-block" />
                <span>
                  {lang === 'ru'
                    ? 'История INSO'
                    : lang === 'uz'
                    ? 'INSO tarixi'
                    : 'Our history'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
                {lang === 'ru' ? (
                  <>
                    От первого контракта до{' '}
                    <em className="font-serif italic font-normal text-[#26736f]">
                      национального холдинга
                    </em>
                  </>
                ) : lang === 'uz' ? (
                  <>
                    Ilk distribyutsiya shartnomasidan{' '}
                    <em className="font-serif italic font-normal text-[#26736f]">
                      milliy farmxoldinggacha
                    </em>
                  </>
                ) : (
                  <>
                    From First Contract to a{' '}
                    <em className="font-serif italic font-normal text-[#26736f]">
                      Nationwide Pharma Holding
                    </em>
                  </>
                )}
              </h2>
              <p className="max-w-[52ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                {lang === 'ru'
                  ? 'В 2017 году мы начали поставлять лекарства в Ташкенте по прямым контрактам с производителями. Сегодня INSO Group объединяет шесть специализированных суббрендов.'
                  : lang === 'uz'
                  ? '2017-yilda Toshkentda ishlab chiqaruvchilar bilan bevosita shartnomalar asosida dori yetkazib berishni boshladik. Bugun INSO Group oltita ixtisoslashgan sub-brendni birlashtiradi.'
                  : 'We began supplying medicines in Tashkent in 2017 through direct contracts with manufacturers. Today, INSO Group brings together six specialist brands.'}
              </p>
            </div>
            <figure id="warehouse" className="scroll-mt-24 md:order-1">
              <div className="inso-photo-window"><Image
                src="/assets/video/inso-warehouse-poster.jpg"
                width={1280} height={720}
                sizes="(min-width: 1280px) 576px, (min-width: 768px) 47vw, 100vw"
                className="aspect-video w-full rounded-2xl object-cover"
                alt={{ ru: 'Фасад складского комплекса', uz: 'Ombor majmuasining tashqi koʻrinishi', en: 'Exterior of the warehouse complex' }[lang]}
              /></div>
              <figcaption className="mt-2 text-xs text-slate-600">
                {{ ru: 'Складской комплекс сегодня', uz: 'Bugungi ombor majmuasi', en: 'The warehouse today' }[lang]}
              </figcaption>
            </figure>
          </div>

          {/* Part 2: Interactive Synthon-Style 5-Stage Timeline (Scroll-Linked Linear Entrance) */}
          <div>
            <div className="inso-timeline grid lg:grid-cols-5">
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
                      ? 'Выход на рынки Центральной Азии'
                      : lang === 'uz'
                      ? 'Markaziy Osiyoga chiqish'
                      : 'Central Asia Expansion',
                  status: 'future',
                },
              ].map(milestone => {
                const isCurrent = milestone.status === 'current';
                const isFuture = milestone.status === 'future';

                return (
                  <div key={milestone.year}
                    className={`vision-reveal inso-milestone ${isCurrent ? 'is-current' : isFuture ? 'is-planned' : ''}`}
                  >
                    <div className="inso-year">{milestone.year}</div>
                    <p className="mt-1 text-xs font-medium text-[#366c69]">{milestone.tag}</p>
                    <h3 className="mt-2 text-lg sm:text-[22px] font-semibold leading-snug">{milestone.title}</h3>
                    {milestone.desc && (
                      <p className="mt-1.5 text-[16px] sm:text-[17px] leading-relaxed text-slate-600">{milestone.desc}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <InsoVisionValues lang={lang} />
      <InsoLeadership lang={lang} />

      <InsoBusinessLines lang={lang} />

      <InsoPartnerContact lang={lang} directMail={directMail} />
      <InsoFooter lang={lang} onDocuments={() => setLicensesModalOpen(true)} />
      </InsoScrollPalette>
    </div>
  );
}
