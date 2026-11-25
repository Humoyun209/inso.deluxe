'use client';

import Image from 'next/image';
import { CORE_VALUES, type Language } from '@/lib/insopharm-data';
import { getDictionary } from '@/locales';

export default function InsoVisionValues({ lang }: { lang: Language }) {
  const copy = getDictionary(lang).visionValues;

  return (
    <section
      id="values"
      aria-labelledby="vision-title"
      className="scroll-mt-20 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 text-slate-900"
    >
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* =================================================================
            1. ВЕРХНИЙ БАННЕР («НАШЕ ВИДЕНИЕ • 2029»)
            - Строгое скругление rounded-2xl (16px)
            - flex-col justify-between: подпись сверху, заголовок снизу (без пустот)
            - Сбалансированный кегль без ломки ритма на длинных словах
            - Чистый гротеск uppercase tracking-widest (без font-mono)
            - 100% чистая фотография без HUD-наложений и плашек
           ================================================================= */}
        <div className="rounded-2xl overflow-hidden inso-vision-banner grid grid-cols-1 md:grid-cols-12 items-stretch border border-slate-200/40 shadow-xs relative isolate">
          {/* Subtle brand emblem watermark behind vision text */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-20 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] opacity-[0.05] mix-blend-screen -z-10"
          >
            <Image
              src="/photos/bg-element.svg"
              alt=""
              width={420}
              height={420}
              className="w-full h-full object-contain"
              priority={false}
            />
          </div>

          {/* Левая часть: текстовый блок */}
          <div className="relative z-10 md:col-span-6 p-7 sm:p-9 lg:p-12 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
            {/* Верхний лейбл: гротеск в верхнем регистре с увеличенным трекингом */}
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[var(--inso-dark-accent)]">
                <span aria-hidden="true" className="h-px w-6 bg-[var(--inso-dark-accent)]" />
                <span>{copy.label}</span>
              </div>
            </div>

            {/* Основной заголовок: прижат к нижнему левому краю, сбалансированный ритм */}
            <div className="mt-8 md:mt-0">
              <h2
                id="vision-title"
                className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] leading-[1.2] font-normal tracking-tight text-white text-balance font-serif italic"
              >
                <em className="font-serif italic font-normal text-[var(--inso-dark-accent)]">
                  {copy.lead} {copy.region}{copy.end}
                </em>
              </h2>
            </div>
          </div>

          {/* Правая часть: абсолютно чистая фотография без наложений */}
          <div className="md:col-span-6 relative min-h-[260px] sm:min-h-[320px] md:min-h-full bg-slate-900">
            <Image
              src="/assets/photos/team-specialists-women.jpg"
              alt={copy.photoAlt}
              fill
              sizes="(min-width: 1280px) 680px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>

        {/* =================================================================
            2. СЕКЦИЯ «НАШИ ЦЕННОСТИ»
            - Крупный заголовок в единой корпоративной иерархии (гротеск + антиква курсивом)
            - Идеально выровненная сетка grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16
            - 100% контрастность и читаемость (без полупрозрачности/fade)
            - Спокойная структурирующая нумерация 01–06
            - Сохранение оригинальных текстов всех 6 ценностей
           ================================================================= */}
        <div className="space-y-8 lg:space-y-10">
          {/* Заголовок секции ценностей */}
          <div className="max-w-3xl space-y-3">
            <div className="hero-eyebrow text-xs font-semibold text-[var(--inso-badge-color)] uppercase tracking-[0.16em]">
              <span>{copy.valuesBadge}</span>
            </div>
            <h3
              id="values-title"
              className="text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight leading-[1.12] font-serif italic text-[var(--inso-accent-italic)]"
            >
              <em className="font-serif italic font-normal text-[var(--inso-accent-italic)]">
                {copy.valuesMain} {copy.valuesAccent}
              </em>
            </h3>
            <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
              {copy.valuesDesc}
            </p>
          </div>

          {/* Единая сетка всех 6 пунктов на общей горизонтальной оси */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16">
            {CORE_VALUES.map((value) => (
              <div
                key={value.id}
                className="border-t border-slate-200 pt-6 pb-8 sm:pt-7 sm:pb-9 flex flex-col justify-start"
              >
                {/* Нумерация и заголовок на одной строке */}
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="text-xs sm:text-sm font-semibold text-[var(--inso-primary)]/80 tabular-nums shrink-0">
                    {value.number}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                    {value.title[lang]}
                  </h4>
                </div>

                {/* Описание ценности с чистой контрастностью 100% */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">
                  {value.summary[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
