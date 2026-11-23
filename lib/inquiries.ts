export const inquiryTopics = {
  distribution: { email: 'sales@inso.uz', ru: 'Поставки', uz: 'Yetkazib berish', en: 'Distribution' },
  wholesale: { email: 'sales@inso.uz', ru: 'Оптовый прайс', uz: 'Ulgurji narxlar', en: 'Wholesale prices' },
  registration: { email: 'registration@inso.uz', ru: 'Регистрация', uz: 'Roʻyxatdan oʻtkazish', en: 'Registration' },
  safety: { email: 'info@inso.uz', ru: 'Фармаконадзор', uz: 'Farmakonazorat', en: 'Drug safety' },
};

export type InquiryTopic = keyof typeof inquiryTopics;
