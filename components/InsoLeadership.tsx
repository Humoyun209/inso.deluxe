'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback, type KeyboardEvent } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

type Label = string | Record<Language, string>;

interface Portrait {
  id: string;
  file: string;
  name: Label;
  role: Label;
  fullRole: Record<Language, string>;
  bio: Record<Language, string>;
  historical?: boolean;
}

const portraits: Portrait[] = [
  {
    id: 'ceo',
    file: 'ceo',
    name: "Rustam O'tkirovich",
    role: 'CEO',
    fullRole: {
      ru: 'Главный исполнительный директор INSO Group',
      uz: 'INSO Group bosh ijrochi direktori',
      en: 'Chief Executive Officer, INSO Group',
    },
    bio: {
      ru: 'Стратегическое лидерство, масштабирование бизнеса и реализация видения холдинга на рынках Центральной Азии.',
      uz: 'Strategik yetakchilik, biznesni kengaytirish va Markaziy Osiyo bozorlarida xolding maqsadlarini amalga oshirish.',
      en: 'Strategic leadership, business scaling, and executing the group’s vision across Central Asian markets.',
    },
  },
  {
    id: 'cto',
    file: 'cto',
    name: 'Humoyun Ahmedov',
    role: 'CTO',
    fullRole: {
      ru: 'Технический директор',
      uz: 'Texnik direktor',
      en: 'Chief Technology Officer',
    },
    bio: {
      ru: 'Развитие технологической инфраструктуры, автоматизация складской и фармацевтической логистики.',
      uz: 'Texnologik infratuzilmani rivojlantirish, ombor va farmatsevtika logistikasini avtomatlashtirish.',
      en: 'Technological infrastructure development and pharmaceutical logistics automation.',
    },
  },
  {
    id: 'cdo',
    file: 'cdo',
    name: 'Ibrokhim Halil',
    role: 'CDO',
    fullRole: {
      ru: 'Директор по цифровой трансформации',
      uz: 'Raqamli transformatsiya direktori',
      en: 'Chief Digital Officer',
    },
    bio: {
      ru: 'Цифровизация бизнес-процессов, data-driven управление и развитие дистрибьюторских каналов.',
      uz: 'Biznes jarayonlarini raqamlashtirish, data-driven boshqaruv va distributsiya tahlili.',
      en: 'Digital transformation, data-driven management, and distribution ecosystem growth.',
    },
  },
  {
    id: 'cho',
    file: 'cho',
    name: 'Madina Mirsodiqova',
    role: 'CHO',
    fullRole: {
      ru: 'Директор по управлению талантами',
      uz: 'Inson resurslari direktori',
      en: 'Chief Human Resources Officer',
    },
    bio: {
      ru: 'Формирование экспертной команды, развитие талантов и поддержание корпоративной культуры роста.',
      uz: 'Kuchli jamoani shakllantirish, iqtidorlarni rivojlantirish va ishonch madaniyati.',
      en: 'Building high-impact teams, talent nurturing, and fostering an organizational culture of trust.',
    },
  },
  {
    id: 'cherchill',
    file: 'cherchill',
    historical: true,
    name: {
      ru: 'Уинстон Черчилль',
      uz: 'Uinston Cherchill',
      en: 'Winston Churchill',
    },
    role: {
      ru: 'Премьер-министр Великобритании',
      uz: 'Buyuk Britaniya bosh vaziri',
      en: 'Prime Minister of the United Kingdom',
    },
    fullRole: {
      ru: 'Исторический ориентир антикризисного управления',
      uz: 'Inqirozga qarshi boshqaruvning tarixiy mezoni',
      en: 'Historical benchmark in crisis governance',
    },
    bio: {
      ru: 'Символ стратегической стойкости, ораторского искусства и непоколебимой воли при принятии ключевых решений.',
      uz: 'Strategik sabr-toqat, notiqlik san’ati va qat’iy qarorlar qabul qilish ramzi.',
      en: 'A symbol of strategic endurance, leadership under pressure, and resolute decision-making.',
    },
  },
  {
    id: 'stalin',
    file: 'stalin',
    historical: true,
    name: {
      ru: 'Иосиф Сталин',
      uz: 'Iosif Stalin',
      en: 'Joseph Stalin',
    },
    role: {
      ru: 'Председатель Совета Министров СССР',
      uz: 'SSSR Vazirlar Kengashi raisi',
      en: 'Chairman of the Council of Ministers of the USSR',
    },
    fullRole: {
      ru: 'Исторический опыт масштабной индустриализации',
      uz: 'Keng ko‘lamli sanoatlashtirish tajribasi',
      en: 'Historical benchmark of large-scale industrialization',
    },
    bio: {
      ru: 'Пример глобального индустриального планирования, масштабного развёртывания инфраструктуры и системной дисциплины.',
      uz: 'Keng ko‘lamli sanoat rejalashtirish, infratuzilmani yo‘lga qo‘yish va tizimli intizom tajribasi.',
      en: 'Historical experience of systemic discipline, rapid industrial mobilization, and complex infrastructure buildout.',
    },
  },
];

const copy = {
  ru: {
    sectionBadge: 'Руководство INSO Group',
    sectionTitle: 'Команда, которая ведёт INSO вперёд',
    sectionLead: 'Сочетание стратегической визионерности, технологической экспертизы и системного управления.',
    previous: 'Предыдущий портрет',
    next: 'Следующий портрет',
    historyLabel: 'Исторический ориентир',
  },
  uz: {
    sectionBadge: 'INSO Group rahbariyati',
    sectionTitle: 'INSO guruhini olg‘a yetaklayotgan jamoa',
    sectionLead: 'Strategik qarash, texnologik tajriba va tizimli boshqaruv uyg‘unligi.',
    previous: 'Oldingi portret',
    next: 'Keyingi portret',
    historyLabel: 'Tarixiy mezon',
  },
  en: {
    sectionBadge: 'INSO Group Leadership',
    sectionTitle: 'The Team Driving INSO Forward',
    sectionLead: 'Combining strategic vision, technology leadership, and institutional discipline.',
    previous: 'Previous portrait',
    next: 'Next portrait',
    historyLabel: 'Historical Context',
  },
};

const localize = (label: Label, lang: Language): string =>
  typeof label === 'string' ? label : label[lang];

function getCircularOffset(index: number, activeIndex: number, total: number): number {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function InsoLeadership({ lang }: { lang: Language }) {
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];
  const total = portraits.length;

  useEffect(() => {
    const updateSize = () => setWindowWidth(window.innerWidth);
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const step = useCallback(
    (direction: number) => {
      setIndex((curr) => (curr + total + direction) % total);
    },
    [total]
  );

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -35 || info.velocity.x < -350) {
      step(1);
    } else if (info.offset.x > 35 || info.velocity.x > 350) {
      step(-1);
    }
  };

  // Linear layout spacing for large cards
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const linearOffset = isMobile ? 240 : isTablet ? 320 : 380;

  return (
    <section
      id="leadership"
      aria-label={t.sectionTitle}
      className="scroll-mt-18 relative py-8 sm:py-12 lg:py-14 overflow-hidden min-h-[calc(100svh-4rem)] flex flex-col justify-center"
      onKeyDown={onKeyDown}
      tabIndex={0}
      ref={containerRef}
    >
      <div className="mx-auto max-w-[1360px] w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header (Native light styling matching the page) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#286e65] mb-2 flex items-center justify-center gap-2.5">
            <span className="w-6 h-px bg-[#286e65]/50" />
            {t.sectionBadge}
            <span className="w-6 h-px bg-[#286e65]/50" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-medium tracking-tight text-[#183f48] mb-2 leading-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#456b63] font-light max-w-xl mx-auto leading-relaxed">
            {t.sectionLead}
          </p>
        </div>

        {/* Linear Large Cards Slider (Directly on page, no dark wrapper container) */}
        <div className="relative w-full flex flex-col items-center">
          {/* Card Track */}
          <div className="relative w-full h-[470px] sm:h-[510px] md:h-[530px] flex items-center justify-center overflow-visible select-none touch-pan-y">
            {portraits.map((person, i) => {
              const diff = getCircularOffset(i, index, total);
              const isActive = diff === 0;
              const isVisible = Math.abs(diff) <= 1;

              if (!isVisible) return null;

              const xTranslate = diff === 0 ? 0 : diff * linearOffset;
              const scale = isActive ? 1 : 0.88;
              const opacity = isActive ? 1 : isMobile ? 0.35 : 0.55;
              const zIndex = isActive ? 20 : 10;

              const nameParts = localize(person.name, lang).split(' ');
              const firstName = nameParts[0] || '';
              const lastName = nameParts.slice(1).join(' ');

              return (
                <motion.div
                  key={person.id}
                  className="absolute cursor-pointer will-change-transform"
                  animate={{
                    x: xTranslate,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    mass: 0.85,
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={isActive ? handleDragEnd : undefined}
                  onClick={() => {
                    if (!isActive) setIndex(i);
                  }}
                  whileHover={{
                    scale: isActive ? 1.012 : scale * 1.025,
                    opacity: isActive ? 1 : 0.75,
                  }}
                  aria-label={localize(person.name, lang)}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                >
                  {/* Large Hero Card */}
                  <div
                    className={`relative w-[280px] sm:w-[325px] md:w-[350px] h-[450px] sm:h-[490px] md:h-[510px] rounded-3xl overflow-hidden bg-[#102422] transition-all duration-300 ${
                      isActive
                        ? 'shadow-[0_24px_55px_-10px_rgba(20,60,54,0.38)] ring-2 ring-[#287e70]/50'
                        : 'shadow-[0_12px_30px_rgba(20,60,54,0.18)] opacity-95'
                    }`}
                  >
                    {/* Portrait Image */}
                    <Image
                      src={`/assets/directors/${person.file}.webp`}
                      alt={localize(person.name, lang)}
                      fill
                      priority={isActive}
                      sizes="(min-width: 768px) 350px, (min-width: 640px) 325px, 280px"
                      className="object-cover object-[center_16%] select-none pointer-events-none"
                    />

                    {/* Top Role Badge */}
                    <div className="absolute top-0 inset-x-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                      <span className="text-[11px] font-mono tracking-wider text-emerald-300 uppercase px-3 py-1 rounded-full bg-black/40 border border-emerald-400/30 backdrop-blur-md">
                        {localize(person.role, lang)}
                      </span>
                      {person.historical && (
                        <span className="text-[10px] font-mono text-amber-200 tracking-wide px-2 py-0.5 rounded bg-amber-950/60 border border-amber-400/30 backdrop-blur-md">
                          HISTORICAL
                        </span>
                      )}
                    </div>

                    {/* Bottom Info Overlay directly inside the card */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 bg-gradient-to-t from-[#081817]/95 via-[#081817]/80 via-50% to-transparent flex flex-col justify-end text-left text-white">
                      {/* Name with Georgia serif accent */}
                      <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-medium tracking-tight leading-snug">
                        {firstName}{' '}
                        {lastName && (
                          <em className="font-serif italic font-normal text-emerald-300">
                            {lastName}
                          </em>
                        )}
                      </h3>

                      {/* Full Role */}
                      <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 font-light line-clamp-1">
                        {person.fullRole[lang]}
                      </p>

                      {/* Bio on active card */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-slate-300 leading-relaxed mt-2.5 font-light line-clamp-2 border-t border-white/15 pt-2"
                          >
                            {person.bio[lang]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Controls Bar (Counter + Indicator dots + Arrows) */}
          <div className="relative z-20 flex items-center justify-between w-full max-w-lg mt-6 pt-4 border-t border-[#9fb6a7]/60">
            {/* Counter */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-[#183f48]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-400 text-sm font-mono">/ {String(total).padStart(2, '0')}</span>
              <span className="text-xs text-[#286e65] font-medium ml-2 hidden sm:inline">
                {localize(portraits[index].name, lang)}
              </span>
            </div>

            {/* Indicator dots */}
            <div className="flex items-center gap-1.5">
              {portraits.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === index
                      ? 'w-7 bg-[#235e55]'
                      : 'w-1.5 bg-[#82a699]/40 hover:bg-[#82a699]'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => step(-1)}
                className="size-9 rounded-full flex items-center justify-center border border-[#82a699] text-[#183f48] hover:bg-[#235e55] hover:text-white hover:border-[#235e55] transition-all duration-200 active:scale-95 shadow-sm"
                aria-label={t.previous}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="size-9 rounded-full flex items-center justify-center border border-[#82a699] text-[#183f48] hover:bg-[#235e55] hover:text-white hover:border-[#235e55] transition-all duration-200 active:scale-95 shadow-sm"
                aria-label={t.next}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
