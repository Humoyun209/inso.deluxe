import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'INSO Group — фармацевтический холдинг Узбекистана',
  description:
    'Дистрибуция, промоция и сервисные услуги для производителей лекарств и продуктов для здоровья. INSO Group — от производителя до пациента.',
  openGraph: {
    title: 'INSO Group — фармацевтический холдинг Узбекистана',
    description:
      'Дистрибуция, промоция и сервисные услуги для производителей лекарств и продуктов для здоровья. INSO Group — от производителя до пациента.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INSO Group — фармацевтический холдинг Узбекистана',
    description:
      'Дистрибуция, промоция и сервисные услуги для производителей лекарств и продуктов для здоровья. INSO Group — от производителя до пациента.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0B4F6C] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
