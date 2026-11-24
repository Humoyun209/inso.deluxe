'use client';

import { useState } from 'react';
import { ArrowUpRight, Plus, FileText, Send } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';
import type { InquiryTopic } from '@/lib/inquiries';

export interface FAQItemData {
  id: string;
  category: 'logistics' | 'manufacturers' | 'pharmacies' | 'compliance';
  question: Record<Language, string>;
  answer: Record<Language, string>;
  topic?: InquiryTopic;
  actionText?: Record<Language, string>;
  actionPdf?: string;
}

export const COMPREHENSIVE_FAQ: FAQItemData[] = [
  // 1. Логистика и GDP-склад
  {
    id: 'faq-delivery-time',
    category: 'logistics',
    question: {
      ru: 'Каковы регламенты и сроки доставки по регионам Узбекистана?',
      uz: 'Oʻzbekiston hududlari boʻylab yetkazib berish muddati va qoidalari qanday?',
      en: 'What are the delivery timelines and coverage across Uzbekistan?',
    },
    answer: {
      ru: 'Собственная сеть из 13 региональных филиалов и распределительных хабов обеспечивает регулярное снабжение аптек и медицинских учреждений во всех вилоятах страны. Стандартный регламент отгрузки и доставки составляет от 12 до 24 часов с момента подтверждения заявки. В Ташкенте и Ташкентской области действует экспресс-доставка день в день.',
      uz: 'Respublikaning barcha viloyatlarida joylashgan 13 ta shaxsiy hududiy filial va taqsimlash markazlari dorixona hamda klinikalarni muntazam taʼminlaydi. Buyurtma tasdiqlangach, standart yetkazib berish muddati 12–24 soatni tashkil etadi. Toshkent shahri va viloyatida buyurtma berilgan kunning oʻzidayoq yetkaziladi.',
      en: 'Our proprietary network of 13 regional hubs ensures consistent replenishment for pharmacies and hospitals in all provinces. Standard dispatch-to-delivery protocol is 12 to 24 hours from order confirmation. Same-day express fulfillment is available throughout Tashkent and the surrounding metropolitan region.',
    },
    topic: 'distribution',
    actionText: {
      ru: 'Условия региональных поставок',
      uz: 'Hududiy yetkazish shartlari',
      en: 'Regional delivery terms',
    },
  },
  {
    id: 'faq-cold-chain',
    category: 'logistics',
    question: {
      ru: 'Как гарантируется непрерывность холодовой цепи (+2…+8 °C) при транспортировке в отдалённые вилояты?',
      uz: 'Uzoq viloyatlarga yetkazishda sovuqlik zanjiri (+2…+8 °C) uzluksizligi qanday taʼminlanadi?',
      en: 'How do you guarantee cold-chain continuity (+2…+8 °C) during regional transit?',
    },
    answer: {
      ru: 'Транспортировка термолабильных биопрепаратов и вакцин выполняется сертифицированным рефрижераторным автопарком и валидированными термоконтейнерами с сухим льдом и хладоэлементами. Каждое отправление комплектуется автономными электронными логгерами температуры. Данные телеметрии передаются заказчику вместе с партионной документацией, подтверждая отсутствие температурных экскурсий.',
      uz: 'Termolabil biopreparatlar va vaksinalar sertifikatlangan refrijerator transportlarida hamda harorat nazoratiga ega maxsus termokonteynerlarda tashiladi. Har bir partiyaga mustaqil elektron harorat qayd etuvchi datchiklar (loggerlar) biriktiriladi. Maʼlumotlar harorat rejimiga toʻliq rioya etilganini tasdiqlovchi hujjatlar bilan birga mijozga taqdim etiladi.',
      en: 'Sensitive biologicals and vaccines are transported using calibrated refrigerated vans and validated thermal containers equipped with phase-change packs. Each consignment includes independent digital data loggers. Temperature graphs are provided directly to the recipient alongside shipping dossiers, certifying zero thermal excursions.',
    },
    actionPdf: '/license/inso_gdp.pdf',
    actionText: {
      ru: 'Открыть GDP-сертификат (PDF)',
      uz: 'GDP sertifikatini ochish (PDF)',
      en: 'Open GDP Certificate (PDF)',
    },
  },
  {
    id: 'faq-asl-belgisi',
    category: 'logistics',
    question: {
      ru: 'Как устроен партионный учёт и работа с национальной маркировкой Asl Belgisi?',
      uz: 'Partiyaviy hisob va «Asl Belgisi» milliy markirovka tizimi bilan ishlash qanday yoʻlga qoʻyilgan?',
      en: 'How do you manage batch serialization and Asl Belgisi national tracking?',
    },
    answer: {
      ru: 'Наш складской комплекс класса «А» функционирует под управлением современной WMS-системы с автоматизированным поштучным и поагрегатным сканированием 2D DataMatrix кодов. Приёмка, таможенная очистка, агрегация и отгрузка в аптеки осуществляются с прямой автоматической передачей криптокодов в национальную систему Asl Belgisi без риска пересортицы.',
      uz: '«A» toifali ombor majmuamiz 2D DataMatrix kodlarini avtomatlashtirilgan tarzda skanerlovchi zamonaviy WMS tizimi orqali boshqariladi. Qabul qilish, bojxona rasmiylashtiruvi, agregatsiya va dorixonalarga joʻnatish jarayonlari toʻgʻridan-toʻgʻri «Asl Belgisi» tizimiga integratsiya qilingan holda xatosiz amalga oshiriladi.',
      en: 'Our Class-A warehouse runs on an enterprise WMS integrated with high-throughput 2D DataMatrix scanning stations. Receiving, customs clearance, aggregation, and pharmacy dispatch are synchronized directly with Uzbekistan’s national Asl Belgisi serialization database, eliminating compliance and audit risks.',
    },
    topic: 'distribution',
  },
  {
    id: 'faq-emergency-dispatch',
    category: 'logistics',
    question: {
      ru: 'Возможна ли экстренная отгрузка жизненно важных препаратов для клиник в выходные дни?',
      uz: 'Dam olish kunlari reanimatsiya va shifoxonalar uchun shoshilinch dori yetkazib berish mumkinmi?',
      en: 'Is emergency weekend dispatch available for ICU and hospital wards?',
    },
    answer: {
      ru: 'Да, для специализированных медицинских центров, отделений реанимации и онкологических стационаров в INSO Group действует служба круглосуточного дежурства. Экстренные поставки жизненно необходимых препаратов координируются персональным медицинским менеджером 24/7.',
      uz: 'Ha, ixtisoslashtirilgan tibbiyot markazlari, reanimatsiya va onkologiya shifoxonalari uchun INSO Group-da tunu-kun navbatchilik xizmati mavjud. Hayotiy muhim dori vositalarini tezkor yetkazib berish shaxsiy menejer tomonidan 24/7 rejimida muvofiqlashtiriladi.',
      en: 'Yes. For specialized clinical centers, ICUs, and oncology clinics, INSO Group maintains an on-call weekend dispatch team. Urgent deliveries of life-saving medicines are coordinated 24/7 through dedicated healthcare account managers.',
    },
    topic: 'wholesale',
  },

  // 2. Производителям и вендорам
  {
    id: 'faq-registration-turnkey',
    category: 'manufacturers',
    question: {
      ru: 'Как вывести зарубежный препарат на рынок Узбекистана «под ключ» через INSO Service?',
      uz: 'INSO Service orqali xorijiy dori vositasini Oʻzbekiston bozoriga tayyor holda qanday olib chiqish mumkin?',
      en: 'How can foreign pharmaceutical manufacturers register medicines via INSO Service?',
    },
    answer: {
      ru: 'Подразделение INSO Service берёт на себя полный регуляторный цикл: аудит регистрационного досье в формате CTD/ACTD, локализацию инструкций и макетов упаковок, сопровождение клинических экспертиз в ГУП Минздрава РУз, получение регистрационного удостоверения (РУ) и дальнейшую организацию дистрибуции.',
      uz: 'INSO Service boʻlinmasi barcha bosqichlarni oʻz zimmasiga oladi: CTD/ACTD hujjatlar auditidan tortib, oʻzbek tilidagi yoʻriqnoma va qadoqlarni tayyorlash, Sogʻliqni saqlash vazirligi laboratoriya ekspertizalarini oʻtkazish, davlat roʻyxatidan oʻtkazish guvohnomasini olish va distribyutsiyani tashkil qilish.',
      en: 'INSO Service manages the entire regulatory pathway: CTD/ACTD dossier gap analysis, patient leaflet localization, ministry lab testing coordination, registration certificate procurement from the Ministry of Health, and subsequent commercial rollout.',
    },
    topic: 'registration',
    actionText: {
      ru: 'Обсудить регистрацию досье',
      uz: 'Hujjatlarni roʻyxatdan oʻtkazishni muhokama qilish',
      en: 'Discuss dossier registration',
    },
  },
  {
    id: 'faq-registration-timeline',
    category: 'manufacturers',
    question: {
      ru: 'Сколько времени занимает государственная регистрация препарата в Республике Узбекистан?',
      uz: 'Oʻzbekiston Respublikasida dori vositasini davlat roʻyxatidan oʻtkazish qancha vaqt oladi?',
      en: 'What is the typical timeframe for pharmaceutical registration in Uzbekistan?',
    },
    answer: {
      ru: 'Стандартная процедура государственной регистрации лекарственных средств в соответствии с законодательством РУз занимает от 120 до 180 календарных дней. Для оригинальных препаратов и дженериков, зарегистрированных регуляторными органами стран со строгими стандартами (EMA, FDA, PMDA, MHRA), действует ускоренная процедура признания с сокращённым сроком до 60–90 дней.',
      uz: 'Amaldagi qonunchilikka muvofiq, standart roʻyxatdan oʻtkazish jarayoni 120 kundan 180 kungacha davom etadi. Qatʼiy tartibga soluvchi xalqaro organlar (EMA, FDA, MHRA) tomonidan maʼqullangan preparatlar uchun soddalashtirilgan tartibda 60–90 kun ichida amalga oshirilishi mumkin.',
      en: 'Standard national registration under Uzbek regulatory code takes 120 to 180 calendar days. Fast-track recognition procedures (60 to 90 days) apply for molecules already approved by Stringent Regulatory Authorities (SRA) such as EMA, FDA, PMDA, or MHRA.',
    },
    topic: 'registration',
  },
  {
    id: 'faq-pharmacovigilance',
    category: 'manufacturers',
    question: {
      ru: 'Обеспечивает ли холдинг фармаконадзор и мониторинг безопасности лекарственных средств?',
      uz: 'Xolding dori vositalari xavfsizligi monitoringi (farmakonazorat) tizimini taʼminlaydimi?',
      en: 'Does INSO Group provide dedicated pharmacovigilance and safety monitoring?',
    },
    answer: {
      ru: 'Да, в холдинге действует сертифицированная служба фармаконадзора с круглосуточной горячей линией и электронной системой фиксации спонтанных сообщений о нежелательных реакциях. Мы формируем периодические отчёты по безопасности (PSUR/PBRER) и взаимодействуем с Государственным центром экспертизы и стандартизации лекарственных средств Минздрава РУз.',
      uz: 'Ha, xoldingda kechayu-kunduz ishlovchi ishonch telefoni va nojoʻya taʼsirlar toʻgʻrisidagi xabarlarni qayd etuvchi elektron tizimga ega maxsus farmakonazorat xizmati mavjud. Biz doimiy xavfsizlik hisobotlarini (PSUR) tayyorlaymiz va Sogʻliqni saqlash vazirligi bilan muntazam hamkorlik qilamiz.',
      en: 'Yes, our certified in-house pharmacovigilance department operates a 24/7 reporting hotline and safety database. We prepare Periodic Safety Update Reports (PSUR/PBRER) and liaise directly with the Ministry of Health Pharmacovigilance Centre.',
    },
    topic: 'registration',
  },
  {
    id: 'faq-medical-promotion',
    category: 'manufacturers',
    question: {
      ru: 'Как устроено медицинское продвижение и работа со врачами?',
      uz: 'Tibbiy targʻibot va shifokorlar bilan ishlash jarayoni qanday yoʻlga qoʻyilgan?',
      en: 'How is field medical promotion and physician engagement structured?',
    },
    answer: {
      ru: 'Наша региональная команда насчитывает более 80 профессиональных медицинских представителей с высшим медицинским и фармацевтическим образованием во всех областях страны. Мы организуем регулярные визиты к врачам, научно-практические конференции, мастер-классы и круглые столы в партнерстве с профильными НИИ и ассоциациями Узбекистана.',
      uz: 'Respublikaning barcha viloyatlarida oliy tibbiy va farmatsevtik maʼlumotga ega 80 dan ortiq professional tibbiy vakillarimiz faoliyat yuritadi. Biz shifokorlar bilan uchrashuvlar, ilmiy-amaliy anjumanlar hamda Oʻzbekistonning yetakchi ilmiy-tekshirish institutlari bilan hamkorlikda seminarlar tashkil qilamiz.',
      en: 'INSO Group deploys 80+ qualified medical representatives holding medical or pharmacy degrees across all regions. We run targeted doctor visits, scientific symposia, roundtables, and clinical education initiatives in partnership with national medical institutes and key opinion leaders.',
    },
    topic: 'wholesale',
  },

  // 3. Клиникам и аптечным сетям
  {
    id: 'faq-payment-terms',
    category: 'pharmacies',
    question: {
      ru: 'Каковы условия оплаты, предоставления отсрочки платежа и минимальный объём заказа (MOQ)?',
      uz: 'Toʻlov shartlari, kechiktirib toʻlash va minimal buyurtma hajmi (MOQ) qanday?',
      en: 'What are the payment terms, credit lines, and minimum order quantities (MOQ)?',
    },
    answer: {
      ru: 'Мы предлагаем гибкие коммерческие условия в зависимости от статуса и объёма партнёра: от предоплаты со скидкой до товарного кредита с отсрочкой платежа до 30–60 календарных дней для аккредитованных сетей и клиник. Минимальная партия отгрузки не ограничена — мы комплектуем заказы от одной заводской упаковки до сборных паллет.',
      uz: 'Biz hamkorning hajmiga mos moslashuvchan shartlarni taklif qilamiz: chegirmali oldindan toʻlovdan tortib, doimiy dorixona tarmoqlari va klinikalar uchun 30–60 kungacha toʻlovni kechiktirish imkoniyati. Minimal partiya chegaralanmagan — bitta qutidan to butun palletgacha buyurtmalar yetkaziladi.',
      en: 'We offer flexible commercial agreements tailored to partner volume, ranging from upfront discounts to structured credit terms with 30 to 60 days deferred payment for accredited chains and clinics. There is no rigid MOQ — we fulfill orders from single retail packs to multi-pallet consignments.',
    },
    topic: 'wholesale',
    actionText: {
      ru: 'Запросить оптовый прайс-лист',
      uz: 'Ulgurji narxlar roʻyxatini soʻrash',
      en: 'Request wholesale price list',
    },
  },
  {
    id: 'faq-certificates-edo',
    category: 'pharmacies',
    question: {
      ru: 'Предоставляется ли полный комплект сертификатов качества и протоколов анализа к каждой отгрузке?',
      uz: 'Har bir joʻnatmaga sifat sertifikatlari va tahlil bayonnomalari toʻliq taqdim etiladimi?',
      en: 'Are full certificates of analysis and conformity provided with each delivery?',
    },
    answer: {
      ru: 'Да, каждая партия сопровождается полным лицензионным пакетом: копией сертификата соответствия Республики Узбекистан, протоколом лабораторного анализа завода-изготовителя, сертификатом происхождения и товарно-транспортными накладными через ЭДО (Didox / Soliq).',
      uz: 'Ha, har bir partiya Oʻzbekiston muvofiqlik sertifikati, ishlab chiqaruvchi zavod tahlil bayonnomasi, kelib chiqish sertifikati va elektron hisob-faktura (Didox / Soliq tizimlari orqali) bilan toʻliq taʼminlanadi.',
      en: 'Yes, every dispatch includes complete regulatory documentation: Uzbekistan Certificate of Conformity, manufacturer Certificate of Analysis (CoA), Certificate of Origin, and electronic invoicing via official EDI portals (Didox/Soliq).',
    },
    topic: 'wholesale',
  },
  {
    id: 'faq-claims-returns',
    category: 'pharmacies',
    question: {
      ru: 'Как устроен регламент рекламаций в случае выявления повреждения упаковки при доставке?',
      uz: 'Yetkazib berish vaqtida qadoq shikastlangan boʻlsa, daʼvo va almashtirish tartibi qanday?',
      en: 'What is the claims resolution process if package damage is detected on arrival?',
    },
    answer: {
      ru: 'При приёмке товара водитель-экспедитор и представитель аптеки/клиники фиксируют состояние коробок. В случае обнаружения дефекта составляется электронный рекламационный акт, а повреждённая позиция подлежит бесплатной замене в течение 24 часов за счёт страхового резерва дистрибьютора.',
      uz: 'Yukni qabul qilishda haydovchi-ekspeditor va dorixona vakili mahsulot holatini tekshiradi. Kamchilik aniqlansa, darhol dalolatnoma tuziladi va shikastlangan preparat 24 soat ichida distribyutor hisobidan bepul almashtirib beriladi.',
      en: 'During handover, our courier and the receiving pharmacist inspect packaging integrity. If an anomaly is identified, a digital claims report is filed immediately, and a replacement batch is dispatched within 24 hours at the distributor’s expense.',
    },
    topic: 'distribution',
  },

  // 4. Лицензии и качество
  {
    id: 'faq-state-license',
    category: 'compliance',
    question: {
      ru: 'Какими государственными лицензиями и разрешениями обладает INSO Group?',
      uz: 'INSO Group qanday davlat litsenziyalari va ruxsatnomalariga ega?',
      en: 'What state licenses and regulatory authorizations does INSO Group hold?',
    },
    answer: {
      ru: 'INSO Group осуществляет деятельность на основании бессрочной государственной лицензии Министерства здравоохранения Республики Узбекистан № 18563 на фармацевтическую деятельность (оптовая реализация лекарственных средств и изделий медицинского назначения), а также имеет собственные склады класса «А», аккредитованные по стандарту GDP.',
      uz: 'INSO Group Oʻzbekiston Respublikasi Sogʻliqni saqlash vazirligi tomonidan berilgan farmatsevtik faoliyat (dori vositalari va tibbiy buyumlarni ulgurji sotish) boʻyicha № 18563-sonli muddatsiz davlat litsenziyasi asosida ishlaydi hamda GDP boʻyicha akkreditatsiyadan oʻtgan omborlarga ega.',
      en: 'INSO Group operates under permanent Pharmaceutical Distribution Licence № 18563 issued by the Ministry of Health of the Republic of Uzbekistan for wholesale trade in pharmaceutical and medical products, alongside certified Class-A GDP warehouse complexes.',
    },
    actionPdf: '/license/inso_gdp.pdf',
    actionText: {
      ru: 'Лицензия Минздрава РУз (PDF)',
      uz: 'Oʻzbekiston SSV litsenziyasi (PDF)',
      en: 'MoH Uzbekistan Licence (PDF)',
    },
  },
  {
    id: 'faq-gdp-audit-access',
    category: 'compliance',
    question: {
      ru: 'Как ознакомиться с сертификатом GDP и результатами инспекционных аудитов?',
      uz: 'GDP sertifikati va xalqaro audit natijalari bilan qanday tanishish mumkin?',
      en: 'How can partners review the GDP certificate and facility audit reports?',
    },
    answer: {
      ru: 'Официальный сертификат соответствия правилам надлежащей дистрибьюторской практики (Good Distribution Practice) доступен для скачивания на нашем сайте в формате PDF. Для проведения внешнего квалификационного аудита качества представителями зарубежных фармпроизводителей предоставляется полный комплект стандартных операционных процедур (СОП) по запросу в отдел качества: compliance@inso.uz.',
      uz: 'Rasmiy GDP sertifikati saytimizda PDF formatida yuklab olish uchun ochiq. Xorijiy farmatsevtika zavodlari sifat auditi oʻtkazishi uchun sifat boʻlimiga murojaat qilib (compliance@inso.uz), barcha standart operatsion tartib-qoidalarni (SOP) olishlari mumkin.',
      en: 'Our official Good Distribution Practice (GDP) certificate is accessible directly on the website in PDF format. For technical site qualification audits, foreign partners may request our complete SOP index by writing to compliance@inso.uz.',
    },
    actionPdf: '/license/inso_gdp.pdf',
    actionText: {
      ru: 'Скачать GDP-сертификат (PDF)',
      uz: 'GDP sertifikatini yuklab olish (PDF)',
      en: 'Download GDP Certificate (PDF)',
    },
  },
];

const categories = {
  all: {
    ru: 'Все вопросы',
    uz: 'Barcha savollar',
    en: 'All Questions',
  },
  logistics: {
    ru: 'Логистика и GDP-склад',
    uz: 'Logistika va GDP ombor',
    en: 'Logistics & GDP Hub',
  },
  manufacturers: {
    ru: 'Производителям и вендорам',
    uz: 'Ishlab chiqaruvchilarga',
    en: 'For Manufacturers',
  },
  pharmacies: {
    ru: 'Клиникам и аптечным сетям',
    uz: 'Klinika va dorixonalarga',
    en: 'Pharmacies & Clinics',
  },
  compliance: {
    ru: 'Лицензии и качество',
    uz: 'Litsenziya va sifat',
    en: 'Licensing & Quality',
  },
};

const copy = {
  ru: {
    badge: '08 · ВОПРОСЫ И ОТВЕТЫ (FAQ)',
    titleMain: 'Часто задаваемые',
    titleAccent: 'вопросы',
    subtitle:
      'Исчерпывающая информация о логистике, холодовой цепи, регистрации лекарственных средств и оптовых поставках по Узбекистану.',
    askQuestion: 'Задать свой вопрос в отдел продаж',
    needConsult: 'Не нашли ответ на свой вопрос?',
    contactTeam: 'Напишите нам — коммерческий отдел ответит в течение 2 рабочих часов.',
  },
  uz: {
    badge: '08 · KOʻP SOʻRALADIGAN SAVOLLAR (FAQ)',
    titleMain: 'Hamkorlar uchun muhim',
    titleAccent: 'savollar',
    subtitle:
      'Logistika, sovuqlik zanjiri, dori vositalarini roʻyxatdan oʻtkazish va butun Oʻzbekiston boʻylab ulgurji taʼminot haqida batafsil maʼlumot.',
    askQuestion: 'Savdo boʻlimiga savol berish',
    needConsult: 'Savolingizga javob topmadingizmi?',
    contactTeam: 'Bizga yozing — tijorat boʻlimi 2 ish soati ichida javob beradi.',
  },
  en: {
    badge: '08 · FREQUENTLY ASKED QUESTIONS (FAQ)',
    titleMain: 'Frequently Asked',
    titleAccent: 'Questions',
    subtitle:
      'Comprehensive information regarding pharmaceutical logistics, cold chain validation, market authorization, and nationwide wholesale supply.',
    askQuestion: 'Submit an inquiry to our sales team',
    needConsult: 'Have a specific question not covered here?',
    contactTeam: 'Contact our commercial team — we will reply within 2 business hours.',
  },
};

export default function InsoPartnerFaq({
  lang,
  onRequest,
}: {
  lang: Language;
  onRequest: (topic: InquiryTopic) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(['faq-delivery-time', 'faq-registration-turnkey'])
  );

  const t = copy[lang];

  const filteredItems =
    selectedCategory === 'all'
      ? COMPREHENSIVE_FAQ
      : COMPREHENSIVE_FAQ.filter((item) => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-labelledby="partner-faq-title"
      className="scroll-mt-20 pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 lg:pb-20 text-slate-900"
    >
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-14">
        {/* =================================================================
            1. SECTION HEADER (Swiss Editorial Typography)
           ================================================================= */}
        <div className="max-w-3xl space-y-3">
          <div className="hero-eyebrow text-xs font-semibold text-[#30665e] uppercase tracking-[0.16em]">
            <span>{t.badge}</span>
          </div>

          <h2
            id="partner-faq-title"
            className="text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-tight text-slate-900 leading-[1.12] text-balance"
          >
            {t.titleMain}{' '}
            <em className="font-serif italic font-normal text-[#26736f]">
              {t.titleAccent}
            </em>
          </h2>

          <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* =================================================================
            2. CATEGORY FILTER TABS
           ================================================================= */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
          {(
            [
              'all',
              'logistics',
              'manufacturers',
              'pharmacies',
              'compliance',
            ] as const
          ).map((catKey) => {
            const active = selectedCategory === catKey;
            const count =
              catKey === 'all'
                ? COMPREHENSIVE_FAQ.length
                : COMPREHENSIVE_FAQ.filter((item) => item.category === catKey).length;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                  active
                    ? 'bg-[#185d53] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{categories[catKey][lang]}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            3. ACCORDION LIST (13 Deep B2B Questions with Clean 1px Separators)
           ================================================================= */}
        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {filteredItems.map((item, index) => {
            const isOpen = openIds.has(item.id);
            const numStr = String(index + 1).padStart(2, '0');

            return (
              <div key={item.id} className="py-5 sm:py-6">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left flex items-start justify-between gap-4 sm:gap-6 group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-[#185d53]/70 tabular-nums shrink-0 mt-0.5">
                      {numStr}
                    </span>
                    <h3 className="text-base sm:text-lg lg:text-[19px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#185d53] transition-colors">
                      {item.question[lang]}
                    </h3>
                  </div>

                  <span
                    className={`size-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#185d53] text-white border-[#185d53] rotate-45'
                        : 'bg-slate-50 group-hover:bg-slate-100'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pl-7 sm:pl-9 pr-2 sm:pr-12 space-y-3.5 animate-in fade-in duration-200">
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                      {item.answer[lang]}
                    </p>

                    {/* Action link if relevant */}
                    {(item.topic || item.actionPdf) && (
                      <div className="pt-1 flex flex-wrap items-center gap-4">
                        {item.topic && (
                          <a
                            href="#inquiry-form"
                            onClick={() => onRequest(item.topic!)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#185d53] hover:text-[#0f3d36] transition-colors"
                          >
                            <span>
                              {item.actionText
                                ? item.actionText[lang]
                                : t.askQuestion}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {item.actionPdf && (
                          <a
                            href={item.actionPdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>
                              {item.actionText
                                ? item.actionText[lang]
                                : 'PDF'}
                            </span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =================================================================
            4. BOTTOM CTA BAR (Still have questions?)
           ================================================================= */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {t.needConsult}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {t.contactTeam}
            </p>
          </div>

          <a
            href="#contacts"
            className="inso-action inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-teal-300" />
            <span>{t.askQuestion}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
