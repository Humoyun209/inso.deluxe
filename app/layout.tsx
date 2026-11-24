import type { Metadata } from 'next';
import { Onest, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const onest = Onest({
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
  icons: {
    icon: '/logos/INSO-Group_A_GROUP_vertical_black.png',
    shortcut: '/logos/INSO-Group_A_GROUP_vertical_black.png',
    apple: '/logos/INSO-Group_A_GROUP_vertical_black.png',
  },
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
    <html lang="ru" data-palette="indigo" className={`${onest.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[var(--inso-bg-surface,#F7F4EE)] text-[var(--inso-body-text,#2B3440)] selection:bg-[#11244D] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
