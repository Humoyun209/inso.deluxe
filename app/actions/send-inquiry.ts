'use server';

import { inquiryTopics, type InquiryTopic } from '@/lib/inquiries';

export async function sendInquiry(topic: InquiryTopic, name: string, contact: string, message: string, requestId: string) {
  const token = process.env.RESEND_API_KEY;
  const from = process.env.INSO_CONTACT_FROM;
  if (!token || !from || !Object.hasOwn(inquiryTopics, topic)) return false;
  if (![name, contact, message].every(value => typeof value === 'string' && value.trim())) return false;
  if (name.length > 120 || contact.length > 160 || message.length > 2000 || !/^[a-f0-9-]{36}$/i.test(requestId)) return false;

  const department = inquiryTopics[topic];
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
    body: JSON.stringify({
      from, to: [department.email], subject: `INSO · ${department.ru}`,
      text: [name, contact, '', message].join('\n'),
    }),
    signal: AbortSignal.timeout(10000),
  });
  return response.ok && Boolean((await response.json()).id);
}
