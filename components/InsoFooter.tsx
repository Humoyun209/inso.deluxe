import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

const labels = {
  ru: {
    ctaLead: 'Готовы обсудить',
    ctaLeadAccent: 'сотрудничество?',
    ctaButton: 'Связаться с нами',
    descriptor: 'Фармацевтический холдинг полного цикла в Узбекистане',
    license: 'Лицензия Минздрава РУз № 18563 · GDP',
    company: 'Компания',
    history: 'История',
    values: 'Видение и ценности',
    brands: 'Направления холдинга',
    careers: 'Карьера в INSO',
    partners: 'Партнёрам',
    catalog: 'Каталог препаратов',
    logistics: 'Дистрибуция',
    docs: 'Лицензии и сертификаты',
    faq: 'Вопросы партнёров',
    office: 'Офис в Ташкенте',
    address: 'ул. Богишамол, 160',
    telegram: 'Telegram',
    linkedin: 'LinkedIn',
    copyright: '© 2017–2026 INSO Group',
    privacy: 'Политика конфиденциальности',
    top: 'К началу',
  },
  uz: {
    ctaLead: 'Hamkorlikni muhokama qilishga',
    ctaLeadAccent: 'tayyormisiz?',
    ctaButton: 'Bogʻlanish',
    descriptor: 'Oʻzbekistonda toʻliq siklli farmatsevtika xoldingi',
    license: 'OʻzR SSV litsenziyasi № 18563 · GDP',
    company: 'Kompaniya',
    history: 'Tarix',
    values: 'Maqsad va qadriyatlar',
    brands: 'Xolding yoʻnalishlari',
    careers: 'INSO’da karyera',
    partners: 'Hamkorlarga',
    catalog: 'Dori vositalari katalogi',
    logistics: 'Distribyutsiya',
    docs: 'Litsenziya va sertifikatlar',
    faq: 'Hamkorlar savollari',
    office: 'Toshkentdagi ofis',
    address: 'Bogʻishamol koʻchasi, 160',
    telegram: 'Telegram',
    linkedin: 'LinkedIn',
    copyright: '© 2017–2026 INSO Group',
    privacy: 'Maxfiylik siyosati',
    top: 'Sahifa boshiga',
  },
  en: {
    ctaLead: 'Ready to discuss',
    ctaLeadAccent: 'a partnership?',
    ctaButton: 'Contact Us',
    descriptor: 'Full-cycle pharmaceutical holding in Uzbekistan',
    license: 'MoH Uzbekistan Licence № 18563 · GDP',
    company: 'Company',
    history: 'Our history',
    values: 'Vision and values',
    brands: 'Business lines',
    careers: 'Careers at INSO',
    partners: 'For partners',
    catalog: 'Product catalogue',
    logistics: 'Distribution',
    docs: 'Licences and certificates',
    faq: 'Partner questions',
    office: 'Tashkent Office',
    address: '160 Bogishamol Street',
    telegram: 'Telegram',
    linkedin: 'LinkedIn',
    copyright: '© 2017–2026 INSO Group',
    privacy: 'Privacy Policy',
    top: 'Back to top',
  },
};

export default function InsoFooter({
  lang,
  onDocuments,
}: {
  lang: Language;
  onDocuments: () => void;
}) {
  const t = labels[lang];

  return (
    <footer id="footer" className="inso-footer relative overflow-hidden isolate">
      {/* Subtle brand emblem watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-28 -right-24 sm:-bottom-36 sm:-right-20 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] lg:w-[720px] lg:h-[720px] opacity-[0.04] mix-blend-screen -z-10"
      >
        <Image
          src="/photos/bg-element.svg"
          alt=""
          width={720}
          height={720}
          className="w-full h-full object-contain"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* =================================================================
            1. ВЕРХНЯЯ ЧАСТЬ: МИНИМАЛИСТИЧНАЯ СТРОКА CTA
           ================================================================= */}
        <div className="border-b border-white/10 pb-10 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-white leading-tight">
            {t.ctaLead}{' '}
            <em className="font-serif italic font-normal text-[#9ce2ce]">
              {t.ctaLeadAccent}
            </em>
          </h2>
          <a
            href="#contacts"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#16494a] px-6 py-3 text-sm font-semibold hover:bg-[#eef7f4] transition-all shadow-sm shrink-0 w-fit group"
          >
            <span>{t.ctaButton}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* =================================================================
            2. ОСНОВНАЯ СЕТКА: 4 КОЛОНКИ
           ================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Колонка 1 (Логотип и статус) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4 pr-0 lg:pr-6">
            <div className="space-y-4">
              <a
                href="#top"
                aria-label={`INSO Group — ${t.top}`}
                className="group inline-flex w-fit items-center self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b6e6d3]"
              >
                <Image
                  src="/logos/INSO-Group_A_GROUP_horizontal_white.png"
                  alt="INSO Group"
                  width={150}
                  height={52}
                  className="h-10 sm:h-11 w-auto object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                />
              </a>
              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                {t.descriptor}
              </p>
            </div>
            <p className="text-xs text-white/40 tracking-wide pt-2">
              {t.license}
            </p>
          </div>

          {/* Колонка 2 («Компания») */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">
              {t.company}
            </h3>
            <nav aria-label={t.company} className="flex flex-col space-y-2.5 text-sm">
              <a
                href="#about"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.history}
              </a>
              <a
                href="#values"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.values}
              </a>
              <a
                href="#subbrands"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.brands}
              </a>
              <Link
                href={`/career?lang=${lang}`}
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.careers}
              </Link>
            </nav>
          </div>

          {/* Колонка 3 («Партнёрам») */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">
              {t.partners}
            </h3>
            <nav aria-label={t.partners} className="flex flex-col space-y-2.5 text-sm">
              <Link
                href={`/portfolio?lang=${lang}`}
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.catalog}
              </Link>
              <a
                href="#credentials"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.logistics}
              </a>
              <button
                type="button"
                onClick={onDocuments}
                className="text-left text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {t.docs}
              </button>
              <a
                href="#faq"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t.faq}
              </a>
            </nav>
          </div>

          {/* Колонка 4 («Офис в Ташкенте») */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">
              {t.office}
            </h3>
            <div className="flex flex-col space-y-2.5 text-sm text-white/80">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=160+Bogishamol+Street%2C+Yunusabad%2C+Tashkent%2C+Uzbekistan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                {t.address}
              </a>
              <a
                href="tel:+998935056552"
                className="hover:text-white transition-colors font-medium"
              >
                +998 93 505 65 52
              </a>
              <a
                href="mailto:sales@inso.uz"
                className="hover:text-white transition-colors"
              >
                sales@inso.uz
              </a>
            </div>
            {/* Социальные / деловые каналы */}
            <div className="flex items-center gap-4 pt-3 text-xs text-white/60">
              <a
                href="https://t.me/inso_uz"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                {t.telegram}
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://linkedin.com/company/inso-group"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                {t.linkedin}
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================
            3. НИЖНЯЯ СТРОКА
           ================================================================= */}
        <div className="border-t border-white/10 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{t.copyright}</span>
            <a href="#contacts" className="hover:text-white transition-colors">
              {t.privacy}
            </a>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-white/80 hover:text-white hover:border-white/40 transition-colors"
          >
            <span>{t.top}</span>
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
