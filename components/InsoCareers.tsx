'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Briefcase, Users } from 'lucide-react';
import { CORE_VALUES, type Language } from '@/lib/insopharm-data';

const hrCultureValues = CORE_VALUES.slice(2);

export default function InsoCareers({ lang }: { lang: Language }) {
  const handleApplyCareerTrack = (title: string) => {
    window.location.href = 'mailto:hr@inso.uz?subject=' + encodeURIComponent(title);
  };

  return (
    <>
      <header className="inso-masthead flex items-center justify-between gap-5 px-4 py-5 sm:px-8">
        <Link href={`/?lang=${lang}`} className="font-semibold text-teal-900">← INSO Group</Link>
        <nav aria-label={{ ru: 'Язык', uz: 'Til', en: 'Language' }[lang]} className="flex gap-4 text-sm">
          {(['ru', 'uz', 'en'] as const).map(code => <Link href={`/career?lang=${code}`} key={code} aria-current={code === lang ? 'page' : undefined} className={code === lang ? 'font-bold text-teal-800 underline' : ''}>{code.toUpperCase()}</Link>)}
        </nav>
      </header>
      <main
        id="career"
        className="relative py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80 overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D9488] uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ru'
                    ? 'Карьера в INSO Group · HR-бренд холдинга'
                    : lang === 'uz'
                    ? 'INSO Group karyera · Xolding HR-brendi'
                    : 'Career at INSO Group · Employer Brand'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance leading-[1.15]">
                {lang === 'ru'
                  ? 'Строим лучшее место работы в фармацевтической отрасли Центральной Азии'
                  : lang === 'uz'
                  ? 'Markaziy Osiyo farmatsevtika sohasidagi eng yaxshi ish joyini barpo etmoqdamiz'
                  : 'Building the Best Workplace in Central Asia’s Pharmaceutical Industry'}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ru'
                  ? 'С 2017 года команда INSO Group растёт вместе с масштабом бизнеса. Наша цель к 2029 году — стать лучшим работодателем отрасли, где сильные специалисты растут по результатам, опираются на факты и видят реальный вклад своей работы в здоровье пациентов.'
                  : lang === 'uz'
                  ? '2017-yildan buyon INSO Group jamoasi biznes miqyosi bilan birga kengayib bormoqda. 2029-yilgacha boʻlgan maqsadimiz — kuchli mutaxassislar natijaga koʻra oʻsadigan, dalillarga tayanadigan va bemorlar salomatligiga real hissa qoʻshadigan sohadagi eng yaxshi ish beruvchiga aylanishdir.'
                  : 'Since 2017, the INSO Group team has grown alongside our regional footprint. Our 2029 goal is to be the industry’s best employer — where professionals advance on merit, rely on facts, and make a tangible impact on patient health.'}
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <div className="w-full sm:w-auto p-6 rounded-2xl bg-white border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0B3B60] uppercase tracking-wider">
                  <Users className="w-4 h-4 text-[#0D9488]" />
                  <span>
                    {lang === 'ru'
                      ? 'Присоединяйтесь к команде'
                      : lang === 'uz'
                      ? 'Jamoamizga qoʻshiling'
                      : 'Join Our Growing Team'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'ru'
                    ? 'Открыты вакансии в головном офисе в Ташкенте, в 13 региональных представительствах и новых зарубежных офисах.'
                    : lang === 'uz'
                    ? 'Toshkentdagi bosh ofisda, 13 ta hududiy vakolatxonada va yangi xorijiy ofislarda boʻsh ish oʻrinlari ochiq.'
                    : 'Open positions at our Tashkent HQ, across 13 regional offices, and in our new international representative offices.'}
                </p>
                <button
                  type="button"
                  onClick={() => handleApplyCareerTrack({ ru: 'Резюме', uz: 'Rezyume', en: 'CV' }[lang])}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082B47] text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  <span>
                    {lang === 'ru'
                      ? 'Отправить резюме в HR-департамент'
                      : lang === 'uz'
                      ? 'HR boʻlimiga rezyume yuborish'
                      : 'Submit CV to HR Department'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Synthon-Style Editorial People & Culture Diptych (Real INSO Group Warehouse & Quality Specialists) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-6 min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900"
            >
              <Image
                src="/assets/photos/team-specialists-men.jpg"
                alt={
                  lang === 'ru'
                    ? 'Специалисты складской GDP-логистики INSO Group в Ташкенте'
                    : lang === 'uz'
                    ? 'Toshkentdagi INSO Group GDP-ombor logistikasi mutaxassislari'
                    : 'INSO Group GDP warehouse logistics specialists in Tashkent'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/90 via-[#04101E]/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04101E]/75 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-teal-300">
                  <span>06 · ЦЕНИМ ЛЮДЕЙ · TASHKENT GDP HUB</span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Команда операционной и GDP-логистики'
                    : lang === 'uz'
                    ? 'Operatsion va GDP-logistika jamoasi'
                    : 'Operations & GDP Logistics Team'}
                </div>
                <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {lang === 'ru'
                    ? 'Сотрудник для нас — партнёр, а не ресурс: точность, ответственность и взаимное уважение в каждой смене'
                    : lang === 'uz'
                    ? 'Xodim biz uchun resurs emas, hamkor: har bir ish smenasida aniqlik, masʼuliyat va oʻzaro hurmat'
                    : 'Colleagues Are Partners, Not Resources: Precision, Ownership, and Mutual Respect on Every Shift'}
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-6 min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900"
            >
              <Image
                src="/assets/photos/team-specialists-women.jpg"
                alt={
                  lang === 'ru'
                    ? 'Специалисты контроля качества и комплектации фармацевтического склада INSO Group'
                    : lang === 'uz'
                    ? 'INSO Group farmatsevtika ombori sifat nazorati va komplektatsiya mutaxassislari'
                    : 'INSO Group pharmaceutical quality control and order fulfillment specialists'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/90 via-[#04101E]/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04101E]/75 backdrop-blur-md border border-white/15 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-white/90">
                  <span>01 · БЕРЕЖЁМ ДОВЕРИЕ · QA & GDP</span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">
                  {lang === 'ru'
                    ? 'Контроль качества и фармацевтический порядок'
                    : lang === 'uz'
                    ? 'Sifat nazorati va farmatsevtik tartib'
                    : 'Quality Assurance & Order Fulfillment'}
                </div>
                <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {lang === 'ru'
                    ? 'За каждой упаковкой стоит пациент: строгие стандарты комплектации и хранения'
                    : lang === 'uz'
                    ? 'Har bir qadoq ortida bemor turadi: saqlash va yetkazib berishning qatʼiy standartlari'
                    : 'Behind Every Package Is a Patient: Rigorous Standards in Pharmaceutical Handling'}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* 4 HR Culture Pillars from Teksty dlya sayta Page 7 ("Опираемся на факты", "Доводим до конца", "Видим дальше", "Ценим людей") */}
          <div className="space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
              {lang === 'ru'
                ? 'КУЛЬТУРА РАБОТЫ В INSO GROUP · 4 ПРИНЦИПА КОМАНДЫ С ПРИМЕРАМИ ИЗ ПРАВИЛ ПОВЕДЕНИЯ'
                : lang === 'uz'
                ? 'INSO GROUP MEHNAT MADANIYATI · JAMOANING 4 TA AMALIY PRINSIPI'
                : 'WORKING CULTURE AT INSO GROUP · 4 TEAM PRINCIPLES IN ACTION'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
              {hrCultureValues.map((val) => (
                <div
                  key={val.id}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#0B3B60]/40 p-5 flex flex-col justify-between transition-all shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#0B3B60] text-white font-[family-name:var(--font-mono)] text-xs font-bold">
                        {val.number}
                      </span>
                      <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-wider text-right">
                        {val.keywords[lang]}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-base sm:text-lg font-extrabold text-slate-900">
                      {val.title[lang]}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {val.description[lang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70 space-y-1.5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3B60]">
                      {lang === 'ru'
                        ? 'Как это работает у нас:'
                        : lang === 'uz'
                        ? 'Bizda bu qanday ishlaydi:'
                        : 'How we practice this:'}
                    </div>
                    {val.weDo[lang].slice(0, 2).map((rule, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Career Directions Across the Holding */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-5 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {lang === 'ru'
                    ? 'Открытые карьерные направления в субрендах холдинга'
                    : lang === 'uz'
                    ? 'Xolding sub-brendlarida ochiq karyera yoʻnalishlari'
                    : 'Open Career Tracks Across Holding Sub-Brands'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {lang === 'ru'
                    ? 'Выберите профильное направление, чтобы отправить отклик напрямую в HR-департамент'
                    : lang === 'uz'
                    ? 'HR boʻlimiga toʻgʻridan-toʻgʻri murojaat yuborish uchun yoʻnalishni tanlang'
                    : 'Select a track below to submit your application directly to our HR team'}
                </p>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#0D9488]">
                hr@inso.uz · info@inso.uz
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                {
                  title:
                    lang === 'ru'
                      ? 'Медицинская промоция и КАМ'
                      : lang === 'uz'
                      ? 'Tibbiy targʻibot va KAM'
                      : 'Medical Promotion & KAM',
                  subbrand: 'INOM · Health Biotech · LPS',
                  location:
                    lang === 'ru'
                      ? 'Ташкент и 13 регионов'
                      : lang === 'uz'
                      ? 'Toshkent va 13 viloyat'
                      : 'Tashkent & 13 Regions',
                },
                {
                  title:
                    lang === 'ru'
                      ? 'GDP-логистика и цепочки поставок'
                      : lang === 'uz'
                      ? 'GDP-logistika va taʼminot zanjiri'
                      : 'GDP Logistics & Cold Chain',
                  subbrand: 'NovaLine · GreenWell',
                  location:
                    lang === 'ru'
                      ? 'Ташкент (GDP-комплекс)'
                      : lang === 'uz'
                      ? 'Toshkent (GDP-majmua)'
                      : 'Tashkent (GDP Hub)',
                },
                {
                  title:
                    lang === 'ru'
                      ? 'Регуляторика и регистрация (CTD)'
                      : lang === 'uz'
                      ? 'Regulyatorika va roʻyxatdan oʻtkazish'
                      : 'Regulatory Affairs & CTD',
                  subbrand: 'INSO Service',
                  location:
                    lang === 'ru'
                      ? 'Головной офис · Ташкент'
                      : lang === 'uz'
                      ? 'Bosh ofis · Toshkent'
                      : 'Headquarters · Tashkent',
                },
                {
                  title:
                    lang === 'ru'
                      ? 'Международное развитие и ВЭД'
                      : lang === 'uz'
                      ? 'Xalqaro rivojlanish va TIF'
                      : 'International Business & Sourcing',
                  subbrand: 'INSO Group International',
                  location:
                    lang === 'ru'
                      ? 'Узбекистан и страны ЦА'
                      : lang === 'uz'
                      ? 'Oʻzbekiston va MO davlatlari'
                      : 'Uzbekistan & Central Asia',
                },
              ].map((track) => (
                <button
                  key={track.title}
                  type="button"
                  onClick={() => handleApplyCareerTrack(track.title)}
                  className="group text-left p-4 rounded-2xl bg-white hover:bg-[#0B3B60] border border-slate-200/90 hover:border-[#0B3B60] transition-all flex flex-col justify-between gap-3 cursor-pointer shadow-2xs"
                >
                  <div>
                    <div className="text-[11px] font-bold text-[#0D9488] group-hover:text-teal-300 font-[family-name:var(--font-mono)]">
                      {track.subbrand}
                    </div>
                    <div className="mt-1 text-sm font-extrabold text-slate-900 group-hover:text-white leading-snug">
                      {track.title}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 group-hover:border-white/15 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-200">
                    <span>{track.location}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0D9488] group-hover:text-teal-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
