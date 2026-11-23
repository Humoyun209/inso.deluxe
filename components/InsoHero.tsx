import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, ClipboardCheck, Cross, FileText, Pause, Play } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

type HeroCopy = {
  sinceBadge: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroDescription: string;
  heroPartnerBtn: string;
  navCatalog: string;
};

const labels = {
  ru: { docs: 'Лицензии компании', next: 'Как устроена дистрибуция', play: 'Воспроизвести видео', pause: 'Приостановить видео' },
  en: { docs: 'Company licences', next: 'How INSO distributes medicines', play: 'Play video', pause: 'Pause video' },
  uz: { docs: 'Kompaniya litsenziyalari', next: 'INSO distribyutsiyasi qanday ishlaydi', play: 'Videoni ijro etish', pause: 'Videoni toʻxtatish' },
};

const introLine = {
  ru: ['От регистрации препарата', 'до поставки в аптеку'],
  en: ['From product registration', 'to pharmacy delivery'],
  uz: ['Dorini roʻyxatdan oʻtkazishdan', 'dorixonaga yetkazib berishgacha'],
};

function HeroHeading({ copy, overlay = false }: { copy: HeroCopy; overlay?: boolean }) {
  const Title = overlay ? 'div' : 'h1';
  return (
    <>
      <p className="hero-eyebrow">{copy.sinceBadge}</p>
      <Title className="hero-headline">{copy.heroHeadline}{' '}<em>{copy.heroHeadlineAccent}</em></Title>
    </>
  );
}

export default function InsoHero({ copy, lang, onDocuments, onBrandsHidden, children }: {
  copy: HeroCopy;
  lang: Language;
  onDocuments: () => void;
  onBrandsHidden: () => void;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const t = labels[lang];

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const actions = actionsRef.current;
    const brands = brandsRef.current;
    const video = videoRef.current;
    if (!track || !stage || !intro || !actions || !brands || !video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const detail = intro.querySelector<HTMLElement>('.hero-detail')!;
    const line = intro.querySelector<HTMLElement>('.hero-line')!;
    let frame = 0;
    let start = 0;
    let travel = 0;
    let opening = 0;
    let last = -1;
    const paint = () => {
      frame = 0;
      if (!travel) return;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / travel));
      if (progress === last) return;
      last = progress;
      const ease = progress * progress * (3 - 2 * progress);
      stage.style.setProperty('--film-progress', ease.toFixed(4));
      actions.inert = progress < 1;
      if (brands.inert !== actions.inert) {
        brands.inert = actions.inert;
        if (brands.inert) onBrandsHidden();
      }
      stage.style.setProperty('--film-edge', (opening * (1 - ease)).toFixed(2) + 'px');
      stage.style.setProperty('--film-side', ((1 - ease) * 5.6).toFixed(3) + '%');
      stage.style.setProperty('--caption', Math.max(0, Math.min(1, (progress - .53) / .32)).toFixed(3));
    };
    const schedule = () => { if (!frame && travel) frame = requestAnimationFrame(paint); };
    const measure = () => {
      const inset = parseFloat(getComputedStyle(track).scrollMarginTop);
      const introHeight = detail.offsetTop + Math.max(line.offsetHeight, actions.offsetHeight);
      const captionHeight = stage.querySelector<HTMLElement>('.hero-caption')!.offsetHeight;
      const brandsHeight = brands.offsetHeight;
      stage.style.setProperty('--brands-height', brandsHeight + 'px');
      const animate = !reduced.matches && innerHeight - inset >= 480 && introHeight + Math.max(180, brandsHeight + captionHeight + 96) < innerHeight - inset;
      track.toggleAttribute('data-reveal', animate);
      if (!animate) {
        travel = 0;
        actions.inert = false;
        brands.inert = false;
        return;
      }
      opening = detail.offsetTop + line.offsetHeight + Math.min(40, stage.clientHeight * .05);
      start = track.getBoundingClientRect().top + window.scrollY - inset;
      // The spacer's content drives the reveal. Its bottom padding keeps the completed scene pinned.
      travel = parseFloat(getComputedStyle(track, '::after').height);
      last = -1;
      paint();
    };
    const preferenceChanged = () => {
      if (reduced.matches) video.pause();
      measure();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(intro);
    observer.observe(stage);
    observer.observe(brands);
    measure();
    if (!reduced.matches) void video.play().catch(() => {});
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    reduced.addEventListener('change', preferenceChanged);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      reduced.removeEventListener('change', preferenceChanged);
    };
  }, [onBrandsHidden]);

  return (
    <div className="hero-track" ref={trackRef}>
      <div className="hero-stage" ref={stageRef}>
        <div className="hero-intro" ref={introRef}>
          <HeroHeading copy={copy} />
          <div className="hero-detail">
            <p className="hero-line">
              <span className="hero-route-stop"><ClipboardCheck aria-hidden="true" />{introLine[lang][0]}</span>{' '}
              <span className="hero-route-path" aria-hidden="true" />
              <span className="hero-route-stop"><Cross aria-hidden="true" />{introLine[lang][1]}</span>
            </p>
            <div className="hero-actions" ref={actionsRef}>
              <a href="#contacts" className="inso-action">{copy.heroPartnerBtn}<ArrowUpRight /></a>
              <Link href={`/portfolio?lang=${lang}`} className="hero-secondary">{copy.navCatalog}<ArrowUpRight /></Link>
              <button type="button" className="hero-docs" onClick={onDocuments}><FileText />{t.docs}</button>
            </div>
          </div>
        </div>
        <div className="hero-film">
          <video ref={videoRef} src="/assets/video/inso-background-v4.mp4" poster="/assets/video/inso-warehouse-poster.jpg"
            muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
          <a className="hero-forward" href="#credentials" aria-label={t.next}><ArrowDown aria-hidden="true" /></a>
          <p className="hero-caption">{copy.heroDescription}</p>
          <button type="button" className="hero-playback" data-playing={playing} aria-label={playing ? t.pause : t.play} title={playing ? t.pause : t.play}
            onClick={() => { const video = videoRef.current; if (video?.paused) void video.play().catch(() => {}); else video?.pause(); }}>
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
        </div>
        <div className="hero-ink-mask" aria-hidden="true"><div className="hero-intro"><HeroHeading copy={copy} overlay /></div></div>
        <div className="hero-brands" ref={brandsRef}>{children}</div>
      </div>
    </div>
  );
}
