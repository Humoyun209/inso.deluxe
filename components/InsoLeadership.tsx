import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';
import type { Language } from '@/lib/insopharm-data';

type Label = string | Record<Language, string>;
type Portrait = { file: string; name: Label; role: Label; historical?: boolean };

const portraits: Portrait[] = [
  { file: 'ceo', name: "Rustam O'tkirovich", role: 'CEO' },
  { file: 'cto', name: 'Humoyun Ahmedov', role: 'CTO' },
  { file: 'cdo', name: 'Ibrokhim Halil', role: 'CDO' },
  { file: 'cho', name: 'Madina Mirsodiqova', role: 'CHO' },
  {
    file: 'cherchill', historical: true,
    name: { ru: 'Уинстон Черчилль', uz: 'Uinston Cherchill', en: 'Winston Churchill' },
    role: { ru: 'Премьер-министр Великобритании', uz: 'Buyuk Britaniya bosh vaziri', en: 'Prime Minister of the United Kingdom' },
  },
  {
    file: 'stalin', historical: true,
    name: { ru: 'Иосиф Сталин', uz: 'Iosif Stalin', en: 'Joseph Stalin' },
    role: { ru: 'Председатель Совета Министров СССР', uz: 'SSSR Vazirlar Kengashi raisi', en: 'Chairman of the Council of Ministers of the USSR' },
  },
];
const copy = {
  ru: { title: 'Руководство INSO Group', history: 'Историческая фигура', previous: 'Предыдущий портрет', next: 'Следующий портрет' },
  uz: { title: 'INSO Group rahbariyati', history: 'Tarixiy shaxs', previous: 'Oldingi portret', next: 'Keyingi portret' },
  en: { title: 'INSO Group leadership', history: 'Historical figure', previous: 'Previous portrait', next: 'Next portrait' },
};
const localize = (label: Label, lang: Language) => typeof label === 'string' ? label : label[lang];

export default function InsoLeadership({ lang }: { lang: Language }) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const t = copy[lang];
  const selected = portraits[index];
  const [first, last] = localize(selected.name, lang).split(' ');
  const step = (direction: number) => setIndex(current => (current + portraits.length + direction) % portraits.length);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <section id="leadership" aria-label={t.title} className="scroll-mt-18 text-[#183f48]" onKeyDown={onKeyDown}>
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="leadership-layout">
          <div className="leadership-photo" aria-hidden="true"
            onTouchStart={({ touches }) => { touch.current = { x: touches[0].clientX, y: touches[0].clientY }; }}
            onTouchCancel={() => { touch.current = null; }}
            onTouchEnd={({ changedTouches }) => {
              if (!touch.current) return;
              const dx = changedTouches[0].clientX - touch.current.x;
              const dy = changedTouches[0].clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
            }}>
            {portraits.map((person, i) => (
              <Image key={person.file} src={`/assets/directors/${person.file}.webp`} alt="" fill
                data-current={index === i} sizes="(min-width: 1280px) 450px, (min-width: 768px) 40vw, 95vw" />
            ))}
          </div>
          <div className="min-w-0">
            <div aria-live="polite" aria-atomic="true">
              <p className="leadership-label">{selected.historical ? t.history : t.title}</p>
              <h2 className="leadership-name">{first}{' '}<em>{last}</em></h2>
              <p className="leadership-role">{localize(selected.role, lang)}</p>
            </div>
            <div className="leadership-controls">
              <span className="font-mono text-sm" aria-hidden="true">{String(index + 1).padStart(2, '0')} / 06</span>
              <button type="button" className="leadership-arrow" aria-label={t.previous} onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></button>
              <button type="button" className="leadership-arrow" aria-label={t.next} onClick={() => step(1)}><ArrowRight aria-hidden="true" /></button>
            </div>
            <div className="leadership-thumbs">
              {portraits.map((person, i) => (
                <button type="button" key={person.file} aria-pressed={index === i} aria-label={localize(person.name, lang)}
                  onClick={() => setIndex(i)}>
                  <Image src={`/assets/directors/${person.file}.webp`} alt="" fill sizes="75px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
