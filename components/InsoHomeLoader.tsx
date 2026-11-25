'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/lib/insopharm-data';
import { getDictionary } from '@/locales';

const loading = { ru: 'Загрузка', en: 'Loading', uz: 'Yuklanmoqda', zh: '加载中' };

export default function InsoHomeLoader({ lang }: { lang: Language }) {
  const overlay = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'done'>('loading');

  useEffect(() => {
    const page = document.getElementById('inso-home');
    const video = page?.querySelector<HTMLVideoElement>('.hero-film video');
    if (!page || !video || !overlay.current || getComputedStyle(overlay.current).visibility === 'hidden') {
      setPhase('done');
      return;
    }

    page.inert = true;
    let active = true;
    let exitTimer = 0;
    let posterReady = false;
    let allowPoster = window.matchMedia('(prefers-reduced-motion: reduce)').matches || !!video.error;
    let fontsReady = false;
    const finish = () => {
      if (!active) return;
      active = false;
      page.inert = false;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setPhase('done');
      } else {
        setPhase('leaving');
        exitTimer = window.setTimeout(() => setPhase('done'), 360);
      }
    };
    const check = () => {
      if (fontsReady && (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA || (allowPoster && posterReady))) finish();
    };
    const usePoster = () => { allowPoster = true; check(); };
    const poster = new window.Image();
    poster.src = video.poster;
    void poster.decode().then(() => { posterReady = true; check(); }).catch(() => {});
    void document.fonts.ready.then(() => { fontsReady = true; check(); });
    video.addEventListener('loadeddata', check);
    video.addEventListener('error', usePoster);
    const posterTimer = window.setTimeout(usePoster, 850);
    const deadline = window.setTimeout(finish, 3200);
    return () => {
      active = false;
      page.inert = false;
      window.clearTimeout(posterTimer);
      window.clearTimeout(deadline);
      window.clearTimeout(exitTimer);
      video.removeEventListener('loadeddata', check);
      video.removeEventListener('error', usePoster);
    };
  }, []);

  if (phase === 'done') return null;
  return (
    <div ref={overlay} className="inso-loader" data-phase={phase} role="status">
      <div className="inso-loader-lockup" aria-hidden="true">
        <Image
          src="/logos/INSO-Group_A_GROUP_horizontal_black.png"
          alt="INSO Group"
          width={180}
          height={64}
          priority
          className="h-14 sm:h-16 w-auto object-contain"
        />
      </div>
      <div className="inso-loader-rail" aria-hidden="true" />
      <span className="inso-loader-label">{getDictionary(lang).common.loader.loading}</span>
    </div>
  );
}
