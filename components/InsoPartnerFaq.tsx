import { useId, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, FileCheck2, Plus, Truck } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';
import type { InquiryTopic } from '@/lib/inquiries';

const topics = [
  {
    icon: BriefcaseBusiness, topic: 'wholesale',
    ru: { name: 'Партнёрство', action: 'Запросить прайс', qa: [
      ['Как начать сотрудничество с INSO?', 'Производителю достаточно сообщить название препарата и интересующие регионы. Аптеке или клинике — указать нужные позиции, объём и город доставки. Запрос поступит в отдел продаж.'],
      ['Где посмотреть ассортимент и получить цены?', 'В каталоге можно искать по торговому названию или действующему веществу. Для расчёта оптовых цен укажите выбранные позиции в обращении.']] },
    uz: { name: 'Hamkorlik', action: 'Narxlarni soʻrash', qa: [
      ['INSO bilan hamkorlikni qanday boshlash mumkin?', 'Ishlab chiqaruvchi preparat nomi va hududlarni, dorixona yoki klinika esa mahsulotlar, miqdor va yetkazish shahrini koʻrsatishi mumkin. Soʻrov savdo boʻlimiga boradi.'],
      ['Assortiment va narxlarni qayerdan bilsam boʻladi?', 'Katalogda savdo nomi yoki faol modda boʻyicha qidiring. Ulgurji narxlarni olish uchun tanlangan mahsulotlarni xabarda yozing.']] },
    en: { name: 'Partnership', action: 'Request prices', qa: [
      ['How do we start working with INSO?', 'Manufacturers can share the medicine and regions of interest. Pharmacies and clinics can list the products, quantities and delivery city. Our sales team receives the enquiry.'],
      ['Where can I find products and request prices?', 'Search the catalogue by brand or active ingredient. Include the selected products in your enquiry for wholesale pricing.']] },
  },
  {
    icon: Truck, topic: 'distribution',
    ru: { name: 'Поставки и хранение', action: 'Обсудить поставки', qa: [
      ['Как уточнить доставку в наш регион?', 'Укажите город, препарат и объём партии. Отдел продаж уточнит условия поставки через региональную сеть.'],
      ['Какие условия хранения есть на складе?', 'На складе в Ташкенте предусмотрены режимы +2…+8 °C и +15…+25 °C. Сертификат GDP можно открыть в разделе «Дистрибуция».']] },
    uz: { name: 'Yetkazish va saqlash', action: 'Yetkazishni muhokama qilish', qa: [
      ['Hududimizga yetkazish shartlarini qanday bilamiz?', 'Shahar, preparat va partiya hajmini koʻrsating. Savdo boʻlimi hududiy tarmoq orqali yetkazish shartlarini aniqlashtiradi.'],
      ['Omborda qanday saqlash sharoitlari bor?', 'Toshkentdagi omborda +2…+8 °C va +15…+25 °C harorat rejimlari mavjud. GDP sertifikati distribyutsiya boʻlimida.']] },
    en: { name: 'Delivery and storage', action: 'Discuss distribution', qa: [
      ['How do we check delivery to our region?', 'Tell us the city, product and shipment size. Sales will confirm delivery terms through our regional network.'],
      ['What storage conditions are available?', 'The Tashkent warehouse provides storage at 2–8 °C and 15–25 °C. The GDP certificate is available in the distribution section.']] },
  },
  {
    icon: FileCheck2, topic: 'registration',
    ru: { name: 'Документы', action: 'Написать в отдел регистрации', qa: [
      ['Где получить сертификат GDP и копию лицензии?', 'Сертификат GDP доступен в PDF. Для копии лицензии напишите в отдел регистрации и укажите, для какой организации нужны документы.'],
      ['Кто помогает с регистрацией препарата?', 'INSO Service сопровождает подготовку досье и регистрацию. Укажите название препарата, производителя и на каком этапе сейчас находится проект.']] },
    uz: { name: 'Hujjatlar', action: 'Roʻyxatdan oʻtkazish boʻlimiga yozish', qa: [
      ['GDP sertifikati va litsenziya nusxasini qayerdan olaman?', 'GDP sertifikati PDF shaklida. Litsenziya nusxasini olish uchun roʻyxatdan oʻtkazish boʻlimiga tashkilot nomini yozing.'],
      ['Preparatni roʻyxatdan oʻtkazishda kim yordam beradi?', 'INSO Service hujjatlarni tayyorlash va roʻyxatdan oʻtkazishda koʻmaklashadi. Preparat, ishlab chiqaruvchi va loyihaning hozirgi bosqichini koʻrsating.']] },
    en: { name: 'Documents', action: 'Contact registration', qa: [
      ['Where can I get the GDP certificate and a licence copy?', 'The GDP certificate is available as a PDF. For a licence copy, contact registration and include the name of the requesting organisation.'],
      ['Who can assist with product registration?', 'INSO Service supports dossier preparation and registration. Share the medicine, manufacturer and current stage of the project.']] },
  },
] as const;

export default function InsoPartnerFaq({ lang, onRequest }: { lang: Language; onRequest: (topic: InquiryTopic) => void }) {
  const id = useId();
  const [group, setGroup] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const item = topics[group];
  const t = item[lang];
  return (
    <section id="faq" aria-labelledby="partner-faq-title" className="scroll-mt-18">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="partner-library vision-reveal">
          <div>
            <h2 id="partner-faq-title" className="text-4xl font-medium leading-[1.04] tracking-tight text-[#193f41] lg:text-5xl">
              {{ ru: 'Вопросы', uz: 'Hamkorlar', en: 'Partner' }[lang]}{' '}
              <em className="font-serif font-normal text-[#377b70]">{{ ru: 'партнёров', uz: 'savollari', en: 'questions' }[lang]}</em>
            </h2>
            <div className="mt-5 flex flex-wrap gap-2 md:mt-8 md:flex-col md:items-start">
              {topics.map(({ icon: Icon, ...topic }, i) => (
                <button key={topic.topic} type="button" aria-pressed={i === group} aria-controls={id+'-answers'}
                  onClick={() => { setGroup(i); setExpanded(0); }} className="partner-topic">
                  <Icon aria-hidden="true" className="size-4 shrink-0" />{topic[lang].name}
                </button>
              ))}
            </div>
          </div>
          <div id={id+'-answers'} aria-label={t.name} className="min-w-0">
            {t.qa.map(([q,a], i) => (
              <div key={group+'-'+i} className="partner-question">
                <h3><button type="button" aria-expanded={expanded === i} aria-controls={id+'-a'+i}
                  onClick={() => setExpanded(expanded === i ? null : i)}>
                  {q}<Plus aria-hidden className={'size-5 shrink-0 transition-transform '+(expanded === i ? 'rotate-45' : '')} />
                </button></h3>
                <div id={id+'-a'+i} className="partner-answer" data-open={expanded === i} inert={expanded !== i}>
                  <div><p>{a}</p></div>
                </div>
              </div>
            ))}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
              <a className="inso-action inline-flex items-center gap-2 rounded-full px-4 py-2.5" href="#inquiry-form" onClick={() => onRequest(item.topic)}>{t.action}<ArrowUpRight aria-hidden className="size-4" /></a>
              {group === 0 ? <a className="text-teal-800 underline-offset-4 hover:underline" href={`/portfolio?lang=${lang}`}>{{ru:'Каталог препаратов',uz:'Dori katalogi',en:'Product catalogue'}[lang]}</a> :
                <a className="text-teal-800 underline-offset-4 hover:underline" href="/license/inso_gdp.pdf">GDP (PDF) ↗</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
