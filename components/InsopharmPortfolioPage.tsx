'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Phone,
  Search,
  FileText,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  X,
  ThermometerSnowflake,
  Check,
  SlidersHorizontal,
  Menu,
  HeartPulse,
  Brain,
  Pill,
  FlaskConical,
  Droplets,
  Sparkles,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  PRODUCTS,
  SUBBRANDS,
  ProductItem,
  Language,
} from '@/lib/insopharm-data';
import {
  ProductPackageVisual,
  MedicalAmbientBackground,
} from '@/components/InsoBrandGraphics';

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

const PORTFOLIO_COPY = {
  ru: {
    backHome: 'На главную страницу',
    navCatalog: 'Каталог',
    navAbout: 'О компании',
    navSubbrands: 'Субренды',
    navNews: 'Новости',
    navCareer: 'Карьера',
    navContacts: 'Контакты',
    ctaContact: 'Связаться с нами',
    menuOpen: 'Меню',
    menuClose: 'Закрыть',
    catalogTitle: 'Портфель лекарственных средств',
    catalogSubtitle:
      'Сертифицированные рецептурные (Rx) и безрецептурные (OTC) препараты от ведущих мировых производителей стандарта EU и WHO GMP.',
    searchPlaceholder: 'Поиск по названию или МНН...',
    filterAll: 'Все направления',
    filterCardio: 'Кардиология',
    filterNeuro: 'Неврология',
    filterGastro: 'Гастроэнтерология',
    filterAntibiotics: 'Антибактериальные',
    filterInfusion: 'Инфузионная терапия',
    filterVitamins: 'Витамины и метаболизм',
    moreCategories: 'Ещё направления',
    lessCategories: 'Свернуть направления',
    dispenseAll: 'Все (Rx / OTC)',
    dispenseAllShort: 'Все',
    dispenseRx: 'Rx · По рецепту',
    dispenseRxShort: 'Rx · Рецепт',
    dispenseOtc: 'OTC · Без рецепта',
    dispenseOtcShort: 'OTC',
    resetFilters: 'Сбросить',
    btnDossier: 'Досье и инструкция',
    btnRequestQuote: 'Запросить прайс',
  },
  uz: {
    backHome: 'Asosiy sahifaga qaytish',
    navCatalog: 'Katalog',
    navAbout: 'Kompaniya haqida',
    navSubbrands: 'Sub-brendlar',
    navNews: 'Yangiliklar',
    navCareer: 'Karyera',
    navContacts: 'Aloqa',
    ctaContact: 'Bog‘lanish',
    menuOpen: 'Menyu',
    menuClose: 'Yopish',
    catalogTitle: 'Dori vositalari portfeli',
    catalogSubtitle:
      'EU GMP va WHO GMP xalqaro standartlariga javob beruvchi retseptli (Rx) va retseptsiz (OTC) dori vositalari.',
    searchPlaceholder: 'Savdo nomi yoki MNN bo‘yicha qidirish...',
    filterAll: 'Barcha yo‘nalishlar',
    filterCardio: 'Kardiologiya',
    filterNeuro: 'Nevrologiya',
    filterGastro: 'Gastroenterologiya',
    filterAntibiotics: 'Antibakterial',
    filterInfusion: 'Infuzion terapiya',
    filterVitamins: 'Vitaminlar',
    moreCategories: 'Boshqa yo‘nalishlar',
    lessCategories: 'Yopish',
    dispenseAll: 'Barchasi (Rx / OTC)',
    dispenseAllShort: 'Barchasi',
    dispenseRx: 'Rx · Retsept bo‘yicha',
    dispenseRxShort: 'Rx · Retseptli',
    dispenseOtc: 'OTC · Retseptsiz',
    dispenseOtcShort: 'OTC',
    resetFilters: 'Tozalash',
    btnDossier: 'Yo‘riqnoma va dosye',
    btnRequestQuote: 'Prays-list so‘rash',
  },
  en: {
    backHome: 'Back to Corporate Overview',
    navCatalog: 'Portfolio',
    navAbout: 'About Us',
    navSubbrands: 'Subbrands',
    navNews: 'News',
    navCareer: 'Career',
    navContacts: 'Contacts',
    ctaContact: 'Partner With Us',
    menuOpen: 'Menu',
    menuClose: 'Close',
    catalogTitle: 'Pharmaceutical Product Portfolio',
    catalogSubtitle:
      'Certified prescription (Rx) and over-the-counter (OTC) formulations sourced from over 100 EU GMP and WHO GMP partner plants.',
    searchPlaceholder: 'Search by brand name or INN...',
    filterAll: 'All Therapeutic Areas',
    filterCardio: 'Cardiology',
    filterNeuro: 'Neurology',
    filterGastro: 'Gastroenterology',
    filterAntibiotics: 'Antibacterials',
    filterInfusion: 'Infusion Therapy',
    filterVitamins: 'Vitamins',
    moreCategories: 'More categories',
    lessCategories: 'Show less',
    dispenseAll: 'All (Rx / OTC)',
    dispenseAllShort: 'All',
    dispenseRx: 'Rx · Prescription',
    dispenseRxShort: 'Rx Only',
    dispenseOtc: 'OTC · Over-the-Counter',
    dispenseOtcShort: 'OTC',
    resetFilters: 'Reset',
    btnDossier: 'Dossier & SmPC',
    btnRequestQuote: 'Request Quote',
  },
};

export default function InsopharmPortfolioPage({
  initialCategory = 'all',
  initialSubbrand = 'all',
  initialLang = 'ru',
}: {
  initialCategory?: string;
  initialSubbrand?: string;
  initialLang?: Language;
}) {
  const [lang, setLang] = useState<Language>(initialLang);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubbrand, setSelectedSubbrand] = useState<string>(initialSubbrand);
  const [dispenseFilter, setDispenseFilter] = useState<'all' | 'Rx' | 'OTC'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchScope, setSearchScope] = useState<'all' | 'brand' | 'inn'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileShowAllCategories, setMobileShowAllCategories] = useState<boolean>(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileCatalogExpanded, setMobileCatalogExpanded] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

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

  const t = PORTFOLIO_COPY[lang];

  const categories = useMemo(
    () => [
      {
        id: 'all',
        label: t.filterAll,
        image: '/assets/photos/greenwell-weightloss-box.jpg',
        subtitle: {
          ru: '70+ препаратов и БАД стандарта EU и WHO GMP',
          uz: '70+ EU va WHO GMP dori vositalari va BFQ',
          en: '70+ EU & WHO GMP medicines & supplements',
        },
      },
      {
        id: 'cardiology',
        label: t.filterCardio,
        image: '/assets/pharma/cardio_neuro.jpg',
        subtitle: {
          ru: 'Контроль АД и защита сосудов',
          uz: 'Qon bosimi nazorati va tomirlar himoyasi',
          en: 'BP control & vascular protection',
        },
      },
      {
        id: 'neurology',
        label: t.filterNeuro,
        image: '/assets/pharma/cardio_neuro.jpg',
        subtitle: {
          ru: 'Нейропротекция и когнитивная терапия',
          uz: 'Neyroproteksiya va kognitiv terapiya',
          en: 'Neuroprotection & cognitive recovery',
        },
      },
      {
        id: 'gastro',
        label: t.filterGastro,
        image: '/assets/pharma/gastro_vitamins.jpg',
        subtitle: {
          ru: 'Гастро- и гепатопротекторы',
          uz: 'Gastro- va gepatoprotektorlar',
          en: 'GI & hepatoprotective care',
        },
      },
      {
        id: 'antibiotics',
        label: t.filterAntibiotics,
        image: '/assets/pharma/infusion_antibiotics.jpg',
        subtitle: {
          ru: 'Госпитальные и системные антибиотики',
          uz: 'Gospital va tizimli antibiotiklar',
          en: 'Hospital & systemic antibacterials',
        },
      },
      {
        id: 'infusion',
        label: t.filterInfusion,
        image: '/assets/photos/gdp-pallet-amgv.jpg',
        subtitle: {
          ru: 'Стерильные растворы для в/в введения',
          uz: 'Vena ichiga yuborish uchun eritmalar',
          en: 'Sterile intravenous infusions',
        },
      },
      {
        id: 'vitamins',
        label: t.filterVitamins,
        image: '/assets/photos/greenwell-vitamin-c.jpg',
        subtitle: {
          ru: 'Нутрицевтики Greenwell и метаболический баланс',
          uz: 'Greenwell nutritsevtiklari va metabolik balans',
          en: 'Greenwell nutraceuticals & metabolic balance',
        },
      },
    ],
    [t]
  );

  const activeCategoryMeta =
    categories.find((c) => c.id === selectedCategory) || categories[0];

  const mobileVisibleCategories = useMemo(() => {
    if (mobileShowAllCategories) return categories;
    const baseFour = categories.slice(0, 4);
    if (baseFour.some((c) => c.id === selectedCategory)) {
      return baseFour;
    }
    const activeCat = categories.find((c) => c.id === selectedCategory);
    return activeCat ? [...baseFour.slice(0, 3), activeCat] : baseFour;
  }, [mobileShowAllCategories, categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSubbrand =
        selectedSubbrand === 'all' || item.subbrandId === selectedSubbrand;
      const matchesCategory =
        selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchesDispense =
        dispenseFilter === 'all' || item.dispenseType === dispenseFilter;
      const q = searchQuery.trim().toLowerCase();
      if (!q) {
        return matchesSubbrand && matchesCategory && matchesDispense;
      }

      const matchesBrand =
        item.name.ru.toLowerCase().includes(q) ||
        item.name.uz.toLowerCase().includes(q) ||
        item.name.en.toLowerCase().includes(q) ||
        (item.subbrandLabel ? item.subbrandLabel.toLowerCase().includes(q) : false);

      const matchesInn =
        item.inn.ru.toLowerCase().includes(q) ||
        item.inn.uz.toLowerCase().includes(q) ||
        item.inn.en.toLowerCase().includes(q);

      const matchesExtra =
        item.regNumber.toLowerCase().includes(q) ||
        item.dosageForm[lang].toLowerCase().includes(q);

      const matchesQuery =
        searchScope === 'brand'
          ? matchesBrand
          : searchScope === 'inn'
          ? matchesInn
          : matchesBrand || matchesInn || matchesExtra;

      return matchesSubbrand && matchesCategory && matchesDispense && matchesQuery;
    });
  }, [selectedSubbrand, selectedCategory, dispenseFilter, searchQuery, searchScope, lang]);

  const PRODUCTS_PER_PAGE = 4;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safeCurrentPage]);

  const renderCategoryIcon = (id: string) => {
    switch (id) {
      case 'cardiology':
        return <HeartPulse className="w-4 h-4" />;
      case 'neurology':
        return <Brain className="w-4 h-4" />;
      case 'gastro':
        return <Pill className="w-4 h-4" />;
      case 'antibiotics':
        return <FlaskConical className="w-4 h-4" />;
      case 'infusion':
        return <Droplets className="w-4 h-4" />;
      case 'vitamins':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* =====================================================================
          1. STICKY HEADER (Consistent 4-Item Navigation + Language Switcher)
         ===================================================================== */}
      <header className="sticky top-0 z-40 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-6">
          {/* Zone 1: Two-line Brand Lockup (36x36px Round Mark + INSO Group) */}
          <Link
            href="/"
            aria-label="INSO Group"
            className="group inline-flex items-center gap-[10px] shrink-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B60]"
          >
            {/* Round Mark (36 × 36 px) */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
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
              <span className="font-['Instrument_Sans',sans-serif] font-bold text-[26px] leading-none text-[#0B3B60] tracking-[0.02em] transition-colors group-hover:text-[#082B47]">
                INSO
              </span>
              <span className="font-['Instrument_Sans',sans-serif] font-semibold text-[10px] leading-none text-[#0D9488] tracking-[0.18em] uppercase transition-colors group-hover:text-[#0F766E]">
                GROUP
              </span>
            </div>
          </Link>

          {/* Desktop 4 Core Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatalogDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 py-1 text-[#0B3B60] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{t.navCatalog}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#0D9488] transition-transform duration-150 ${
                    catalogDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {catalogDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCatalogDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-3 w-64 rounded-xl bg-white border border-slate-200 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.12)] p-2 z-20">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                          setCatalogDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-slate-100 text-[#0B3B60] font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B3B60]'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              href="/#about"
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navAbout}
            </Link>
            <Link
              href="/#subbrands"
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navSubbrands}
            </Link>
            <Link
              href={`/?lang=${lang}#faq`}
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </Link>
            <Link
              href={`/career?lang=${lang}`}
              className="py-1 hover:text-[#0B3B60] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navCareer}
            </Link>
          </nav>

          {/* Language Switcher + CTA + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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

            <Link
              href="/#contacts"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-xs font-semibold text-white bg-[#0B3B60] hover:bg-[#082B47] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-teal-300" />
              <span>{t.ctaContact}</span>
            </Link>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
              className={`lg:hidden inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                mobileMenuOpen
                  ? 'bg-[#0D9488] text-white border-[#0D9488]'
                  : 'bg-[#0B3B60] text-white border-[#0B3B60]'
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

        {/* Mobile Drawer */}
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
                transition={{ duration: 0.22 }}
                className="lg:hidden fixed inset-x-0 top-18 z-50 bg-white border-b border-slate-200 shadow-xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
              >
                <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-6 space-y-4">
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
                              ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80'
                          }`}
                        >
                          <LanguageFlag code={item.code} size="sm" />
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <nav aria-label="Mobile Navigation" className="space-y-2">
                    <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setMobileCatalogExpanded((prev) => !prev)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <SlidersHorizontal className="w-4 h-4 text-[#0D9488]" />
                          <span>{t.navCatalog}</span>
                          <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-slate-400">
                            ({PRODUCTS.length})
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            mobileCatalogExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileCatalogExpanded && (
                        <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 grid grid-cols-2 gap-1.5">
                          {categories.map((cat) => {
                            const active = selectedCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(cat.id);
                                  setCurrentPage(1);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                                  active
                                    ? 'bg-[#0B3B60] text-white'
                                    : 'bg-white text-slate-700 border border-slate-200/70'
                                }`}
                              >
                                <span className="truncate">{cat.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { href: '/#about', label: t.navAbout },
                        { href: '/#subbrands', label: t.navSubbrands },
                        { href: `/?lang=${lang}#faq`, label: 'FAQ' },
                        { href: `/career?lang=${lang}`, label: t.navCareer },
                      ].map((navItem) => (
                        <Link
                          key={navItem.href}
                          href={navItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-slate-200/80 bg-white text-xs sm:text-sm font-bold text-slate-900"
                        >
                          <span className="truncate">{navItem.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          2. DEDICATED PHARMACEUTICAL PRODUCT PORTFOLIO PAGE CONTENT
         ===================================================================== */}
      <main className="flex-1 relative py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-[#F8FAFC] via-white to-teal-50/35 overflow-hidden">
        <MedicalAmbientBackground variant="light" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Back to Main Corporate Information Landing Page */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-bold text-[#0B3B60] shadow-2xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{t.backHome}</span>
            </Link>
          </div>

          {/* Section Header + Compact Single-Line Rx/OTC Segmented Control */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-2 max-w-2xl"
            >
              <div className="text-xs font-semibold text-[#0D9488] tracking-wide uppercase">
                INSO GROUP · EU & WHO GMP PORTFOLIO
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                {t.catalogTitle}
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                {t.catalogSubtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="grid grid-cols-3 sm:inline-flex items-center bg-white border border-slate-200/90 p-1 rounded-xl shadow-2xs w-full sm:w-auto shrink-0"
            >
              {(
                [
                  { id: 'all', label: t.dispenseAll, shortLabel: t.dispenseAllShort },
                  { id: 'Rx', label: t.dispenseRx, shortLabel: t.dispenseRxShort },
                  { id: 'OTC', label: t.dispenseOtc, shortLabel: t.dispenseOtcShort },
                ] as const
              ).map((mode) => {
                const active = dispenseFilter === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setDispenseFilter(mode.id);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center truncate ${
                      active
                        ? 'bg-[#0B3B60] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="sm:hidden">{mode.shortLabel}</span>
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Primary Medication Search Bar (Search by Brand Name or Active Ingredient / INN) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#0D9488] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={t.searchPlaceholder}
                  aria-label={t.searchPlaceholder}
                  className="w-full pl-11 pr-24 py-3 text-sm sm:text-base bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200/90 rounded-xl focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      aria-label="Clear search"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold px-2 py-1 rounded-lg bg-[#0B3B60]/10 text-[#0B3B60]">
                    {filteredProducts.length}/{PRODUCTS.length}
                  </span>
                </div>
              </div>

              {/* Search Scope Selector: All / Brand / Active Ingredient (INN) */}
              <div className="grid grid-cols-3 sm:inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
                {(
                  [
                    {
                      id: 'all',
                      label:
                        lang === 'ru'
                          ? 'Все (Бренд + МНН)'
                          : lang === 'uz'
                          ? 'Barchasi (Brend + MNN)'
                          : 'All (Brand + INN)',
                    },
                    {
                      id: 'brand',
                      label:
                        lang === 'ru'
                          ? 'По бренду'
                          : lang === 'uz'
                          ? 'Brend boʻyicha'
                          : 'By Brand',
                    },
                    {
                      id: 'inn',
                      label:
                        lang === 'ru'
                          ? 'По веществу (МНН)'
                          : lang === 'uz'
                          ? 'Faol modda (MNN)'
                          : 'By Active Ingredient',
                    },
                  ] as const
                ).map((scope) => {
                  const active = searchScope === scope.id;
                  return (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => {
                        setSearchScope(scope.id);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center truncate ${
                        active
                          ? 'bg-white text-[#0B3B60] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {scope.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick-Search Pills for Brands & Active Ingredients */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                  {lang === 'ru'
                    ? 'Быстрый поиск:'
                    : lang === 'uz'
                    ? 'Tezkor qidiruv:'
                    : 'Quick search:'}
                </span>
                {[
                  {
                    term: lang === 'ru' ? 'Прометей' : 'Prometey',
                    scope: 'brand' as const,
                    badge: lang === 'ru' ? 'Бренд' : lang === 'uz' ? 'Brend' : 'Brand',
                  },
                  {
                    term:
                      lang === 'ru'
                        ? 'Адеметионин'
                        : lang === 'uz'
                        ? 'Ademetionin'
                        : 'Ademetionine',
                    scope: 'inn' as const,
                    badge: lang === 'ru' ? 'МНН' : lang === 'uz' ? 'MNN' : 'INN',
                  },
                  {
                    term: lang === 'ru' ? 'Крефос' : 'Krefos',
                    scope: 'brand' as const,
                    badge: lang === 'ru' ? 'Бренд' : lang === 'uz' ? 'Brend' : 'Brand',
                  },
                  {
                    term:
                      lang === 'ru'
                        ? 'Цитиколин'
                        : lang === 'uz'
                        ? 'Sitikolin'
                        : 'Citicoline',
                    scope: 'inn' as const,
                    badge: lang === 'ru' ? 'МНН' : lang === 'uz' ? 'MNN' : 'INN',
                  },
                  {
                    term: 'Vitaprotein',
                    scope: 'brand' as const,
                    badge: lang === 'ru' ? 'Бренд' : lang === 'uz' ? 'Brend' : 'Brand',
                  },
                  {
                    term:
                      lang === 'ru'
                        ? 'L-лизина эсцинат'
                        : lang === 'uz'
                        ? 'L-lizin essinat'
                        : 'L-lysine aescinat',
                    scope: 'inn' as const,
                    badge: lang === 'ru' ? 'МНН' : lang === 'uz' ? 'MNN' : 'INN',
                  },
                ].map((chip) => {
                  const isChipActive =
                    searchQuery.toLowerCase() === chip.term.toLowerCase();
                  return (
                    <button
                      key={chip.term}
                      type="button"
                      onClick={() => {
                        if (isChipActive) {
                          setSearchQuery('');
                          setSearchScope('all');
                        } else {
                          setSearchQuery(chip.term);
                          setSearchScope(chip.scope);
                        }
                        setCurrentPage(1);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        isChipActive
                          ? 'bg-[#0D9488] text-white border-[#0D9488]'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                      }`}
                    >
                      <span>{chip.term}</span>
                      <span
                        className={`text-[10px] font-[family-name:var(--font-mono)] px-1.5 py-0.2 rounded ${
                          isChipActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-slate-500 border border-slate-200/70'
                        }`}
                      >
                        {chip.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {(searchQuery.trim() !== '' ||
                searchScope !== 'all' ||
                selectedCategory !== 'all' ||
                selectedSubbrand !== 'all' ||
                dispenseFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchScope('all');
                    setSelectedCategory('all');
                    setSelectedSubbrand('all');
                    setDispenseFilter('all');
                    setCurrentPage(1);
                  }}
                  className="text-xs font-bold text-[#0D9488] hover:underline cursor-pointer shrink-0"
                >
                  {t.resetFilters}
                </button>
              )}
            </div>
          </div>

          {/* Sub-Brand Filter Strip (INSO Group 5 Product Sub-Brands from Platform v12 Appendix 1) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {lang === 'ru'
                  ? 'Фильтр по субренду холдинга INSO Group (75 позиций в прайс-листах):'
                  : lang === 'uz'
                  ? 'INSO Group sub-brendi boʻyicha saralash (75 pozitsiya):'
                  : 'Filter by INSO Group Sub-brand (75 total SKUs across price lists):'}
              </span>
              {selectedSubbrand !== 'all' && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubbrand('all');
                    setCurrentPage(1);
                  }}
                  className="text-xs font-semibold text-[#0D9488] hover:underline cursor-pointer"
                >
                  {t.resetFilters}
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedSubbrand('all');
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  selectedSubbrand === 'all'
                    ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span>
                  {lang === 'ru'
                    ? 'Все субренды'
                    : lang === 'uz'
                    ? 'Barcha sub-brendlar'
                    : 'All Sub-brands'}
                </span>
                <span
                  className={`font-[family-name:var(--font-mono)] text-[10px] px-1.5 py-0.5 rounded-md ${
                    selectedSubbrand === 'all'
                      ? 'bg-white/15 text-teal-300'
                      : 'bg-white text-slate-500 border border-slate-200/80'
                  }`}
                >
                  75 SKU
                </span>
              </button>

              {SUBBRANDS.filter((sb) => sb.id !== 'service').map((sb) => {
                const active = selectedSubbrand === sb.id;
                return (
                  <button
                    key={sb.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubbrand(sb.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      active
                        ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:border-[#0B3B60]/40'
                    }`}
                  >
                    <span>{sb.name}</span>
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[10px] px-1.5 py-0.5 rounded-md ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {sb.skuCountLabel[lang]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile & Tablet Compact Category Selector */}
          <div className="lg:hidden space-y-2.5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {mobileVisibleCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.categoryId === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`shrink-0 ${
                          isSelected ? 'text-teal-300' : 'text-[#0D9488]'
                        }`}
                      >
                        {renderCategoryIcon(cat.id)}
                      </span>
                      <span className="text-xs font-bold truncate">{cat.label}</span>
                    </div>
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[11px] font-bold shrink-0 ${
                        isSelected ? 'text-teal-300' : 'text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {categories.length > 4 && (
              <button
                type="button"
                onClick={() => setMobileShowAllCategories((prev) => !prev)}
                className="w-full py-2 rounded-xl border border-dashed border-slate-300 bg-white/70 hover:bg-white text-xs font-bold text-[#0B3B60] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>
                  {mobileShowAllCategories
                    ? t.lessCategories
                    : `${t.moreCategories} (+${categories.length - 4})`}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    mobileShowAllCategories ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {/* Desktop Visual Category Showcase Cards */}
          <div className="hidden lg:grid lg:grid-cols-7 gap-3">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.categoryId === cat.id).length;

              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`group relative h-28 rounded-2xl overflow-hidden border text-left p-3.5 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0D9488] ring-2 ring-[#0D9488]/30 shadow-[0_14px_30px_-8px_rgba(13,148,136,0.32)]'
                      : 'border-slate-200/90 hover:border-[#0B3B60]/40 shadow-2xs'
                  }`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="15vw"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-t from-[#0B3B60]/95 via-[#0B3B60]/70 to-[#0D9488]/40'
                        : 'bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-slate-900/25 group-hover:from-[#0B3B60]/90'
                    }`}
                  />

                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-md transition-colors ${
                        isSelected
                          ? 'bg-[#0D9488] text-white'
                          : 'bg-white/20 text-white group-hover:bg-white/30'
                      }`}
                    >
                      {renderCategoryIcon(cat.id)}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-teal-300">
                      {count}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="text-xs font-bold text-white leading-tight line-clamp-1">
                      {cat.label}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Search & Active Category Spotlight Banner */}
          <motion.div
            layout
            className="relative rounded-2xl overflow-hidden bg-[#0B2545] text-white border border-slate-800 shadow-[0_20px_45px_-18px_rgba(11,37,69,0.35)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold tracking-wider uppercase text-teal-300">
                      {activeCategoryMeta.subtitle[lang]}
                    </div>
                    <h2 className="text-lg sm:text-2xl font-extrabold text-white mt-0.5">
                      {activeCategoryMeta.label}
                    </h2>
                  </div>

                  <div className="text-xs text-slate-300">
                    {lang === 'ru'
                      ? 'Показано:'
                      : lang === 'uz'
                      ? 'Koʻrsatilmoqda:'
                      : 'Showing:'}{' '}
                    <span className="font-[family-name:var(--font-mono)] font-bold text-teal-300">
                      {paginatedProducts.length}
                    </span>{' '}
                    / {filteredProducts.length}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-teal-300 font-semibold">
                      {selectedSubbrand === 'all'
                        ? lang === 'ru'
                          ? 'Все субренды (75 SKU)'
                          : lang === 'uz'
                          ? 'Barcha sub-brendlar (75 SKU)'
                          : 'All Sub-brands (75 SKUs)'
                        : SUBBRANDS.find((s) => s.id === selectedSubbrand)?.name}
                    </span>
                    {searchQuery.trim() !== '' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D9488]/30 border border-teal-400/30 text-white font-semibold">
                        <span>
                          {lang === 'ru'
                            ? 'Поиск:'
                            : lang === 'uz'
                            ? 'Qidiruv:'
                            : 'Search:'}{' '}
                          “{searchQuery}”
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setCurrentPage(1);
                          }}
                          aria-label="Clear search filter"
                          className="text-teal-200 hover:text-white cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                  </div>

                  {(selectedCategory !== 'all' ||
                    selectedSubbrand !== 'all' ||
                    dispenseFilter !== 'all' ||
                    searchQuery.trim() !== '') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedSubbrand('all');
                        setDispenseFilter('all');
                        setSearchQuery('');
                        setSearchScope('all');
                        setCurrentPage(1);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-teal-300 transition-colors cursor-pointer shrink-0"
                    >
                      {t.resetFilters}
                    </button>
                  )}
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-5 relative min-h-full overflow-hidden">
                <Image
                  src={activeCategoryMeta.image}
                  alt={activeCategoryMeta.label}
                  fill
                  sizes="45vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] via-[#0B2545]/45 to-transparent" />
                <div className="relative z-10 h-full p-6 flex flex-col justify-end items-end text-right">
                  <div className="bg-slate-950/75 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5">
                    <div className="font-[family-name:var(--font-mono)] text-xs font-bold text-teal-300">
                      EU GMP · WHO GMP · GDP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated Product Grid (Strictly Max 4 Products Per Page) */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center"
            >
              <p className="text-base font-semibold text-slate-800">
                {lang === 'ru'
                  ? 'По вашему запросу препараты не найдены'
                  : lang === 'uz'
                  ? 'Soʻrovingiz boʻyicha preparatlar topilmadi'
                  : 'No pharmaceutical products found matching your query'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setDispenseFilter('all');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0B3B60] rounded-lg hover:bg-[#082B47] transition-colors cursor-pointer"
              >
                {t.resetFilters}
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product, index) => (
                    <motion.article
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -6 }}
                      className="group bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between transition-shadow duration-300 hover:border-[#0B3B60]/40 hover:shadow-[0_20px_42px_-12px_rgba(11,59,96,0.16)]"
                    >
                      <div>
                        <ProductPackageVisual product={product} lang={lang} />

                        <div className="mt-3.5 flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
                          <span className="text-[#0D9488] font-semibold truncate">
                            {product.categoryLabel[lang]}
                          </span>
                          <span
                            className={`shrink-0 font-semibold ${
                              product.dispenseType === 'Rx'
                                ? 'text-rose-700'
                                : 'text-emerald-700'
                            }`}
                          >
                            {product.dispenseType === 'Rx' ? 'Rx' : 'OTC'}
                          </span>
                        </div>

                        <h3 className="mt-1 text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B3B60] transition-colors">
                          {product.name[lang]}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">
                          {lang === 'ru' ? 'МНН:' : lang === 'uz' ? 'MNN:' : 'INN:'}{' '}
                          <span className="text-slate-700">{product.inn[lang]}</span>
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-400">
                              {lang === 'ru'
                                ? 'Дозировка:'
                                : lang === 'uz'
                                ? 'Dozasi:'
                                : 'Strength:'}
                            </span>
                            <span className="font-[family-name:var(--font-mono)] font-medium text-slate-800 text-right">
                              {product.dosageStrength}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-400">
                              {lang === 'ru'
                                ? 'Страна:'
                                : lang === 'uz'
                                ? 'Mamlakat:'
                                : 'Origin:'}
                            </span>
                            <span className="font-medium text-slate-700">
                              {product.country[lang]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#0B3B60] bg-slate-100 hover:bg-[#0B3B60] hover:text-white rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{t.btnDossier}</span>
                        </button>
                        <Link
                          href="/#contacts"
                          className="inline-flex items-center justify-center px-3.5 py-2.5 text-xs font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl transition-colors whitespace-nowrap shrink-0"
                          title={t.btnRequestQuote}
                        >
                          <span>
                            {lang === 'ru' ? 'КП' : lang === 'uz' ? 'KP' : 'Quote'}
                          </span>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Interactive Pagination Controls (Max 4 Products per Page) */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="text-xs sm:text-sm font-medium text-slate-600">
                    {lang === 'ru' && (
                      <>
                        Показано{' '}
                        <span className="font-[family-name:var(--font-mono)] font-bold text-slate-900">
                          {(safeCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                          {Math.min(
                            safeCurrentPage * PRODUCTS_PER_PAGE,
                            filteredProducts.length
                          )}
                        </span>{' '}
                        из{' '}
                        <span className="font-[family-name:var(--font-mono)] font-bold text-slate-900">
                          {filteredProducts.length}
                        </span>{' '}
                        препаратов
                      </>
                    )}
                    {lang === 'uz' && (
                      <>
                        Ko‘rsatilmoqda:{' '}
                        <span className="font-[family-name:var(--font-mono)] font-bold text-slate-900">
                          {(safeCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                          {Math.min(
                            safeCurrentPage * PRODUCTS_PER_PAGE,
                            filteredProducts.length
                          )}
                        </span>{' '}
                        /{' '}
                        <span className="font-[family-name:var(--font-mono)] font-bold text-slate-900">
                          {filteredProducts.length}
                        </span>{' '}
                        dori vositalari
                      </>
                    )}
                    {lang === 'en' && (
                      <>
                        Showing{' '}
                        <span className="font-[family-name:var(--font-mono)] font-bold text-slate-900">
                          {(safeCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                          {Math.min(
                            safeCurrentPage * PRODUCTS_PER_PAGE,
                            filteredProducts.length
                          )}
                        </span>{' '}
                        of{' '}
                        <span className="font-[family-name:var(--font-mono)] font-bold text-slate-900">
                          {filteredProducts.length}
                        </span>{' '}
                        products
                      </>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <button
                      type="button"
                      disabled={safeCurrentPage <= 1}
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous page"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {lang === 'ru'
                          ? 'Назад'
                          : lang === 'uz'
                          ? 'Oldingi'
                          : 'Prev'}
                      </span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => {
                        const isCurrent = pageNum === safeCurrentPage;
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => setCurrentPage(pageNum)}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={`w-9 h-9 rounded-xl font-[family-name:var(--font-mono)] text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center ${
                              isCurrent
                                ? 'bg-[#0B3B60] text-white shadow-[0_6px_16px_-4px_rgba(11,59,96,0.45)]'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}

                    <button
                      type="button"
                      disabled={safeCurrentPage >= totalPages}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      aria-label="Next page"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      <span className="hidden sm:inline">
                        {lang === 'ru'
                          ? 'Вперед'
                          : lang === 'uz'
                          ? 'Keyingi'
                          : 'Next'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>

      {/* =====================================================================
          3. PRODUCT DOSSIER MODAL
         ===================================================================== */}
      <AnimatePresence>
        {activeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-5 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
                    <span>{activeProduct.categoryLabel[lang]}</span>
                    <span>·</span>
                    <span>{activeProduct.standard}</span>
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900">
                    {activeProduct.name[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    {lang === 'ru' ? 'МНН:' : lang === 'uz' ? 'MNN:' : 'INN:'}{' '}
                    <span className="text-slate-800">{activeProduct.inn[lang]}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  aria-label="Close modal"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/70 text-xs">
                <div>
                  <span className="text-slate-400 block">
                    {lang === 'ru'
                      ? 'Форма выпуска:'
                      : lang === 'uz'
                      ? 'Chiqarilish shakli:'
                      : 'Dosage Form:'}
                  </span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {activeProduct.dosageForm[lang]}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">
                    {lang === 'ru'
                      ? 'Дозировка и фасовка:'
                      : lang === 'uz'
                      ? 'Dozasi va qadoqlanishi:'
                      : 'Strength & Pack Size:'}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] font-semibold text-slate-800 mt-0.5 block">
                    {activeProduct.dosageStrength} · {activeProduct.packSize}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">
                    {lang === 'ru'
                      ? 'Регистрационное удостоверение:'
                      : lang === 'uz'
                      ? 'Roʻyxatdan oʻtkazilganlik guvohnomasi:'
                      : 'Marketing Authorization:'}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] font-semibold text-[#0B3B60] mt-0.5 block">
                    {activeProduct.regNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">
                    {lang === 'ru'
                      ? 'Условия хранения (GDP):'
                      : lang === 'uz'
                      ? 'Saqlash sharoiti (GDP):'
                      : 'Storage Conditions (GDP):'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-800 mt-0.5">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-[#0D9488]" />
                    {activeProduct.storageTemp}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'ru'
                    ? 'Показания к применению (SmPC)'
                    : lang === 'uz'
                    ? 'Qoʻllash uchun koʻrsatmalar (SmPC)'
                    : 'Therapeutic Indications (SmPC)'}
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeProduct.indications[lang]}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {t.menuClose}
                </button>
                <Link
                  href="/#contacts"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B3B60] hover:bg-[#082B47] rounded-xl transition-colors text-center"
                >
                  {t.btnRequestQuote}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          4. CORPORATE FOOTER
         ===================================================================== */}
      <footer className="bg-[#071526] text-slate-400 border-t border-slate-800/80 py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-white font-bold">© 2017–2026 INSO Group</span>
            <span>
              ·{' '}
              {lang === 'ru'
                ? 'Портфель стандарта EU GMP и GDP'
                : lang === 'uz'
                ? 'EU GMP va GDP standartidagi portfel'
                : 'EU GMP & GDP Certified Portfolio'}
            </span>
          </div>
          <Link
            href="/"
            className="text-teal-300 hover:text-white font-semibold transition-colors"
          >
            {t.backHome}
          </Link>
        </div>
      </footer>
    </div>
  );
}
