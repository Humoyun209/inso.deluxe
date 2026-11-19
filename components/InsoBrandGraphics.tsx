'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Atom,
  HeartPulse,
  Brain,
  FlaskConical,
  Syringe,
  Pill,
  Droplets,
  Sparkles,
  Award,
  Dna,
  Microscope,
  ShieldCheck,
  Leaf,
  Activity,
} from 'lucide-react';
import { ProductItem, Language } from '@/lib/insopharm-data';

/**
 * Smooth animated count-up number when scrolled into view
 */
export function AnimatedMetricValue({
  target,
  suffix = '',
  durationMs = 1600,
}: {
  target: number;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      // easeOutExpo curve for crisp deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.round(eased * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isInView, target, durationMs]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span>{current}</span>
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}

export function MedicalAmbientBackground({
  variant = 'light',
}: {
  variant?: 'light' | 'contact' | 'dark';
}) {
  const isDark = variant === 'dark';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      <div
        className={`absolute -left-28 top-10 w-80 h-80 rounded-full blur-3xl ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-500/[0.04]'
        }`}
      />
      <div
        className={`absolute -right-28 bottom-10 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-sky-500/10' : 'bg-[#0B3B60]/[0.04]'
        }`}
      />
    </div>
  );
}

/**
 * Upgraded Hero Orbital Emblem with INSO at the center and the 6 Official Sub-Brands
 * (NEUES LEBEN, LPS, INOM, HB, GREENWELL, INSO SERVICE) orbiting around the main sphere.
 * Supports toggling `showSubbrands` to present both variants to the CEO.
 */
export function InsoOrbitalMark({
  size = 'md',
  showSubbrands = true,
  lang = 'ru',
}: {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubbrands?: boolean;
  lang?: Language;
}) {
  if (size === 'hero') {
    const subBrands = [
      {
        id: 'neues-leben',
        name: 'NEUES LEBEN',
        tag:
          lang === 'ru'
            ? 'GDP-Дистрибуция'
            : lang === 'uz'
            ? 'GDP Distribyutsiya'
            : 'GDP Distribution',
        positionClass: '-top-3 -left-2 sm:top-0 sm:-left-8',
        delay: 0,
        floatY: [-5, 5, -5],
        badgeBg:
          'bg-gradient-to-br from-[#0B3B60] to-blue-800 text-white shadow-[0_8px_18px_-4px_rgba(11,59,96,0.45)]',
        accentDot: 'bg-sky-500',
        borderHover: 'hover:border-sky-500/50',
        icon: <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />,
      },
      {
        id: 'lps',
        name: 'LPS',
        tag:
          lang === 'ru'
            ? 'Госпитальный сегмент'
            : lang === 'uz'
            ? 'Gospital segment'
            : 'Hospital Care',
        positionClass: '-top-3 -right-2 sm:top-0 sm:-right-8',
        delay: 0.35,
        floatY: [5, -5, 5],
        badgeBg:
          'bg-gradient-to-br from-sky-500 to-[#0B3B60] text-white shadow-[0_8px_18px_-4px_rgba(14,165,233,0.45)]',
        accentDot: 'bg-sky-500',
        borderHover: 'hover:border-sky-500/50',
        icon: <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />,
      },
      {
        id: 'inom',
        name: 'INSO INOM',
        tag:
          lang === 'ru'
            ? 'Rx, OTC и БАД'
            : lang === 'uz'
            ? 'Rx, OTC va BFQ'
            : 'Rx, OTC & Supplements',
        positionClass: 'top-[34%] -left-3 sm:top-[35%] sm:-left-12',
        delay: 0.7,
        floatY: [-4, 6, -4],
        badgeBg:
          'bg-gradient-to-br from-indigo-500 to-blue-700 text-white shadow-[0_8px_18px_-4px_rgba(79,70,229,0.45)]',
        accentDot: 'bg-indigo-500',
        borderHover: 'hover:border-indigo-500/50',
        icon: <Dna className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />,
      },
      {
        id: 'hb',
        name: 'INSO HB',
        tag:
          lang === 'ru'
            ? 'Кардио и стационары'
            : lang === 'uz'
            ? 'Kardio va shifoxonalar'
            : 'Cardio & ICU',
        positionClass: 'top-[34%] -right-3 sm:top-[35%] sm:-right-12',
        delay: 1.05,
        floatY: [6, -4, 6],
        badgeBg:
          'bg-gradient-to-br from-[#0D9488] to-teal-700 text-white shadow-[0_8px_18px_-4px_rgba(13,148,136,0.45)]',
        accentDot: 'bg-[#0D9488]',
        borderHover: 'hover:border-teal-500/50',
        icon: <HeartPulse className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />,
      },
      {
        id: 'greenwell',
        name: 'GREENWELL',
        tag:
          lang === 'ru'
            ? 'Vitaprotein® США'
            : lang === 'uz'
            ? 'Vitaprotein® AQSh'
            : 'Vitaprotein® US',
        positionClass: 'bottom-26 -left-2 sm:bottom-28 sm:-left-8',
        delay: 1.4,
        floatY: [-5, 5, -5],
        badgeBg:
          'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_8px_18px_-4px_rgba(22,163,74,0.45)]',
        accentDot: 'bg-emerald-500',
        borderHover: 'hover:border-emerald-500/50',
        icon: <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />,
      },
      {
        id: 'inso-service',
        name: 'INSO SERVICE',
        tag:
          lang === 'ru'
            ? 'CTD и Консалтинг'
            : lang === 'uz'
            ? 'CTD va Konsalting'
            : 'CTD & Consulting',
        positionClass: 'bottom-26 -right-2 sm:bottom-28 sm:-right-8',
        delay: 1.75,
        floatY: [5, -5, 5],
        badgeBg:
          'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_8px_18px_-4px_rgba(245,158,11,0.45)]',
        accentDot: 'bg-amber-500',
        borderHover: 'hover:border-amber-500/50',
        icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />,
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center justify-center py-6 px-3 sm:p-10 w-full max-w-[460px] mx-auto select-none"
      >
        {/* Animated breathing ambient aura */}
        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.22)_0%,rgba(11,59,96,0.12)_48%,transparent_74%)] blur-2xl"
        />

        {/* Outer Constellation Ring & 6 Orbiting Sub-Brands (Shown when showSubbrands is true) */}
        <AnimatePresence>
          {showSubbrands && (
            <>
              <motion.div
                key="constellation-ring"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
                }}
                className="pointer-events-none absolute top-2 sm:top-4 w-72 h-72 sm:w-[348px] sm:h-[348px] rounded-full border border-dashed border-slate-300/70"
              />

              {subBrands.map((brand) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: brand.floatY }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    y: {
                      duration: 3.2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'easeInOut',
                      delay: brand.delay,
                    },
                  }}
                  whileHover={{ scale: 1.07, y: -4 }}
                  className={`absolute z-20 ${brand.positionClass} flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 ${brand.borderHover} shadow-[0_14px_30px_-8px_rgba(11,59,96,0.16)] cursor-pointer transition-colors`}
                >
                  {/* Sub-brand Emblem Logo */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center shrink-0 ${brand.badgeBg}`}
                  >
                    {brand.icon}
                  </div>

                  {/* Sub-brand Name & Descriptor */}
                  <div className="pr-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#0F172A] leading-none whitespace-nowrap">
                        {brand.name}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${brand.accentDot}`}
                      />
                    </div>
                    <div className="text-[8.5px] sm:text-[9.5px] font-semibold text-slate-500 leading-tight mt-0.5 whitespace-nowrap">
                      {brand.tag}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Interactive Floating Sphere Container with Infinite Bounce Effect */}
        <motion.div
          animate={{
            y: [-7, 7],
            rotateZ: [-1.2, 1.2],
          }}
          transition={{
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            rotateZ: {
              duration: 4.8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          whileHover={{ scale: 1.04 }}
          className="relative z-10 flex items-center justify-center w-52 h-52 sm:w-68 sm:h-68 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_28px_70px_-15px_rgba(11,59,96,0.22)]"
        >
          {/* Outer rotating meridian ring (clockwise) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border border-sky-900/15"
          >
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0B3B60] ring-4 ring-sky-100 shadow-xs" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0D9488] ring-4 ring-teal-100 shadow-xs" />
          </motion.div>

          {/* Inner dashed quantum orbit (counter-clockwise) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-7 rounded-full border border-dashed border-teal-600/35"
          >
            <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1E40AF] ring-4 ring-blue-100" />
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0D9488] ring-4 ring-teal-100" />
          </motion.div>

          {/* Elliptical Orbital Track 1 (Rotating continuously) */}
          <motion.div
            animate={{ rotate: [15, 195, 375] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[88%] h-24 sm:h-28 rounded-full border border-sky-800/25"
          >
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0D9488]" />
          </motion.div>

          {/* Elliptical Orbital Track 2 (Counter-rotating continuously) */}
          <motion.div
            animate={{ rotate: [-15, -195, -375] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute w-24 sm:w-28 h-[88%] rounded-full border border-sky-800/25"
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0B3B60]" />
          </motion.div>

          {/* Center Core with Animated Atom */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.1 }}
            className="relative z-10 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#0B3B60] via-[#1E3A8A] to-[#0D9488] text-white shadow-[0_14px_34px_-6px_rgba(11,59,96,0.45)] cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            >
              <Atom className="w-12 h-12 sm:w-14 sm:h-14 text-white/95 stroke-[1.5]" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Subtle Ground Shadow that compresses & expands in sync with the floating bounce */}
        <motion.div
          aria-hidden="true"
          animate={{
            scaleX: [0.85, 1.08],
            opacity: [0.22, 0.42],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="mt-5 w-36 h-3 rounded-full bg-[#0B3B60]/25 blur-md"
        />

        {/* Animated Brand Hierarchy: Primary "INSO" + Secondary "GROUP" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-center"
        >
          <div className="text-4xl sm:text-6xl font-extrabold tracking-[0.18em] text-[#0B3B60] leading-none">
            INSO
          </div>
          <div className="mt-2 text-xs sm:text-sm font-bold tracking-[0.34em] text-[#0D9488] uppercase">
            GROUP
          </div>
          <AnimatePresence>
            {showSubbrands && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[9.5px] sm:text-[10px] font-bold text-slate-600 tracking-wider uppercase"
              >
                <Activity className="w-3 h-3 text-[#0D9488] shrink-0" />
                <span>INOM · HB · LPS · GREENWELL · NL · SERVICE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }

  const dims =
    size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
      ? 'w-12 h-12'
      : 'w-10 h-10';

  return (
    <motion.div
      whileHover={{ rotate: 90, scale: 1.06 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative inline-flex items-center justify-center ${dims} rounded-full border border-slate-300 bg-white shadow-xs shrink-0`}
    >
      <span className="absolute inset-1 rounded-full border border-sky-900/20" />
      <Atom className="w-5 h-5 text-[#0B3B60] stroke-[1.75]" />
    </motion.div>
  );
}

export function ProductPackageVisual({
  product,
  lang,
}: {
  product: ProductItem;
  lang: Language;
}) {
  const paletteMap: Record<
    ProductItem['packageColor'],
    {
      stripe: string;
      accentText: string;
      iconBg: string;
    }
  > = {
    cobalt: {
      stripe: 'bg-[#0B3B60]',
      accentText: 'text-[#0B3B60]',
      iconBg: 'bg-[#0B3B60]/10 text-[#0B3B60]',
    },
    teal: {
      stripe: 'bg-[#0D9488]',
      accentText: 'text-[#0F766E]',
      iconBg: 'bg-[#0D9488]/10 text-[#0F766E]',
    },
    emerald: {
      stripe: 'bg-emerald-700',
      accentText: 'text-emerald-800',
      iconBg: 'bg-emerald-700/10 text-emerald-700',
    },
    indigo: {
      stripe: 'bg-indigo-800',
      accentText: 'text-indigo-900',
      iconBg: 'bg-indigo-800/10 text-indigo-800',
    },
    rose: {
      stripe: 'bg-rose-700',
      accentText: 'text-rose-800',
      iconBg: 'bg-rose-700/10 text-rose-700',
    },
    amber: {
      stripe: 'bg-amber-600',
      accentText: 'text-amber-800',
      iconBg: 'bg-amber-600/10 text-amber-700',
    },
  };

  const theme = paletteMap[product.packageColor];

  const getProductStudioImage = () => {
    if (product.subbrandId === 'greenwell' || product.categoryId === 'vitamins') {
      return product.id === 'relax-sleep-vp-greenwell'
        ? '/assets/photos/greenwell-weightloss-box.jpg'
        : '/assets/photos/greenwell-vitamin-c.jpg';
    }
    switch (product.categoryId) {
      case 'cardiology':
      case 'neurology':
        return '/assets/pharma/cardio_neuro.jpg';
      case 'gastro':
        return '/assets/pharma/gastro_vitamins.jpg';
      case 'infusion':
        return '/assets/photos/gdp-pallet-amgv.jpg';
      case 'antibiotics':
        return '/assets/pharma/infusion_antibiotics.jpg';
      default:
        return '/assets/photos/greenwell-weightloss-box.jpg';
    }
  };

  const renderCategoryIcon = () => {
    switch (product.categoryId) {
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
        return <Syringe className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full h-48 rounded-xl bg-slate-900 border border-slate-200/80 overflow-hidden flex items-end justify-center p-3.5 group-hover:border-[#0B3B60]/40 transition-colors">
      <Image
        src={getProductStudioImage()}
        alt={product.name[lang]}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        referrerPolicy="no-referrer"
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108 opacity-90"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/35" />

      <div className="absolute top-2.5 left-3 z-10 font-[family-name:var(--font-mono)] text-[10px] font-medium text-white/90 tracking-tight">
        {product.regNumber}
      </div>

      <div className="absolute top-2.5 right-3 z-10 inline-flex items-center gap-1 text-[11px] font-semibold text-white">
        <Award className="w-3.5 h-3.5 text-teal-300" />
        <span>{product.standard}</span>
      </div>

      <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-lg border border-white/80 shadow-[0_10px_25px_-6px_rgba(15,23,42,0.28)] p-3 transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5 text-[#0B3B60]" />
            <span className="text-[10px] font-extrabold tracking-wider text-[#0B3B60] uppercase">
              INSO
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#0D9488] uppercase">
              {product.subbrandLabel || 'GROUP'}
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-slate-500">
            {product.packSize}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`w-2 h-2 rounded-xs shrink-0 ${theme.stripe}`} />
            <span
              className={`font-[family-name:var(--font-mono)] text-xs font-bold truncate ${theme.accentText}`}
            >
              {product.dosageStrength}
            </span>
          </div>
          <div className={`p-1.5 rounded-md shrink-0 ${theme.iconBg}`}>
            {renderCategoryIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}
