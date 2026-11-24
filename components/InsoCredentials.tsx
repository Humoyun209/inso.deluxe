'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

const content = {
  ru: {
    badge: '02 · ИНФРАСТРУКТУРА И ЛОГИСТИКА',
    subtitle:
      'Собственный фармацевтический складской комплекс класса «А», валидированная холодовая цепь и 13 региональных филиалов для экспресс-снабжения клиник и аптек.',
    photoCaption: 'Центральный складской комплекс в Ташкенте, класс «А»',
    photoLink: 'Параметры комплекса',
    metric1Val: '+2…+8 °C',
    metric1Label: 'Валидированная холодовая цепь',
    metric2Val: '10 000 м²',
    metric2Label: 'Собственный склад класса «А»',
    metric3Val: '100% WMS',
    metric3Label: 'Цифровой партионный учёт и маркировка Asl Belgisi',
    licenseTitle: 'Официальная оптовая реализация по стандарту GDP',
    licenseDesc:
      'Прямые контракты с производителями. Полное соответствие международным стандартам Good Distribution Practice и реестр Министерства здравоохранения Республики Узбекистан (Лицензия № 18563).',
    pdfAction: 'Сертификат GDP (PDF)',
    licenseAction: 'Запросить лицензионный пакет',
    deliveryTitle: 'Доставка по всему Узбекистану',
    deliveryDesc:
      '13 региональных филиалов и распределительных центров обеспечивают регулярное снабжение клиник и аптечных сетей с регламентом отгрузки от 12 до 24 часов.',
    deliveryCities:
      'Ташкент, Самарканд, Фергана, Бухара, Андижан, Наманган и все регионы Республики Узбекистан.',
    deliveryAction: 'Условия региональных поставок',
  },
  uz: {
    badge: '02 · INFRATUZILMA VA LOGISTIKA',
    subtitle:
      '«A» toifali shaxsiy farmatsevtika ombor majmuasi, uzluksiz sovuqlik zanjiri va klinika hamda dorixonalarni tezkor taʼminlash uchun 13 ta hududiy filial.',
    photoCaption: 'Toshkentdagi markaziy logistika majmuasi, «A» toifasi',
    photoLink: 'Majmua parametrlari',
    metric1Val: '+2…+8 °C',
    metric1Label: 'Validatsiyalangan sovuqlik zanjiri',
    metric2Val: '10 000 m²',
    metric2Label: '«A» toifali shaxsiy ombor majmuasi',
    metric3Val: '100% WMS',
    metric3Label: 'Raqamli partiya nazorati va «Asl Belgisi» markirovkasi',
    licenseTitle: 'GDP standarti boʻyicha rasmiy ulgurji distribyutsiya',
    licenseDesc:
      'Ishlab chiqaruvchilar bilan toʻgʻridan-toʻgʻri shartnomalar, xalqaro GDP qoidalariga toʻliq muvofiqlik va Oʻzbekiston Respublikasi Sogʻliqni saqlash vazirligi reyestri (Litsenziya № 18563).',
    pdfAction: 'GDP sertifikati (PDF)',
    licenseAction: 'Litsenziya toʻplamini soʻrash',
    deliveryTitle: 'Butun Oʻzbekiston boʻylab yetkazib berish',
    deliveryDesc:
      '13 ta hududiy filial va taqsimlash markazlari klinika hamda dorixonalarni 12–24 soat ichida dori vositalari bilan uzluksiz taʼminlaydi.',
    deliveryCities:
      'Toshkent, Samarqand, Fargʻona, Buxoro, Andijon, Namangan va barcha viloyatlar.',
    deliveryAction: 'Yetkazib berish shartlari',
  },
  en: {
    badge: '02 · INFRASTRUCTURE & LOGISTICS',
    subtitle:
      'Proprietary Class-A pharmaceutical logistics complex, validated cold chain continuity, and 13 regional hubs for express supply to clinics and pharmacies.',
    photoCaption: 'Central Logistics Complex in Tashkent, Class A Facility',
    photoLink: 'Facility specifications',
    metric1Val: '+2…+8 °C',
    metric1Label: 'Validated continuous cold chain',
    metric2Val: '10,000 m²',
    metric2Label: 'Proprietary Class-A logistics complex',
    metric3Val: '100% WMS',
    metric3Label: 'Digital batch tracking & «Asl Belgisi» serialization',
    licenseTitle: 'Licensed Wholesale Distribution under GDP Standards',
    licenseDesc:
      'Direct manufacturer supply agreements. Full compliance with international Good Distribution Practice standards and Ministry of Health of Uzbekistan regulatory register (Licence № 18563).',
    pdfAction: 'GDP Certificate (PDF)',
    licenseAction: 'Request licence package',
    deliveryTitle: 'Nationwide Delivery Coverage',
    deliveryDesc:
      '13 regional branches and fulfillment centers supply hospitals, clinics, and pharmacy networks with 12 to 24 hour dispatch protocols.',
    deliveryCities:
      'Tashkent, Samarkand, Fergana, Bukhara, Andijan, Namangan, and all provinces.',
    deliveryAction: 'Regional supply terms',
  },
  zh: {
    badge: '02 · 基础设施与仓储物流',
    subtitle:
      '拥有符合国际标准的自有甲级（Class A）医药仓储物流综合体、全程验证冷链体系，以及覆盖乌兹别克斯坦全境的13个区域配送枢纽。',
    photoCaption: '位于塔什干的中央甲级医药仓储物流综合体',
    photoLink: '园区详细参数',
    metric1Val: '+2…+8 °C',
    metric1Label: '全程验证不间断冷链',
    metric2Val: '10 000 m²',
    metric2Label: '自建甲级现代化医药仓储',
    metric3Val: '100% WMS',
    metric3Label: '数字化批次追溯与Asl Belgisi赋码追溯',
    licenseTitle: '符合WHO GDP标准的正规医药批发分销',
    licenseDesc:
      '与全球制药商直接签订分销协议。严格执行国际《药品优良分销规范》（GDP），获乌兹别克斯坦卫生部正式许可认证（执照编号 № 18563）。',
    pdfAction: 'GDP资质认证 (PDF)',
    licenseAction: '申请完整资质文件包',
    deliveryTitle: '覆盖乌兹别克斯坦全境的配送网络',
    deliveryDesc:
      '13个区域分公司与现代仓储中心，实现12至24小时内向各级医院、诊所及连锁药房直供配送。',
    deliveryCities:
      '塔什干、撒马尔罕、费尔干纳、布哈拉、安集延、纳曼干及乌兹别克斯坦全部行政区。',
    deliveryAction: '区域供货合作细则',
  },
};

export default function InsoCredentials({ lang }: { lang: Language }) {
  const t = content[lang];

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="scroll-mt-20 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 text-slate-900"
    >
      <div className="mx-auto max-w-[1360px] w-full px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* =================================================================
            1. SECTION HEADER (Editorial serif-italic alignment matching Hero)
           ================================================================= */}
        <div className="max-w-3xl space-y-3">
          <div className="hero-eyebrow text-xs font-semibold text-[var(--inso-badge-color)] uppercase tracking-[0.16em]">
            <span>{t.badge}</span>
          </div>
          <h2
            id="credentials-title"
            className="text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight leading-[1.12] text-balance"
          >
            <em className="font-serif italic font-normal text-[var(--inso-accent-italic)]">
              {lang === 'ru' ? (
                'Как устроена дистрибуция INSO Group'
              ) : lang === 'uz' ? (
                'INSO Group distribyutsiyasi qanday ishlaydi'
              ) : lang === 'zh' ? (
                'INSO集团的医药分销体系运作模式'
              ) : (
                'How Distribution Works at INSO Group'
              )}
            </em>
          </h2>
          <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* =================================================================
            2. SWISS EDITORIAL MODULAR GRID (Pristine photo + clean narrative)
           ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Clean, Unobstructed Warehouse Photo (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
              <Image
                src="/assets/pharma/sklad2.webp"
                alt={t.photoCaption}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            {/* Clean Caption and Calm Link below Photo */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
              <span>{t.photoCaption}</span>
              <a
                href="#about"
                className="inline-flex items-center gap-1 font-semibold text-[var(--inso-teal)] hover:underline transition-colors"
              >
                <span>{t.photoLink}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 2 Clean Text Blocks on Light Background (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
            {/* Block 1: Licensing & WHO GDP Standard */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {t.licenseTitle}
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                {t.licenseDesc}
              </p>
              {/* Actions: One Solid Button + One Calm Text Link */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/license/inso_gdp.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inso-action inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-xs"
                >
                  <span>{t.pdfAction}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="mailto:registration@inso.uz?subject=Licence%20Package%20Request"
                  className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-800 transition-colors"
                >
                  {t.licenseAction}
                </a>
              </div>
            </div>

            {/* Subtle Hairline Divider between right blocks */}
            <div className="my-8 lg:my-10 border-t border-slate-200" />

            {/* Block 2: Nationwide Delivery */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {t.deliveryTitle}
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                {t.deliveryDesc}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {t.deliveryCities}
              </p>
              <div className="pt-1">
                <a
                  href="mailto:sales@inso.uz?subject=Regional%20Supply%20Inquiry"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--inso-primary)] hover:underline transition-colors"
                >
                  <span>{t.deliveryAction}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            3. KEY METRICS ROW (Clean, Frameless, Pure Swiss Typography)
           ================================================================= */}
        <div className="border-y border-slate-200 py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {/* Metric 1 */}
            <div className="md:pr-8 md:border-r border-slate-200">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-none">
                {t.metric1Val}
              </div>
              <div className="mt-2.5 text-sm sm:text-[15px] text-slate-600 font-normal">
                {t.metric1Label}
              </div>
            </div>

            {/* Metric 2 */}
            <div className="md:px-8 md:border-r border-slate-200">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-none">
                {t.metric2Val}
              </div>
              <div className="mt-2.5 text-sm sm:text-[15px] text-slate-600 font-normal">
                {t.metric2Label}
              </div>
            </div>

            {/* Metric 3 */}
            <div className="md:pl-8">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-none">
                {t.metric3Val}
              </div>
              <div className="mt-2.5 text-sm sm:text-[15px] text-slate-600 font-normal">
                {t.metric3Label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
