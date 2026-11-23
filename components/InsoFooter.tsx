import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

const labels = {
  ru: { catalog: 'Каталог препаратов', logistics: 'Дистрибуция', careers: 'Карьера в INSO', company: 'Компания', history: 'История', values: 'Видение и ценности', brands: 'Направления холдинга', partners: 'Партнёрам', faq: 'Вопросы партнёров', docs: 'Лицензии и сертификаты', contacts: 'Контакты', office: 'Офис в Ташкенте', address: 'ул. Богишамол, 160', top: 'К началу' },
  uz: { catalog: 'Dori vositalari katalogi', logistics: 'Distribyutsiya', careers: 'INSO’da karyera', company: 'Kompaniya', history: 'Tarix', values: 'Maqsad va qadriyatlar', brands: 'Xolding yoʻnalishlari', partners: 'Hamkorlarga', faq: 'Hamkorlar savollari', docs: 'Litsenziya va sertifikatlar', contacts: 'Aloqa', office: 'Toshkentdagi ofis', address: 'Bogʻishamol koʻchasi, 160', top: 'Sahifa boshiga' },
  en: { catalog: 'Product catalogue', logistics: 'Distribution', careers: 'Careers at INSO', company: 'Company', history: 'Our history', values: 'Vision and values', brands: 'Business lines', partners: 'For partners', faq: 'Partner questions', docs: 'Licences and certificates', contacts: 'Contact us', office: 'Tashkent office', address: '160 Bogishamol Street', top: 'Back to top' },
};

export default function InsoFooter({ lang, onDocuments }: { lang: Language; onDocuments: () => void }) {
  const t = labels[lang];
  const features = [
    { title: t.catalog, href: `/portfolio?lang=${lang}`, photo: '/assets/photos/greenwell-vitamin-c.jpg', position: '50% 48%' },
    { title: t.logistics, href: '#credentials', photo: '/assets/photos/gdp-pallet-amgv.jpg', position: '50% 50%' },
    { title: t.careers, href: `/career?lang=${lang}`, photo: '/assets/photos/team-specialists-men.jpg', position: '50% 24%' },
  ];
  return (
    <footer id="footer" className="inso-footer">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-3 sm:grid-cols-3">
          {features.map(card => (
            <Link key={card.href} href={card.href} className="footer-feature vision-reveal group">
              <Image src={card.photo} alt="" fill sizes="(min-width: 1280px) 400px, (min-width: 640px) 32vw, 94vw" className="object-cover" style={{objectPosition:card.position}} />
              <span className="relative z-10 flex w-full items-end justify-between gap-3 px-4 py-3 text-base font-semibold lg:p-5 lg:text-xl">
                {card.title}<ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <a href="#top" aria-label={`INSO Group — ${t.top}`} className="group inline-flex w-fit items-center gap-2 self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b6e6d3]">
            <Image src="/assets/photos/inso-mark.webp" alt="" width={48} height={48}
              className="size-12 brightness-0 invert motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
            <span className="flex flex-col gap-0.5 font-['Instrument_Sans',sans-serif] leading-none">
              <span className="text-[28px] font-bold tracking-[0.02em] text-[#f3faf6]">INSO</span>
              <span className="text-[9px] font-semibold tracking-[0.18em] text-[#b6e6d3]">GROUP</span>
            </span>
          </a>
          <nav aria-label={t.company}><h2>{t.company}</h2><a href="#about">{t.history}</a><a href="#values">{t.values}</a><a href="#subbrands">{t.brands}</a></nav>
          <nav aria-label={t.partners}><h2>{t.partners}</h2><a href="#faq">{t.faq}</a><button type="button" onClick={onDocuments}>{t.docs}</button><a href="#contacts">{t.contacts}</a></nav>
          <div><h2>{t.office}</h2><a href="#map">{t.address}</a><a href="tel:+998935056552">+998 93 505 65 52</a><a href="mailto:sales@inso.uz">sales@inso.uz</a></div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-5 text-xs text-[#c7e0d9]">
          <span>© 2017–2026 INSO Group</span><a href="#top" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-2">{t.top}<ArrowUp aria-hidden className="size-3.5" /></a>
        </div>
      </div>
    </footer>
  );
}
