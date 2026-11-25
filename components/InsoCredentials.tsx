'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';
import { getDictionary } from '@/locales';

export default function InsoCredentials({ lang }: { lang: Language }) {
  const t = getDictionary(lang).distribution;

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="scroll-mt-20 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 text-slate-900"
    >
      <div className="mx-auto max-w-[1360px] w-full px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* =================================================================
            1. SECTION HEADER (Editorial serif-italic alignment matching Hero)
           ================================================================= */}
        <div className="max-w-3xl space-y-3">
          <div className="hero-eyebrow text-xs font-semibold text-[var(--inso-badge-color)] uppercase tracking-[0.16em]">
            <span>{t.badge}</span>
          </div>
          <h2
            id="credentials-title"
            className="text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight leading-[1.12] text-balance"
          >
            <em className="font-serif italic font-normal text-[var(--inso-accent-italic)]">{t.title}</em>
          </h2>
          <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* =================================================================
            2. SWISS EDITORIAL MODULAR GRID (Pristine photo + clean narrative)
           ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Clean, Unobstructed Warehouse Photo (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
              <Image
                src="/assets/pharma/sklad2.webp"
                alt={t.photoCaption}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            {/* Clean Caption and Calm Link below Photo */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
              <span>{t.photoCaption}</span>
              <a
                href="#about"
                className="inline-flex items-center gap-1 font-semibold text-[var(--inso-primary)] hover:underline transition-colors"
              >
                <span>{t.photoLink}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 2 Clean Text Blocks on Light Background (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
            {/* Block 1: Licensing & WHO GDP Standard */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {t.licenseTitle}
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                {t.licenseDesc}
              </p>
              {/* Actions: One Solid Button + One Calm Text Link */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/license/inso_gdp.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inso-action inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-xs"
                >
                  <span>{t.pdfAction}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="mailto:registration@inso.uz?subject=Licence%20Package%20Request"
                  className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-800 transition-colors"
                >
                  {t.licenseAction}
                </a>
              </div>
            </div>

            {/* Subtle Hairline Divider between right blocks */}
            <div className="my-8 lg:my-10 border-t border-slate-200" />

            {/* Block 2: Nationwide Delivery */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {t.deliveryTitle}
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                {t.deliveryDesc}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {t.deliveryCities}
              </p>
              <div className="pt-1">
                <a
                  href="mailto:sales@inso.uz?subject=Regional%20Supply%20Inquiry"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--inso-primary)] hover:underline transition-colors"
                >
                  <span>{t.deliveryAction}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            3. KEY METRICS ROW (Clean, Frameless, Pure Swiss Typography)
           ================================================================= */}
        <div className="border-y border-slate-200 py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {/* Metric 1 */}
            <div className="md:pr-8 md:border-r border-slate-200">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-none">
                {t.metric1Val}
              </div>
              <div className="mt-2.5 text-sm sm:text-[15px] text-slate-600 font-normal">
                {t.metric1Label}
              </div>
            </div>

            {/* Metric 2 */}
            <div className="md:px-8 md:border-r border-slate-200">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-none">
                {t.metric2Val}
              </div>
              <div className="mt-2.5 text-sm sm:text-[15px] text-slate-600 font-normal">
                {t.metric2Label}
              </div>
            </div>

            {/* Metric 3 */}
            <div className="md:pl-8">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-none">
                {t.metric3Val}
              </div>
              <div className="mt-2.5 text-sm sm:text-[15px] text-slate-600 font-normal">
                {t.metric3Label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
