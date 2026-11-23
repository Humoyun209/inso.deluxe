import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { inquiryTopics, type InquiryTopic } from '@/lib/inquiries';
import type { Language } from '@/lib/insopharm-data';

const keys = Object.keys(inquiryTopics) as InquiryTopic[];

export default function InsoTopicSelect({ label, lang, value, onChange }: {
  label: string; lang: Language; value: InquiryTopic; onChange: (topic: InquiryTopic) => void;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);
  const prefix = useRef({ text: '', time: 0 });

  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  function choose(key: InquiryTopic) {
    onChange(key);
    setActive(key);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const current = open ? active : value;
    if (e.key === 'Escape' || e.key === 'Tab') {
      if (open && e.key === 'Escape') e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) choose(active);
      else { setActive(value); setOpen(true); }
      return;
    }
    let next: InquiryTopic | undefined;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      next = keys[(keys.indexOf(current) + (e.key === 'ArrowDown' ? 1 : -1) + keys.length) % keys.length];
    } else if (e.key === 'Home' || e.key === 'End') {
      next = keys[e.key === 'Home' ? 0 : keys.length - 1];
    } else if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const now = Date.now();
      const text = (now - prefix.current.time < 650 ? prefix.current.text : '') + e.key.toLocaleLowerCase();
      prefix.current = { text, time: now };
      next = keys.find(key => inquiryTopics[key][lang].toLocaleLowerCase().startsWith(text));
    }
    if (next) { e.preventDefault(); setActive(next); setOpen(true); }
  }

  return (
    <div ref={root} className="relative">
      <label id={id+'-label'} htmlFor={id}>{label}</label>
      <button id={id} type="button" role="combobox" aria-labelledby={id+'-label'} aria-haspopup="listbox"
        aria-controls={id+'-list'} aria-expanded={open} aria-activedescendant={open ? id+active : undefined}
        onBlur={() => setOpen(false)} onKeyDown={onKeyDown} onClick={() => { setActive(value); setOpen(!open); }}
        className="mt-1.5 flex w-full cursor-pointer items-center justify-between rounded-xl border border-[#accac2] bg-white px-3.5 py-3 text-left text-base font-normal text-[#204e4b] focus-visible:outline-teal-700">
        {inquiryTopics[value][lang]}<ChevronDown aria-hidden className={'size-4 transition-transform '+(open ? 'rotate-180' : '')} />
      </button>
      <ul hidden={!open} id={id+'-list'} role="listbox" aria-labelledby={id+'-label'}
        className="absolute inset-x-0 top-full z-20 mt-1 rounded-xl border border-[#c3d5cc] bg-white p-1.5 shadow-lg">
        {keys.map(key => (
          <li id={id+key} key={key} role="option" aria-selected={value === key} onPointerDown={e => e.preventDefault()}
            onPointerMove={() => setActive(key)} onClick={() => choose(key)}
            className={'flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm '+(active === key ? 'bg-[#e9f4ee]' : '')}>
            {inquiryTopics[key][lang]}{key === value && <Check aria-hidden className="size-4" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
