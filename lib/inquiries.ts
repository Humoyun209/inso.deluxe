export const inquiryTopics = {
  distribution: { email: 'sales@inso.uz', ru: 'Поставки', uz: 'Yetkazib berish', en: 'Distribution', zh: '药品供应与分销' },
  wholesale: { email: 'sales@inso.uz', ru: 'Оптовый прайс', uz: 'Ulgurji narxlar', en: 'Wholesale prices', zh: '批发价格清单' },
  registration: { email: 'registration@inso.uz', ru: 'Регистрация', uz: 'Roʻyxatdan oʻtkazish', en: 'Registration', zh: '药品注册与合规' },
  safety: { email: 'info@inso.uz', ru: 'Фармаконадзор', uz: 'Farmakonazorat', en: 'Drug safety', zh: '药物警戒与安全' },
};

export type InquiryTopic = keyof typeof inquiryTopics;
