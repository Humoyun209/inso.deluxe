import { ArrowUpRight, FileCheck2, FileText, MapPin, Warehouse } from 'lucide-react';
import type { Language } from '@/lib/insopharm-data';

const heading = {
  ru: 'Как устроена дистрибуция',
  uz: 'INSO distribyutsiyasi qanday ishlaydi',
  en: 'How INSO distributes medicines',
};

const credentials = [
  {
    icon: FileText,
    href: 'mailto:registration@inso.uz',
    ru: ['Лицензия', 'Оптовая реализация лекарств в Узбекистане.', 'Запросить копию'],
    uz: ['Farmatsevtika faoliyati litsenziyasi', 'Oʻzbekistonda dori vositalarini ulgurji sotish.', 'Nusxasini soʻrash'],
    en: ['Wholesale licence', 'Wholesale distribution of medicines in Uzbekistan.', 'Request a copy'],
  },
  {
    icon: FileCheck2,
    href: '/license/inso_gdp.pdf',
    ru: ['Сертификат GDP', 'Надлежащая дистрибьюторская практика.', 'Сертификат (PDF)'],
    uz: ['GDP sertifikati', 'Zarur distribyutorlik amaliyoti.', 'Sertifikatni ochish (PDF)'],
    en: ['GDP certificate', 'Good Distribution Practice.', 'View certificate (PDF)'],
  },
  {
    icon: Warehouse,
    href: '#warehouse',
    ru: ['Склад в Ташкенте', '10 000 м² для хранения при +2…+8 °C и +15…+25 °C.', 'Посмотреть склад'],
    uz: ['Toshkentdagi ombor', '10 000 m² omborda dorilarni ikki harorat oraligʻida saqlaymiz: +2…+8 °C va +15…+25 °C.', 'Omborni koʻrish'],
    en: ['Tashkent warehouse', 'Our 10,000 m² warehouse stores medicines at 2–8 °C and 15–25 °C.', 'See the warehouse'],
  },
  {
    icon: MapPin,
    href: 'mailto:sales@inso.uz',
    ru: ['Доставка по Узбекистану', '13 региональных офисов снабжают аптеки и клиники.', 'Условия доставки'],
    uz: ['Oʻzbekiston boʻylab yetkazib berish', '13 ta hududiy ofis orqali mamlakat boʻylab dorixonalar va klinikalarga dori yetkazamiz.', 'Yetkazib berish shartlarini soʻrash'],
    en: ['Nationwide delivery', 'Our 13 regional offices supply pharmacies and clinics across Uzbekistan.', 'Ask about delivery'],
  },
] as const;

export default function InsoCredentials({ lang }: { lang: Language }) {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="scroll-mt-20 text-[#183f48]">
      <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-7 sm:px-6 sm:pt-14 sm:pb-9 lg:px-8">
        <h2 id="credentials-title" className="vision-reveal mb-6 text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight sm:mb-8">
          {heading[lang]}
        </h2>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map(({ icon: Icon, href, ...copy }) => {
            const [title, description, action] = copy[lang];
            return (
              <article key={href} className="vision-reveal flex flex-col items-start border-t border-[#c3d8d5] pt-4">
                <div className="flex items-start gap-2.5">
                  <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#23756c]" />
                  <h3 className="text-lg sm:text-[22px] font-semibold leading-snug">{title}</h3>
                </div>
                <p className="mt-2 mb-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-600">{description}</p>
                <a href={href} className="inso-soft-link mt-auto inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold">
                  {action}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
