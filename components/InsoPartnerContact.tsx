'use client';

import Image from 'next/image';
import InsoTopicSelect from './InsoTopicSelect';
import InsoPartnerFaq from './InsoPartnerFaq';
import { useRef, useState } from 'react';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { sendInquiry } from '@/app/actions/send-inquiry';
import { inquiryTopics, type InquiryTopic } from '@/lib/inquiries';
import type { Language } from '@/lib/insopharm-data';

const copy = {
  ru: {
    badge: '09 · СВЯЗАТЬСЯ С НАМИ',
    title: 'Обсудим сотрудничество', name: 'Имя и организация', contact: 'Почта или телефон для ответа', topic: 'Тема обращения', message: 'Ваш запрос',
    send: 'Отправить запрос', draft: 'Открыть в почте', hint: 'Письмо откроется в вашей почте. Проверьте текст и нажмите «Отправить».',
    pending: 'Отправляем…', ok: 'Почтовый сервис принял письмо для отправки.', error: 'Отправить не удалось. Можно повторить попытку или написать отделу напрямую.',
    address: 'Ташкент, Юнусабадский район, ул. Богишамол, 160', route: 'Построить маршрут', formTitle: 'Написать нам', phone: 'Телефон и фармаконадзор', invalid: 'Заполните имя, обратный контакт и сообщение.',
  },
  uz: {
    badge: '09 · ALOQA VA HAMKORLIK',
    title: 'Hamkorlikni muhokama qilaylik', name: 'Ism va tashkilot', contact: 'Javob uchun email yoki telefon', topic: 'Murojaat mavzusi', message: 'Xabaringiz',
    send: 'Xabar yuborish', draft: 'Pochtada ochish', hint: 'Xat pochtangizda ochiladi. Matnni tekshiring va yuboring.',
    pending: 'Yuborilmoqda…', ok: 'Pochta xizmati xatni yuborish uchun qabul qildi.', error: 'Xat yuborilmadi. Qayta urinib koʻring yoki boʻlimga bevosita yozing.',
    address: 'Toshkent, Yunusobod tumani, Bogʻishamol koʻchasi, 160', route: 'Yoʻnalishni ochish', formTitle: 'Bizga yozing', phone: 'Telefon va farmakonazorat', invalid: 'Ism, aloqa maʼlumoti va xabarni kiriting.',
  },
  en: {
    badge: '09 · CONTACT & PARTNERSHIP',
    title: 'Discuss a partnership', name: 'Name and organisation', contact: 'Email or phone for a reply', topic: 'Enquiry topic', message: 'Your enquiry',
    send: 'Send enquiry', draft: 'Open in email', hint: 'Your email app will open a draft. Review it and press Send.',
    pending: 'Sending…', ok: 'The email service accepted your enquiry for delivery.', error: 'Sending failed. Please retry or email the department directly.',
    address: '160 Bogishamol Street, Yunusabad, Tashkent', route: 'Get directions', formTitle: 'Write to us', phone: 'Phone and pharmacovigilance', invalid: 'Enter your name, contact details and message.',
  },
};

export default function InsoPartnerContact({ lang, directMail }: { lang: Language; directMail: boolean }) {
  const t = copy[lang];
  const [topic, setTopic] = useState<InquiryTopic>('distribution');
  const [status, setStatus] = useState<'idle' | 'pending' | 'ok' | 'error' | 'invalid'>('idle');
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  const department = inquiryTopics[topic];
  const nameInput = useRef<HTMLInputElement>(null);
  const field = 'mt-1.5 block w-full rounded-xl border border-[var(--inso-border-subtle)] bg-white px-3.5 py-3 text-base font-normal text-slate-900 focus:outline-[var(--inso-primary)]';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'pending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const [name, contact, message] = ['name', 'contact', 'message'].map(key => String(data.get(key) ?? '').trim());
    if (!name || !contact || !message) { setStatus('invalid'); return; }
    const subject = 'INSO · ' + department[lang];
    if (!directMail) {
      window.location.href = `mailto:${department.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent([name, contact, '', message].join('\n'))}`;
      return;
    }
    setStatus('pending');
    try {
      const payload = JSON.stringify([topic, name, contact, message]);
      if (attempt.current?.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() };
      const accepted = await sendInquiry(topic, name, contact, message, attempt.current.id);
      if (accepted) {
        form.reset();
        setTopic('distribution');
        attempt.current = null;
      }
      setStatus(accepted ? 'ok' : 'error');
    } catch { setStatus('error'); }
  }

  return (
    <>
      <InsoPartnerFaq lang={lang} onRequest={next => {
        if (status === 'pending') return;
        setTopic(next);
        setStatus('idle');
        nameInput.current?.focus({ preventScroll: true });
      }} />
      <section id="contacts" aria-labelledby="partner-contact-title" className="scroll-mt-18 px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-[1216px] items-center gap-6 border-t border-[var(--inso-border-subtle)] pt-10 text-[var(--inso-heading-text)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pt-14">
          <div className="min-w-0">
            <div className="hero-eyebrow text-xs font-semibold text-[var(--inso-badge-color)] uppercase tracking-[0.16em] mb-3">
              <span>{t.badge}</span>
            </div>
            <h2 id="partner-contact-title" className="text-balance text-3xl sm:text-4xl lg:text-[38px] font-medium leading-[1.08] tracking-tight">{t.title}</h2>
            <div className="mt-6 flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--inso-teal)]" />
              <div><p className="mb-1 text-[12px] text-[var(--inso-muted-text)]">{t.phone}</p>
                <a className="block w-fit text-xl font-semibold hover:underline" href="tel:+998935056552">+998 93 505 65 52</a>
                <a className="mt-1 block w-fit text-[15px] sm:text-[16px] hover:underline" href="tel:+998712006552">+998 71 200 65 52</a>
              </div>
            </div>
            <a className="mt-4 inline-flex items-center gap-3 text-[16px] sm:text-[17px] hover:underline" href="mailto:sales@inso.uz"><Mail aria-hidden="true" className="size-4 text-[var(--inso-teal)]" />sales@inso.uz</a>
            <div id="map" className="mt-4 flex scroll-mt-24 items-start gap-3 border-t border-[var(--inso-border-subtle)] pt-4">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--inso-teal)]" />
              <div><p className="text-[16px] sm:text-[17px]">{t.address}</p>
                <a className="mt-1.5 inline-flex items-center gap-1 text-[15px] sm:text-[16px] font-semibold text-[var(--inso-teal)] hover:underline" href="https://www.google.com/maps/dir/?api=1&destination=160+Bogishamol+Street%2C+Yunusabad%2C+Tashkent%2C+Uzbekistan" target="_blank" rel="noreferrer">{t.route}<ArrowUpRight aria-hidden="true" className="size-4" /></a>
              </div>
            </div>

          </div>
          <form id="inquiry-form" onSubmit={submit} onChange={() => { if (status !== 'pending') setStatus('idle'); }}
            className="partner-form relative overflow-hidden isolate min-w-0 scroll-mt-24 rounded-3xl p-5 text-[var(--inso-heading-text)] sm:p-8">
            {/* Subtle brand watermark on contact form */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute -bottom-24 -right-24 sm:-bottom-28 sm:-right-24 w-[340px] h-[340px] opacity-[0.04] -z-10"
            >
              <Image
                src="/photos/bg-element-indigo.svg"
                alt=""
                width={340}
                height={340}
                className="w-full h-full object-contain"
                priority={false}
              />
            </div>
            <h3 className="relative z-10 mb-5 text-xl sm:text-[22px] lg:text-[24px] font-semibold tracking-tight">{t.formTitle}</h3>
              <fieldset disabled={status === 'pending'} className="relative z-10 grid gap-4 text-sm font-semibold text-[var(--inso-heading-text)]">
                <label>{t.name}<input ref={nameInput} name="name" required maxLength={120} autoComplete="name" className={field} /></label>
                <label>{t.contact}<input name="contact" required maxLength={160} className={field} /></label>
                <InsoTopicSelect label={t.topic} lang={lang} value={topic} onChange={next => { setTopic(next); setStatus('idle'); }} />
                <label>{t.message}<textarea name="message" required maxLength={2000} rows={3} className={field} /></label>
                <a href={`mailto:${department.email}`} className="w-fit text-sm underline underline-offset-4">{department.email}</a>
                {!directMail && <p className="text-sm font-normal text-slate-600">{t.hint}</p>}
                <button className="inso-action w-fit cursor-pointer rounded-full px-6 py-3 font-semibold disabled:opacity-60">{status === 'pending' ? t.pending : directMail ? t.send : t.draft}</button>
              </fieldset>
              <p aria-live="polite" className="mt-2 text-sm">{status === 'ok' || status === 'error' || status === 'invalid' ? t[status] : ''}</p>
            </form>
        </div>
      </section>
    </>
  );
}
