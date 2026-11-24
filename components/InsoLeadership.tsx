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
}

const portraits: Portrait[] = [
  {
    id: 'ceo',
    file: 'ceo',
    name: 'Rustam Haqberdiyev',
    role: 'CEO',
    fullRole: {
      ru: 'Генеральный директор INSO Group (CEO)',
      uz: 'INSO Group bosh direktori (CEO)',
      en: 'CEO & General Director, INSO Group',
      zh: 'INSO Group 总经理兼首席执行官 (CEO)',
    },
    bio: {
      ru: 'Стратегическое лидерство, масштабирование бизнеса и реализация видения холдинга на рынках Центральной Азии.',
      uz: 'Strategik yetakchilik, biznesni kengaytirish va Markaziy Osiyo bozorlarida xolding maqsadlarini amalga oshirish.',
      en: 'Strategic leadership, business scaling, and executing the group’s vision across Central Asian markets.',
      zh: '制定集团长期发展战略，推动商业规模化扩张，深化中亚医药市场的战略布局与落地。',
    },
  },
  {
    id: 'cho',
    file: 'cho',
    name: 'Madina Mirsodiqova',
    role: 'HR Director',
    fullRole: {
      ru: 'Директор по персоналу (Director of HR)',
      uz: 'Inson resurslari direktori (Director of HR)',
      en: 'Director of HR',
      zh: '人力资源总监 (Director of HR)',
    },
    bio: {
      ru: 'Формирование экспертной команды, развитие талантов и поддержание корпоративной культуры роста.',
      uz: 'Kuchli jamoani shakllantirish, iqtidorlarni rivojlantirish va ishonch madaniyati.',
      en: 'Building high-impact teams, talent nurturing, and fostering an organizational culture of trust.',
      zh: '吸纳与培养行业高精尖医药人才，建设卓越团队与充满信任的现代企业组织文化。',
    },
  },
  {
    id: 'consulting',
    file: 'feruz',
    name: 'Feruz Abdurashidov',
    role: 'Consulting',
    fullRole: {
      ru: 'Директор направления INSO Consulting',
      uz: 'INSO Consulting yoʻnalishi direktori',
      en: 'Director, INSO Consulting',
      zh: 'INSO Consulting 咨询板块总监',
    },
    bio: {
      ru: 'Экспертное сопровождение регистрации лекарственных средств, регуляторный консалтинг и стратегическое лицензирование фармпроизводителей.',
      uz: 'Dori vositalarini roʻyxatdan oʻtkazish boʻyicha ekspert koʻmagi, regulyator konsalting va farmatsevtika litsenziyalash.',
      en: 'Expert regulatory affairs, pharmaceutical product registration, and strategic licensing for international manufacturers.',
      zh: '医药产品国家注册准入专家服务、法规事务顾问及国际制药企业战略授权与合规辅导。',
    },
  },
];

const copy = {
  ru: {
    sectionBadge: '06 · РУКОВОДСТВО ХОЛДИНГА',
    sectionTitle: 'Команда, которая ведёт INSO вперёд',
    sectionLead: 'Сочетание стратегической визионерности, технологической экспертизы и системного управления.',
    previous: 'Предыдущий портрет',
    next: 'Следующий портрет',
  },
  uz: {
    sectionBadge: '06 · XOLDING RAHBARIYATI',
    sectionTitle: 'INSO guruhini olg‘a yetaklayotgan jamoa',
    sectionLead: 'Strategik qarash, texnologik tajriba va tizimli boshqaruv uyg‘unligi.',
    previous: 'Oldingi portret',
    next: 'Keyingi portret',
  },
  en: {
    sectionBadge: '06 · EXECUTIVE LEADERSHIP',
    sectionTitle: 'The Team Driving INSO Forward',
    sectionLead: 'Combining strategic vision, technology leadership, and institutional discipline.',
    previous: 'Previous portrait',
    next: 'Next portrait',
  },
  zh: {
    sectionBadge: '06 · 集团管理团队',
    sectionTitle: '引领INSO前行的领导集体',
    sectionLead: '融合战略前瞻力、医药专业深耕与现代化企业管理体系。',
    previous: '上一个',
    next: '下一个',
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
      className="scroll-mt-18 relative py-10 sm:py-14 lg:py-16 overflow-hidden"
      onKeyDown={onKeyDown}
      tabIndex={0}
      ref={containerRef}
    >
      <div className="mx-auto max-w-[1360px] w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header (Native light styling matching the page) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[var(--inso-badge-color)] mb-2 flex items-center justify-center gap-2.5">
            <span className="w-6 h-px bg-[var(--inso-badge-color)]/50" />
            {t.sectionBadge}
            <span className="w-6 h-px bg-[var(--inso-badge-color)]/50" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-medium tracking-tight text-[var(--inso-heading-text)] mb-2 leading-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[var(--inso-muted-text)] font-light max-w-xl mx-auto leading-relaxed">
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
                    className={`relative w-[280px] sm:w-[325px] md:w-[350px] h-[450px] sm:h-[490px] md:h-[510px] rounded-3xl overflow-hidden bg-[var(--inso-footer-bg)] transition-all duration-300 ${
                      isActive
                        ? 'shadow-[0_24px_55px_-10px_rgba(17,36,77,0.38)] ring-2 ring-[var(--inso-primary)]/50'
                        : 'shadow-[0_12px_30px_rgba(17,36,77,0.18)] opacity-95'
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
                      <span className="text-[11px] font-semibold tracking-wider text-[var(--inso-dark-accent)] uppercase px-3 py-1 rounded-full bg-black/40 border border-[var(--inso-dark-accent)]/30 backdrop-blur-md">
                        {localize(person.role, lang)}
                      </span>
                    </div>

                    {/* Bottom Info Overlay directly inside the card */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 bg-gradient-to-t from-[#0A1930]/95 via-[#0A1930]/80 via-50% to-transparent flex flex-col justify-end text-left text-white">
                      {/* Name with Georgia serif accent */}
                      <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-medium tracking-tight leading-snug">
                        {firstName}{' '}
                        {lastName && (
                          <em className="font-serif italic font-normal text-[var(--inso-dark-accent)]">
                            {lastName}
                          </em>
                        )}
                      </h3>

                      {/* Full Role */}
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 font-light line-clamp-1">
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
          <div className="relative z-20 flex items-center justify-between w-full max-w-lg mt-6 pt-4 border-t border-[var(--inso-border-subtle)]">
            {/* Counter */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tabular-nums text-[var(--inso-heading-text)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-400 text-sm tabular-nums">/ {String(total).padStart(2, '0')}</span>
              <span className="text-xs text-[var(--inso-muted-text)] font-medium ml-2 hidden sm:inline">
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
                      ? 'w-7 bg-[var(--inso-primary)]'
                      : 'w-1.5 bg-[var(--inso-border-subtle)] hover:bg-[var(--inso-muted-text)]'
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
                className="size-9 rounded-full flex items-center justify-center border border-[var(--inso-border-subtle)] text-[var(--inso-heading-text)] hover:bg-[var(--inso-primary)] hover:text-white hover:border-[var(--inso-primary)] transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                aria-label={t.previous}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="size-9 rounded-full flex items-center justify-center border border-[var(--inso-border-subtle)] text-[var(--inso-heading-text)] hover:bg-[var(--inso-primary)] hover:text-white hover:border-[var(--inso-primary)] transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
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
