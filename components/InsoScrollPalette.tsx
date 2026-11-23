import { useEffect, useRef, type ReactNode } from 'react';

const tones: Record<string, string> = {
  credentials: '#c1e4da',
  about: '#f5e1ba',
  values: '#b4d5d3',
  subbrands: '#e1eac7',
  faq: '#c3dce8',
  contacts: '#d3e4d4',
};
const clamp = (value: number) => Math.min(1, Math.max(0, value));

function layoutTop(element: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

export default function InsoScrollPalette({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const surface = ref.current;
    if (!surface) return;
    const wash = surface.querySelector<HTMLElement>('.inso-scroll-wash')!;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sections = Array.from(surface.querySelectorAll<HTMLElement>(':scope > section'));
    const elements = Array.from(surface.querySelectorAll<HTMLElement>('.vision-reveal, .inso-photo-window'));
    let chapters: { top: number; tone: string }[] = [];
    let frames: { element: HTMLElement; top: number; height: number; stagger: number; photo: boolean }[] = [];
    let ticket = 0;

    const paint = () => {
      ticket = 0;
      if (preference.matches) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const center = y + vh * 0.48;
      let index = 0;
      while (index + 1 < chapters.length && chapters[index + 1].top <= center) index++;
      const a = chapters[index];
      const b = chapters[index + 1] ?? a;
      const p = clamp((center - a.top) / Math.max(1, b.top - a.top));
      const blend = p * p * (3 - 2 * p);
      wash.style.setProperty('--from', a.tone);
      wash.style.setProperty('--to', b.tone);
      wash.style.setProperty('--blend', (blend * 100).toFixed(2) + '%');
      const phase = (index + blend) * Math.PI;
      wash.style.setProperty('--light-x', (32 * Math.cos(phase)).toFixed(2) + 'vw');
      wash.style.setProperty('--light-y', (12 * Math.sin(phase)).toFixed(2) + 'vh');
      for (const frame of frames) {
        const top = frame.top - y;
        const entry = clamp((vh * (0.99 - frame.stagger) - top) / (vh * 0.38));
        const value = (1 - (1 - entry) ** 2).toFixed(4);
        if (frame.element.style.getPropertyValue('--entry') !== value) frame.element.style.setProperty('--entry', value);
        if (frame.photo) frame.element.style.setProperty('--pass', clamp((vh - top) / (vh + frame.height)).toFixed(4));
      }
    };
    const schedule = () => {
      if (!ticket) ticket = window.requestAnimationFrame(paint);
    };
    const measure = () => {
      chapters = [
        { top: layoutTop(surface) - window.innerHeight * 0.65, tone: '#edf4f3' },
        ...sections.map(section => ({ top: layoutTop(section), tone: tones[section.id] ?? '#d8e7dc' })),
      ];
      let lastTop = -Infinity;
      let column = 0;
      frames = elements.map(element => {
        const top = layoutTop(element);
        column = Math.abs(top - lastTop) < 4 ? column + 1 : 0;
        lastTop = top;
        return { element, top, height: element.offsetHeight, stagger: Math.min(column, 4) * 0.042, photo: element.classList.contains('inso-photo-window') };
      });
      schedule();
    };
    const observer = new ResizeObserver(measure);
    [surface, ...sections, ...elements].forEach(el => observer.observe(el));
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    preference.addEventListener('change', schedule);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(ticket);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      preference.removeEventListener('change', schedule);
    };
  }, []);
  return (
    <div ref={ref} className="inso-scroll-surface">
      <div aria-hidden="true" className="inso-scroll-wash"><div className="inso-scroll-light" /></div>
      {children}
    </div>
  );
}
