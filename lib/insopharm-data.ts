export type Language = 'ru' | 'uz' | 'en' | 'zh';

export type SubbrandId = 'inom' | 'hb' | 'lps' | 'greenwell' | 'nl' | 'service';

export interface SubbrandItem {
  id: SubbrandId;
  name: string;
  shortCode: string;
  badge: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  skuCountLabel: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  directionType: 'distribution' | 'promotion' | 'services';
  description: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  therapeuticAreas: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  flagshipProducts: {
    ru: string[];
    uz: string[];
    en: string[];
    zh?: string[];
  };
  accentColor: 'indigo' | 'teal' | 'sky' | 'emerald' | 'cobalt' | 'amber';
}

export interface CoreValueItem {
  id: string;
  number: string;
  isFoundation?: boolean;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  keywords: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  description: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  weDo: {
    ru: string[];
    uz: string[];
    en: string[];
    zh?: string[];
  };
  weDont: {
    ru: string[];
    uz: string[];
    en: string[];
    zh?: string[];
  };
}

export interface ProductItem {
  id: string;
  subbrandId?: SubbrandId;
  subbrandLabel?: string;
  name: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  inn: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  categoryId: 'cardiology' | 'neurology' | 'gastro' | 'antibiotics' | 'infusion' | 'vitamins';
  categoryLabel: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  dispenseType: 'Rx' | 'OTC';
  dosageForm: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  dosageStrength: string;
  packSize: string;
  country: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  standard: 'EU GMP' | 'WHO GMP' | 'ISO 13485';
  regNumber: string;
  storageTemp: string;
  indications: {
    ru: string;
    uz: string;
    en: string;
    zh?: string;
  };
  packageColor: 'cobalt' | 'teal' | 'emerald' | 'indigo' | 'rose' | 'amber';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  description: {
    ru: string;
    uz: string;
    en: string;
  };
  deliverables: {
    ru: string[];
    uz: string[];
    en: string[];
  };
  metric: {
    ru: string;
    uz: string;
    en: string;
  };
}

export interface ResearchItem {
  id: string;
  type: 'research' | 'clinical' | 'education';
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  subtitle: {
    ru: string;
    uz: string;
    en: string;
  };
  articlesCount: number;
  latestTopic: {
    ru: string;
    uz: string;
    en: string;
  };
  date: string;
  summary: {
    ru: string;
    uz: string;
    en: string;
  };
}

export const SUBBRANDS: SubbrandItem[] = [
  {
    id: 'inom',
    name: 'INSO Inom',
    shortCode: 'INOM',
    badge: {
      ru: '21 позиция · Rx / OTC и БАД',
      uz: '21 pozitsiya · Rx / OTC va BFQ',
      en: '21 SKUs · Hospital, Retail & Supplements',
    },
    skuCountLabel: {
      ru: '21 позиция',
      uz: '21 pozitsiya',
      en: '21 products',
    },
    directionType: 'promotion',
    description: {
      ru: 'Препараты для стационаров и аптек — антибиотики, гепатопротекторы, гемостатики и обезболивающие — и линейка БАДов для женского здоровья, урологии и пищеварения.',
      uz: 'Shifoxonalar va dorixonalar uchun preparatlar — antibiotiklar, gepatoprotektorlar, gemostatiklar va ogʻriq qoldiruvchi vositalar — hamda ayollar salomatligi, urologiya va hazm qilish uchun biofaol qoʻshimchalar.',
      en: 'Medicines for hospitals and pharmacies — antibiotics, hepatoprotectors, haemostatics and analgesics — plus a line of supplements for women’s health, urology and digestion.',
    },
    therapeuticAreas: {
      ru: 'Антибиотики, гепатология, гемостаз, обезболивание; БАД — женское здоровье, урология, пищеварение',
      uz: 'Antibiotiklar, gepatologiya, gemostaz, ogʻriq qoldirish; BFQ — ayollar salomatligi, urologiya, hazm qilish',
      en: 'Antibiotics, hepatology, haemostasis, analgesia; Supplements — women’s health, urology, digestion',
    },
    flagshipProducts: {
      ru: ['Прометей', 'Dopoksel', 'Траксаден', 'Инокейр', 'Метифол'],
      uz: ['Prometey', 'Dopoksel', 'Traksaden', 'Inokeyr', 'Metifol'],
      en: ['Prometey', 'Dopoksel', 'Traksaden', 'Inocare', 'Metifol'],
    },
    accentColor: 'indigo',
  },
  {
    id: 'hb',
    name: 'INSO Health Care Business',
    shortCode: 'HB',
    badge: {
      ru: '19 препаратов · Стационары',
      uz: '19 preparat · Shifoxonalar',
      en: '19 SKUs · Hospital Care',
    },
    skuCountLabel: {
      ru: '19 препаратов',
      uz: '19 preparat',
      en: '19 medicines',
    },
    directionType: 'promotion',
    description: {
      ru: 'Кардионеврология и парентеральное питание: аминокислоты, инфузии, антибиотики и анестезия для стационаров.',
      uz: 'Kardionevrologiya va parenteral oziqlantirish: shifoxonalar uchun aminokislotalar, infuziyalar, antibiotiklar va anesteziya vositalari.',
      en: 'Cardio-neurology and parenteral nutrition: amino acids, infusions, antibiotics and anaesthesia for hospitals.',
    },
    therapeuticAreas: {
      ru: 'Кардионеврология, парентеральное питание, антибиотики, анестезиология',
      uz: 'Kardionevrologiya, parenteral oziqlantirish, antibiotiklar, anesteziologiya',
      en: 'Cardio-neurology, parenteral nutrition, antibiotics, anaesthesiology',
    },
    flagshipProducts: {
      ru: ['Крефос', 'Ламонил', 'Нирфол', 'Нирмин 10 Плюс', 'Перобакт'],
      uz: ['Krefos', 'Lamonil', 'Nirfol', 'Nirmin 10 Plyus', 'Perobakt'],
      en: ['Krefos', 'Lamonil', 'Nirfol', 'Nirmin 10 Plus', 'Perobact'],
    },
    accentColor: 'teal',
  },
  {
    id: 'lps',
    name: 'Life Pharm Systems',
    shortCode: 'LPS',
    badge: {
      ru: '10 препаратов · Госпитальный сегмент',
      uz: '10 preparat · Gospital segment',
      en: '10 SKUs · Intensive & Hospital Care',
    },
    skuCountLabel: {
      ru: '10 препаратов',
      uz: '10 preparat',
      en: '10 medicines',
    },
    directionType: 'promotion',
    description: {
      ru: 'Госпитальные препараты для кардиологии, неврологии, реанимации и антибиотикотерапии — инъекции и инфузии от производителей из Узбекистана, Индии и Китая.',
      uz: 'Kardiologiya, nevrologiya, reanimatsiya va antibiotikoterapiya uchun shifoxona preparatlari — Oʻzbekiston, Hindiston va Xitoy ishlab chiqaruvchilarining inyeksiya va infuziyalari.',
      en: 'Hospital medicines for cardiology, neurology, intensive care and antibiotic therapy — injections and infusions from manufacturers in Uzbekistan, India and China.',
    },
    therapeuticAreas: {
      ru: 'Кардиология, неврология, реанимация, антибиотики, гематология',
      uz: 'Kardiologiya, nevrologiya, reanimatsiya, antibiotiklar, gematologiya',
      en: 'Cardiology, neurology, intensive care, antibiotics, haematology',
    },
    flagshipProducts: {
      ru: ['Креатон-Био', 'Цефтрибактам', 'Зинцинат', 'Мидоказон', 'Сидера'],
      uz: ['Kreaton-Bio', 'Seftribaktam', 'Zinsinat', 'Midokazon', 'Sidera'],
      en: ['Kreaton-Bio', 'Ceftribactam', 'Zincinat', 'Midocazon', 'Sidera'],
    },
    accentColor: 'sky',
  },
  {
    id: 'greenwell',
    name: 'Greenwell',
    shortCode: 'GREENWELL',
    badge: {
      ru: '13 БАДов · Vitaprotein® США',
      uz: '13 BFQ · Vitaprotein® AQSh',
      en: '13 Supplements · US Vitaprotein®',
    },
    skuCountLabel: {
      ru: '13 БАДов',
      uz: '13 ta BFQ',
      en: '13 supplements',
    },
    directionType: 'distribution',
    description: {
      ru: 'Дистрибуция американского бренда Greenwell: 13 биоактивных добавок нового поколения с технологией целевой доставки Vitaprotein® для поддержки энергии, иммунитета, сердца, суставов, сна и красоты.',
      uz: 'Amerika brendi Greenwell distribyutsiyasi: energiya, immunitet, yurak, boʻgʻimlar, uyqu va goʻzallikni qoʻllab-quvvatlash uchun Vitaprotein® maqsadli yetkazish texnologiyasiga ega 13 ta yangi avlod biofaol qoʻshimchasi.',
      en: 'Distribution of the US brand Greenwell: 13 new-generation supplements with Vitaprotein® targeted-delivery technology to support energy, immunity, heart, joints, sleep and beauty.',
    },
    therapeuticAreas: {
      ru: 'Энергия, иммунитет, сердце и сосуды, суставы, сон и антистресс, кожа и волосы',
      uz: 'Energiya, immunitet, yurak va qon tomirlar, boʻgʻimlar, uyqu va antistress, teri va sochlar',
      en: 'Energy, immunity, heart & vessels, joints, sleep & anti-stress, skin & hair',
    },
    flagshipProducts: {
      ru: [
        'Coenzyme Q10',
        'Omega 3',
        'Magnesium + B',
        'Vitamin D3',
        'Relax & Sleep VP',
      ],
      uz: [
        'Coenzyme Q10',
        'Omega 3',
        'Magnesium + B',
        'Vitamin D3',
        'Relax & Sleep VP',
      ],
      en: [
        'Coenzyme Q10',
        'Omega 3',
        'Magnesium + B',
        'Vitamin D3',
        'Relax & Sleep VP',
      ],
    },
    accentColor: 'emerald',
  },
  {
    id: 'nl',
    name: 'Neues Leben',
    shortCode: 'NL',
    badge: {
      ru: '12 препаратов · Склад 10 000 м² GDP',
      uz: '12 preparat · 10 000 m² GDP ombor',
      en: '12 SKUs · 10,000 m² GDP Hub',
    },
    skuCountLabel: {
      ru: '12 препаратов',
      uz: '12 preparat',
      en: '12 medicines',
    },
    directionType: 'distribution',
    description: {
      ru: 'Дистрибуция по прямым контрактам с зарубежными производителями: склад 10 000 м² по стандартам GDP, рефрижераторный автопарк, 13 региональных офисов и регистрация препаратов под ключ.',
      uz: 'Xorijiy ishlab chiqaruvchilar bilan toʻgʻridan-toʻgʻri shartnomalar asosida distribyutsiya: GDP standartlariga mos 10 000 m² ombor, refrijerator avtoparki, 13 ta hududiy ofis va preparatlarni roʻyxatdan oʻtkazish xizmati.',
      en: 'Distribution under direct contracts with foreign manufacturers: a 10,000 m² GDP-compliant warehouse, a refrigerated fleet, 13 regional offices and turnkey product registration.',
    },
    therapeuticAreas: {
      ru: 'Кардиология, неврология и вестибулярные расстройства, антибиотики, обезболивание, офтальмология; БАД — сон и стресс',
      uz: 'Kardiologiya, nevrologiya va vestibulyar buzilishlar, antibiotiklar, ogʻriq qoldirish, oftalmologiya; BFQ — uyqu va stress',
      en: 'Cardiology, neurology & vestibular care, antibiotics, analgesia, ophthalmology; Supplements — sleep & stress',
    },
    flagshipProducts: {
      ru: ['Вазолизин', 'Дифоскор', 'Бетокар', 'Квадрамокс', 'КМА-SEEM'],
      uz: ['Vazolizin', 'Difoskor', 'Betokar', 'Kvadramoks', 'KMA-SEEM'],
      en: ['Vazolizin', 'Difoscor', 'Betocar', 'Quadramox', 'KMA-SEEM'],
    },
    accentColor: 'cobalt',
  },
  {
    id: 'service',
    name: 'INSO Service',
    shortCode: 'SERVICE',
    badge: {
      ru: 'Сервис и консалтинг под ключ',
      uz: 'Servis va konsalting',
      en: 'Turnkey Services & Consulting',
    },
    skuCountLabel: {
      ru: 'Сервис · Консалтинг',
      uz: 'Servis · Konsalting',
      en: 'Services · Consulting',
    },
    directionType: 'services',
    description: {
      ru: 'Сервис и консалтинг: находит молекулы, сам оформляет все документы и регистрацию и передаёт партнёрам готовый продукт.',
      uz: 'Servis va konsalting: molekulalarni topadi, barcha hujjatlar va roʻyxatdan oʻtkazishni oʻzi rasmiylashtiradi hamda hamkorlarga tayyor mahsulotni taqdim etadi.',
      en: 'Services and consulting: sources molecules, handles all paperwork and registration itself and delivers a ready product to partners.',
    },
    therapeuticAreas: {
      ru: 'Поиск молекул, регистрация ЛС / ИМН / БАД, сопровождение выхода на рынок ЦА',
      uz: 'Molekulalarni izlash, roʻyxatdan oʻtkazish, bozorga chiqishni toʻliq kuzatib borish',
      en: 'Molecule scouting, CTD registration, turnkey market entry in Central Asia',
    },
    flagshipProducts: {
      ru: ['Поиск молекул', 'CTD-Регистрация', 'Вывод на рынок под ключ'],
      uz: ['Molekulalarni izlash', 'CTD roʻyxatdan oʻtkazish', 'Bozorga olib chiqish'],
      en: ['Molecule Scouting', 'CTD Registration', 'Turnkey Market Entry'],
    },
    accentColor: 'amber',
  },
];

export const CORE_VALUES: CoreValueItem[] = [
  {
    id: 'trust',
    number: '01',
    isFoundation: true,
    title: {
      ru: 'Бережём доверие',
      uz: 'Ishonchni asraymiz',
      en: 'We safeguard trust',
      zh: '坚守信任',
    },
    summary: {
      ru: 'Открыто говорим о рисках для качества и безопасности.',
      uz: 'Sifat va xavfsizlik bilan bogʻliq xatarlarni ochiq aytamiz.',
      en: 'We speak openly about risks to quality and safety.',
      zh: '直面质量与安全风险，诚实透明沟通。',
    },
    keywords: {
      ru: 'ЧЕСТНОСТЬ · КАЧЕСТВО · ФУНДАМЕНТ',
      uz: 'HALOLLIK · SIFAT · FUNDAMENT',
      en: 'INTEGRITY · QUALITY · FOUNDATION',
    },
    description: {
      ru: 'Говорим правду и не жертвуем качеством, безопасностью и этикой ради скорости или прибыли — за каждым препаратом стоит пациент.',
      uz: 'Rostini aytamiz va sifat, xavfsizlik hamda axloqni tezlik yoki foyda uchun qurbon qilmaymiz — har bir dori ortida bemor turadi.',
      en: 'We tell the truth and never trade quality, safety or ethics for speed or profit — behind every medicine is a patient.',
    },
    weDo: {
      ru: [
        'Сразу сообщаем о проблеме — даже если ошиблись сами',
        'Соблюдаем требования к качеству и безопасности на каждом этапе — от выбора производителя до аптеки',
        'Даём врачам и партнёрам только достоверную информацию о препаратах',
      ],
      uz: [
        'Muammo haqida darhol xabar beramiz — hatto oʻzimiz xato qilgan boʻlsak ham',
        'Ishlab chiqaruvchini tanlashdan dorixonagacha har bir bosqichda sifat va xavfsizlik talablariga rioya qilamiz',
        'Shifokorlar va hamkorlarga preparatlar haqida faqat ishonchli maʼlumot beramiz',
      ],
      en: [
        'Report issues immediately — even when the mistake is ours',
        'Uphold quality and safety standards at every stage from manufacturer selection to pharmacy shelf',
        'Provide physicians and partners only verified, accurate clinical information',
      ],
    },
    weDont: {
      ru: [
        'Не обещаем партнёру того, что не можем выполнить, ради сделки',
        'Не обходим правила ради плана, бонуса или скорости',
      ],
      uz: [
        'Bitim uchun hamkorga bajara olmaydigan narsamizni vaʼda qilmaymiz',
        'Reja, bonus yoki tezlik uchun qoidalarni chetlab oʻtmaymiz',
      ],
      en: [
        'Never promise a partner what we cannot deliver just to close a deal',
        'Never bypass compliance rules for targets, bonuses, or speed',
      ],
    },
  },
  {
    id: 'ownership',
    number: '02',
    title: {
      ru: 'Берём ответственность',
      uz: 'Masʼuliyatli ishlaymiz',
      en: 'We take ownership',
      zh: '勇于担当',
    },
    summary: {
      ru: 'Держим слово и заранее предупреждаем о задержках.',
      uz: 'Vaʼdamizni bajaramiz va kechikish haqida oldindan xabar beramiz.',
      en: 'We keep our word and flag delays early.',
      zh: '言出必行，遇事预先预警并对最终成果负责。',
    },
    keywords: {
      ru: 'НАДЁЖНОСТЬ · ОТВЕТСТВЕННОСТЬ',
      uz: 'ISHONCHLILIK · MASʼULIYAT',
      en: 'RELIABILITY · ACCOUNTABILITY',
    },
    description: {
      ru: 'Выполняем обещанное партнёрам и команде, не ищем оправданий и не перекладываем задачи на других.',
      uz: 'Hamkorlar va jamoaga bergan vaʼdamizni bajaramiz, bahona izlamaymiz va ishni boshqalarga yuklamaymiz.',
      en: 'We deliver on our promises to partners and colleagues — no excuses, no passing the buck.',
    },
    weDo: {
      ru: [
        'Называем срок и выполняем его; если срок под угрозой — предупреждаем заранее, а не в день дедлайна',
        'Фиксируем договорённости: кто, что и к какому сроку',
        'Берём на себя результат всей зоны, а не только «своей части»',
      ],
      uz: [
        'Muddatni aytamiz va bajaramiz; xavf tugʻilsa, dedlayn kuni emas, oldindan ogohlantiramiz',
        'Kelishuvlarni aniq qayd etamiz: kim, nima va qaysi muddatga',
        'Faqat «oʻz qismimiz» emas, butun yoʻnalish natijasini зиммаmizga olamiz',
      ],
      en: [
        'Commit to clear deadlines and meet them — flagging risks early, never on deadline day',
        'Document agreements clearly: who, what, and by when',
        'Own the end-to-end outcome, not just our narrow task',
      ],
    },
    weDont: {
      ru: [
        'Не ищем виноватых, пока задача не решена',
        'Не перекладываем ответственность на другой отдел',
      ],
      uz: [
        'Vazifa hal boʻlmaguncha aybdorlarni izlamaymiz',
        'Masʼuliyatni boshqa boʻlimga agʻdarmaymiz',
      ],
      en: [
        'Never look for someone to blame while a problem is still unsolved',
        'Never shift responsibility onto another department',
      ],
    },
  },
  {
    id: 'facts',
    number: '03',
    title: {
      ru: 'Опираемся на факты',
      uz: 'Dalillarga tayanamiz',
      en: 'We rely on facts',
      zh: '实事求是',
    },
    summary: {
      ru: 'Проверяем данные, прежде чем принять решение.',
      uz: 'Qaror qabul qilishdan oldin maʼlumotlarni tekshiramiz.',
      en: 'We check the evidence before making decisions.',
      zh: '以事实和数据为依据做出客观决策。',
    },
    keywords: {
      ru: 'ПРОФЕССИОНАЛИЗМ',
      uz: 'PROFESSIONALLIK',
      en: 'PROFESSIONALISM',
    },
    description: {
      ru: 'Знаем своё дело и смело отстаиваем позицию: решает аргумент, а не статус.',
      uz: 'Oʻz ishimizni puxta bilamiz va fikrimizni dadil himoya qilamiz: unvon emas, dalil hal qiladi.',
      en: 'We know our craft and stand our ground: the argument decides, not the rank.',
    },
    weDo: {
      ru: [
        'Приходим на обсуждение с цифрами и фактами, а не с мнениями',
        'Говорим «не согласен» вслух и с аргументами — в том числе руководителю',
        'Признаём, когда факты против нас, и меняем решение',
      ],
      uz: [
        'Muhokamaga shunchaki fikr bilan emas, raqam va dalillar bilan kelamiz',
        'Rahbarga ham asosli dalillar bilan ochiq fikr bildiramiz',
        'Dalillar bizga qarshi boʻlsa, tan olamiz va qarorni yangilaymiz',
      ],
      en: [
        'Bring data and verified facts to discussions rather than opinions',
        'Voice disagreement openly with arguments — including to leadership',
        'Acknowledge when facts prove us wrong and update our decision',
      ],
    },
    weDont: {
      ru: [
        'Не продавливаем решения должностью или стажем',
        'Не молчим на встрече, чтобы потом спорить в коридоре',
      ],
      uz: [
        'Qarorlarni lavozim yoki ish staji bilan oʻtkazmaymiz',
        'Yigʻilishda jim oʻtirib, keyin yoʻlakda bahslashmaymiz',
      ],
      en: [
        'Never force decisions through title or seniority',
        'Never stay silent in a meeting only to argue in the hallway afterwards',
      ],
    },
  },
  {
    id: 'drive',
    number: '04',
    title: {
      ru: 'Доводим до конца',
      uz: 'Oxirigacha yetkazamiz',
      en: 'We see it through',
      zh: '全力以赴',
    },
    summary: {
      ru: 'Сопровождаем задачу до результата, о котором договорились.',
      uz: 'Har bir ishni kelishilgan natijaga yetkazamiz.',
      en: 'We follow each task through to the agreed outcome.',
      zh: '紧扣既定目标推进到底，确保成果切实落地。',
    },
    keywords: {
      ru: 'ЦЕЛЕУСТРЕМЛЁННОСТЬ',
      uz: 'MAQSADGA INTILISH',
      en: 'DRIVE',
    },
    description: {
      ru: 'Действуем быстро, настойчиво идём к цели и не бросаем начатое на полпути.',
      uz: 'Tez harakat qilamiz, maqsad sari qatʼiyat bilan boramiz va boshlagan ishni yarim yoʻlda tashlamaymiz.',
      en: 'We move fast, pursue the goal with persistence and never leave work half-done.',
    },
    weDo: {
      ru: [
        'Принимаем решение, как только фактов достаточно, — не ждём идеальных условий',
        'Ставим измеримую цель и срок к каждой задаче',
        'Доводим проекты до результата, а не до отчёта',
      ],
      uz: [
        'Dalillar yetarli boʻlishi bilan qaror qabul qilamiz — ideal sharoitni kutmaymiz',
        'Har bir vazifaga oʻlchanadigan maqsad va muddat qoʻyamiz',
        'Loyihalarni hisobotgacha emas, aniq natijagacha yetkazamiz',
      ],
      en: [
        'Make decisions as soon as facts are sufficient without waiting for perfect conditions',
        'Set a measurable target and timeline for every initiative',
        'Drive projects to real market results, not just status reports',
      ],
    },
    weDont: {
      ru: [
        'Не бросаем начатое без явного решения остановиться',
        'Не жертвуем качеством ради скорости — см. «Бережём доверие»',
      ],
      uz: [
        'Aniq toʻxtatish qarorisiz boshlagan ishni tashlab qoʻymaymiz',
        'Tezlik deb sifatni qurbon qilmaymiz — «Ishonchni asraymiz» qoidasi ustuvor',
      ],
      en: [
        'Never abandon an initiative without an explicit decision to stop',
        'Never sacrifice quality for speed — "We safeguard trust" always comes first',
      ],
    },
  },
  {
    id: 'innovation',
    number: '05',
    title: {
      ru: 'Видим дальше',
      uz: 'Uzoqni koʻramiz',
      en: 'We look further',
      zh: '远见卓识',
    },
    summary: {
      ru: 'Ищем решения, которые понадобятся партнёрам завтра.',
      uz: 'Hamkorlarimizga ertaga kerak boʻladigan yechimlarni izlaymiz.',
      en: 'We look ahead to what our partners will need next.',
      zh: '提前洞察行业变革，探索长效创新的战略解法。',
    },
    keywords: {
      ru: 'ИННОВАЦИИ',
      uz: 'INNOVATSIYA',
      en: 'INNOVATION',
    },
    description: {
      ru: 'Смотрим дальше рынка и первыми внедряем новое — то, что работает на годы, а не на сезон.',
      uz: 'Bozordan bir qadam oldinda yuramiz va yangilikni birinchilardan boʻlib joriy qilamiz — bir mavsumga emas, yillarga moʻljallab.',
      en: 'We look beyond the market and are first to put new ideas to work — built for years, not for a season.',
    },
    weDo: {
      ru: [
        'Ищем новые препараты, рынки и партнёров раньше конкурентов',
        'Пробуем новое малыми шагами: пилот, замер, масштаб',
        'Внедряем цифровые инструменты и ИИ там, где они экономят людям время',
      ],
      uz: [
        'Yangi preparatlar, bozorlar va hamkorlarni raqobatchilardan oldin topamiz',
        'Yangilikni kichik qadamlar bilan sinaymiz: pilot, oʻlchov, masshtab',
        'Insonlar vaqtini tejaydigan joyda raqamli vositalarni joriy etamiz',
      ],
      en: [
        'Scout new molecules, markets, and partners ahead of the competition',
        'Test innovations iteratively: pilot, measure, scale',
        'Adopt digital tools where they save real time for our teams and partners',
      ],
    },
    weDont: {
      ru: [
        'Не внедряем новое ради моды — только то, что работает на годы вперёд',
        'Не наказываем за честную неудачу эксперимента',
      ],
      uz: [
        'Urfdagi moda uchun emas, yillar davomida ishlaydigan yangilikni joriy qilamiz',
        'Tajribadagi halol xato uchun jazolamaymiz',
      ],
      en: [
        'Never adopt trends for hype — only solutions built to last for years',
        'Never penalize an honest experimental pilot that didn’t pan out',
      ],
    },
  },
  {
    id: 'people',
    number: '06',
    title: {
      ru: 'Ценим людей',
      uz: 'Insonni qadrlaymiz',
      en: 'We value people',
      zh: '以人为本',
    },
    summary: {
      ru: 'Слушаем коллег и поддерживаем их развитие.',
      uz: 'Hamkasblarimizni tinglaymiz va ularning rivojlanishini qoʻllab-quvvatlaymiz.',
      en: 'We listen to colleagues and support their growth.',
      zh: '真诚倾听每一位伙伴，支持团队的持续发展。',
    },
    keywords: {
      ru: 'УВАЖЕНИЕ',
      uz: 'HURMAT',
      en: 'RESPECT',
    },
    description: {
      ru: 'Ведём личным примером, справедливы и человечны: сотрудник для нас — партнёр, а не ресурс.',
      uz: 'Oʻz namunamiz bilan yetaklaymiz, adolatli va insonparvarmiz: xodim biz uchun resurs emas, hamkor.',
      en: 'We lead by example and treat people fairly and humanely: our colleagues are partners, not resources.',
    },
    weDo: {
      ru: [
        'Объясняем решения, а не только объявляем их',
        'Оцениваем людей по одинаковым и понятным правилам',
        'Регулярно даём обратную связь и признаём вклад каждого',
      ],
      uz: [
        'Qarorlarni shunchaki eʼlon qilmaymiz, balki sababini tushuntiramiz',
        'Insonlarni yagona va tushunarli qoidalar asosida baholaymiz',
        'Muntazam fikr-mulohaza beramiz va har kimning hissasini eʼtirof etamiz',
      ],
      en: [
        'Explain the rationale behind decisions rather than merely announcing them',
        'Evaluate colleagues by transparent, consistent standards',
        'Give regular constructive feedback and recognize every person’s contribution',
      ],
    },
    weDont: {
      ru: [
        'Не обсуждаем людей за спиной — говорим с ними напрямую',
        'Не относимся к людям как к заменимому ресурсу',
      ],
      uz: [
        'Insonlarni ortidan muhokama qilmaymiz — toʻgʻridan-toʻgʻri gaplashamiz',
        'Xodimlarga almashtiriladigan resurs sifatida qaramaymiz',
      ],
      en: [
        'Never talk about colleagues behind their backs — we speak directly and respectfully',
        'Never treat people as replaceable resources',
      ],
    },
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prometey-inom',
    subbrandId: 'inom',
    subbrandLabel: 'INSO Inom',
    name: {
      ru: 'Прометей',
      uz: 'Prometey',
      en: 'Prometey',
    },
    inn: {
      ru: 'Адеметионин (гепатопротектор)',
      uz: 'Ademetionin (gepatoprotektor)',
      en: 'Ademetionine (Hepatoprotector)',
    },
    categoryId: 'gastro',
    categoryLabel: {
      ru: 'Гастроэнтерология',
      uz: 'Gastroenterologiya',
      en: 'Gastroenterology',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Лиофилизат для раствора для в/в и в/м введения',
      uz: 'Vena va mushak ichiga yuborish uchun liofilizat',
      en: 'Lyophilisate for IV/IM injection solution',
    },
    dosageStrength: '400 мг / 5 мл',
    packSize: '№5 флаконов + растворитель',
    country: {
      ru: 'Индия / Италия',
      uz: 'Hindiston / Italiya',
      en: 'India / Italy',
    },
    standard: 'EU GMP',
    regNumber: 'DV/X 09412/03/25',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Внутрипеченочный холестаз при прецирротических и цирротических состояниях, токсические и лекарственные поражения печени (флагман INSO Inom).',
      uz: 'Jigar ichidagi xolestaz, surunkali gepatit va toksik jigar shikastlanishlarida gepatoprotektor vosita (INSO Inom flagmani).',
      en: 'Intrahepatic cholestasis, chronic hepatitis, and toxic liver injury support (INSO Inom flagship product).',
    },
    packageColor: 'indigo',
  },
  {
    id: 'krefos-hb',
    subbrandId: 'hb',
    subbrandLabel: 'INSO HB',
    name: {
      ru: 'Крефос',
      uz: 'Krefos',
      en: 'Krefos',
    },
    inn: {
      ru: 'Фосфокреатин натрия',
      uz: 'Fosfokreatin natriy',
      en: 'Creatine Phosphate Sodium',
    },
    categoryId: 'cardiology',
    categoryLabel: {
      ru: 'Кардиология',
      uz: 'Kardiologiya',
      en: 'Cardiology',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Порошок для приготовления раствора для инфузий',
      uz: 'Infuziya uchun eritma tayyorlash kukuni',
      en: 'Powder for solution for infusion',
    },
    dosageStrength: '1.0 г',
    packSize: '№1 флакон',
    country: {
      ru: 'Китай / ЕС',
      uz: 'Xitoy / YI',
      en: 'China / EU',
    },
    standard: 'WHO GMP',
    regNumber: 'DV/X 08920/07/25',
    storageTemp: '+2°C ... +25°C',
    indications: {
      ru: 'Кардиопротектор и метаболическая защита миокарда при остром инфаркте миокарда, хронической сердечной недостаточности и ишемии (флагман INSO HB).',
      uz: 'Oʻtkir miokard infarkti va surunkali yurak yetishmovchiligida miokardni metabolik himoya qilish (INSO HB flagmani).',
      en: 'Cardioprotective metabolic support in acute myocardial infarction, chronic heart failure, and intraoperative ischemia (INSO HB flagship).',
    },
    packageColor: 'teal',
  },
  {
    id: 'kreaton-bio-lps',
    subbrandId: 'lps',
    subbrandLabel: 'LPS',
    name: {
      ru: 'Креатон-Био',
      uz: 'Kreaton-Bio',
      en: 'Kreaton-Bio',
    },
    inn: {
      ru: 'Цитиколин + Нейрометаболический комплекс',
      uz: 'Sitikolin + Neyrometabolik majmua',
      en: 'Citicoline Neuro-Metabolic Complex',
    },
    categoryId: 'neurology',
    categoryLabel: {
      ru: 'Неврология',
      uz: 'Nevrologiya',
      en: 'Neurology',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Раствор для в/в и в/м инъекций',
      uz: 'Vena va mushak ichiga yuborish uchun eritma',
      en: 'Solution for IV and IM injection',
    },
    dosageStrength: '1000 мг / 4 мл',
    packSize: '№5 ампул',
    country: {
      ru: 'Узбекистан / Индия',
      uz: 'Oʻzbekiston / Hindiston',
      en: 'Uzbekistan / India',
    },
    standard: 'WHO GMP',
    regNumber: 'DV/X 09104/11/25',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Госпитальная нейропротекция в остром периоде ишемического инсульта, реанимации и восстановительном периоде после ЧМТ (флагман Life Pharm Systems).',
      uz: 'Ishemik insultning oʻtkir davri va reanimatsiyada neyroprotektiv terapiya (Life Pharm Systems flagmani).',
      en: 'Hospital neuroprotection in acute ischemic stroke, intensive care, and traumatic brain injury recovery (Life Pharm Systems flagship).',
    },
    packageColor: 'cobalt',
  },
  {
    id: 'coenzyme-q10-greenwell',
    subbrandId: 'greenwell',
    subbrandLabel: 'Greenwell',
    name: {
      ru: 'Greenwell Coenzyme Q10 Vitaprotein®',
      uz: 'Greenwell Coenzyme Q10 Vitaprotein®',
      en: 'Greenwell Coenzyme Q10 Vitaprotein®',
    },
    inn: {
      ru: 'Коэнзим Q10 (Убихинон) + технология Vitaprotein®',
      uz: 'Koenzim Q10 (Ubixinon) + Vitaprotein® texnologiyasi',
      en: 'Coenzyme Q10 + Vitaprotein® Targeted Delivery',
    },
    categoryId: 'vitamins',
    categoryLabel: {
      ru: 'Витамины и метаболизм',
      uz: 'Vitaminlar va metabolizm',
      en: 'Vitamins & Metabolism',
    },
    dispenseType: 'OTC',
    dosageForm: {
      ru: 'Капсулы нового поколения с целевой доставкой',
      uz: 'Maqsadli yetkazish texnologiyasiga ega kapsulalar',
      en: 'Targeted-delivery bio-active capsules',
    },
    dosageStrength: '100 мг VP',
    packSize: '№60 капсул',
    country: {
      ru: 'США / Польша',
      uz: 'AQSh / Polsha',
      en: 'USA / Poland',
    },
    standard: 'EU GMP',
    regNumber: 'BF/X 02190/04/26',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Поддержка клеточной энергии миокарда, антиоксидантная защита сосудов и повышение жизненного тонуса с технологией целевой доставки Vitaprotein® (флагман Greenwell).',
      uz: 'Yurak-qon tomir tizimi va hujayra energiyasini qoʻllab-quvvatlash uchun Vitaprotein® texnologiyali biofaol qoʻshimcha (Greenwell flagmani).',
      en: 'Cellular myocardial energy support, vascular antioxidant protection, and vitality with Vitaprotein® targeted delivery (Greenwell flagship).',
    },
    packageColor: 'emerald',
  },
  {
    id: 'vazolizin-nl',
    subbrandId: 'nl',
    subbrandLabel: 'Neues Leben',
    name: {
      ru: 'Вазолизин',
      uz: 'Vazolizin',
      en: 'Vazolizin',
    },
    inn: {
      ru: 'L-лизина эсцинат',
      uz: 'L-lizin essinat',
      en: 'L-Lysine Aescinat',
    },
    categoryId: 'neurology',
    categoryLabel: {
      ru: 'Неврология',
      uz: 'Nevrologiya',
      en: 'Neurology',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Концентрат для приготовления раствора для в/в введения',
      uz: 'Vena ichiga yuborish uchun eritma konsentrati',
      en: 'Concentrate for solution for IV administration',
    },
    dosageStrength: '1 мг / мл (5 мл)',
    packSize: '№10 ампул',
    country: {
      ru: 'Германия / ЕС',
      uz: 'Germaniya / YI',
      en: 'Germany / EU',
    },
    standard: 'EU GMP',
    regNumber: 'DV/X 08412/04/25',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Противоотечная и венотонизирующая терапия при посттравматических и послеоперационных отеках головного и спинного мозга (флагман Neues Leben).',
      uz: 'Bosh va orqa miya jarohatдан keyingi shishlarini bartaraf etish va venotonik terapiya (Neues Leben flagmani).',
      en: 'Anti-edematous and venotonic therapy for post-traumatic and post-operative cerebral and spinal edema (Neues Leben flagship).',
    },
    packageColor: 'rose',
  },
  {
    id: 'ceftribaktam-lps',
    subbrandId: 'lps',
    subbrandLabel: 'LPS',
    name: {
      ru: 'Цефтрибактам',
      uz: 'Seftribaktam',
      en: 'Ceftribactam',
    },
    inn: {
      ru: 'Цефтриаксон + Сульбактам',
      uz: 'Seftriakson + Sulbaktam',
      en: 'Ceftriaxone + Sulbactam',
    },
    categoryId: 'antibiotics',
    categoryLabel: {
      ru: 'Антибактериальные',
      uz: 'Antibakterial vositalar',
      en: 'Antibacterials',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Порошок для приготовления раствора для инъекций',
      uz: 'Inyeksiya uchun eritma tayyorlash kukuni',
      en: 'Powder for solution for injection',
    },
    dosageStrength: '1000 мг + 500 мг',
    packSize: '№1 флакон',
    country: {
      ru: 'Индия',
      uz: 'Hindiston',
      en: 'India',
    },
    standard: 'WHO GMP',
    regNumber: 'DV/X 06891/09/25',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Тяжелые госпитальные инфекции дыхательных и мочевыводящих путей, абдоминальные и послеоперационные инфекции, вызванные бета-лактамазопродуцирующими штаммами (флагман LPS).',
      uz: 'Yuqori va quyi nafas yoʻllari, siydik chiqarish yoʻllari ogʻir bakterial infeksiyalari hamda jarrohlik profilaktikasi (LPS flagmani).',
      en: 'Severe hospital bacterial infections of the respiratory and urinary tracts caused by beta-lactamase-producing pathogens (LPS flagship).',
    },
    packageColor: 'indigo',
  },
  {
    id: 'nirmin-10-plus-hb',
    subbrandId: 'hb',
    subbrandLabel: 'INSO HB',
    name: {
      ru: 'Нирмин 10 Плюс',
      uz: 'Nirmin 10 Plyus',
      en: 'Nirmin 10 Plus',
    },
    inn: {
      ru: 'Комплекс L-аминокислот для парентерального питания',
      uz: 'Parenteral oziqlantirish uchun L-aminokislotalar majmuasi',
      en: 'Balanced L-Amino Acid Solution for Parenteral Nutrition',
    },
    categoryId: 'infusion',
    categoryLabel: {
      ru: 'Инфузионная терапия',
      uz: 'Infuzion terapiya',
      en: 'Infusion Therapy',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Раствор для инфузий 10%',
      uz: 'Infuziya uchun steril eritma 10%',
      en: '10% Solution for intravenous infusion',
    },
    dosageStrength: '10% / 250 мл',
    packSize: '№1 флакон',
    country: {
      ru: 'Индия / Китай',
      uz: 'Hindiston / Xitoy',
      en: 'India / China',
    },
    standard: 'WHO GMP',
    regNumber: 'DV/X 08219/06/25',
    storageTemp: '+15°C ... +25°C (защита от света)',
    indications: {
      ru: 'Парентеральное белковое питание в интенсивной терапии, хирургии и реанимации при катаболических состояниях (флагман INSO Health Care Business).',
      uz: 'Reanimatsiya va intensiv terapiyada parenteral oqsilli oziqlantirish (INSO Health Care Business flagmani).',
      en: 'Parenteral amino acid nutrition in intensive care, post-surgical recovery, and hypercatabolic states (INSO HB flagship).',
    },
    packageColor: 'cobalt',
  },
  {
    id: 'difoskor-nl',
    subbrandId: 'nl',
    subbrandLabel: 'Neues Leben',
    name: {
      ru: 'Дифоскор',
      uz: 'Difoskor',
      en: 'Difoskor',
    },
    inn: {
      ru: 'Кардиометаболический и антиангинальный комплекс',
      uz: 'Kardiometabolik va antianginal vosita',
      en: 'Cardiometabolic Myocardial Cytoprotector',
    },
    categoryId: 'cardiology',
    categoryLabel: {
      ru: 'Кардиология',
      uz: 'Kardiologiya',
      en: 'Cardiology',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Раствор для инъекций / Таблетки',
      uz: 'Inyeksiya uchun eritma / Tabletkalar',
      en: 'Solution for injection / Film-coated tablets',
    },
    dosageStrength: '500 мг / 5 мл',
    packSize: '№10 ампул',
    country: {
      ru: 'Германия / Польша',
      uz: 'Germaniya / Polsha',
      en: 'Germany / Poland',
    },
    standard: 'EU GMP',
    regNumber: 'DV/X 09018/12/25',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Комплексная терапия ишемической болезни сердца, хронической сердечной недостаточности и дисциркуляторной энцефалопатии (флагман Neues Leben).',
      uz: 'Yurak ishemik kasalligi va surunkali yurak yetishmovchiligining kompleks terapiyasi (Neues Leben flagmani).',
      en: 'Comprehensive therapy of ischemic heart disease, chronic heart failure, and vascular encephalopathy (Neues Leben flagship).',
    },
    packageColor: 'amber',
  },
  {
    id: 'traksaden-inom',
    subbrandId: 'inom',
    subbrandLabel: 'INSO Inom',
    name: {
      ru: 'Траксаден',
      uz: 'Traksaden',
      en: 'Traksaden',
    },
    inn: {
      ru: 'Транексамовая кислота',
      uz: 'Traneksam kislotasi',
      en: 'Tranexamic Acid',
    },
    categoryId: 'infusion',
    categoryLabel: {
      ru: 'Инфузионная терапия',
      uz: 'Infuzion terapiya',
      en: 'Infusion Therapy',
    },
    dispenseType: 'Rx',
    dosageForm: {
      ru: 'Раствор для внутривенного введения',
      uz: 'Vena ichiga yuborish uchun eritma',
      en: 'Solution for intravenous injection',
    },
    dosageStrength: '500 мг / 5 мл',
    packSize: '№5 ампул',
    country: {
      ru: 'Индия',
      uz: 'Hindiston',
      en: 'India',
    },
    standard: 'WHO GMP',
    regNumber: 'DV/X 09341/05/25',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Антифибринолитическое гемостатическое средство для профилактики и остановки кровотечений в хирургии, акушерстве и гинекологии (флагман INSO Inom).',
      uz: 'Jarrohlik, akusherlik va ginekologiyada qon ketishini toʻxtatish va oldini olish uchun gemostatik vosita (INSO Inom flagmani).',
      en: 'Antifibrinolytic haemostatic agent for surgical, obstetric, and trauma bleeding control (INSO Inom flagship).',
    },
    packageColor: 'rose',
  },
  {
    id: 'relax-sleep-vp-greenwell',
    subbrandId: 'greenwell',
    subbrandLabel: 'Greenwell',
    name: {
      ru: 'Greenwell Relax & Sleep VP',
      uz: 'Greenwell Relax & Sleep VP',
      en: 'Greenwell Relax & Sleep VP',
    },
    inn: {
      ru: 'Магний + L-Теанин + Витамин B6 (Vitaprotein®)',
      uz: 'Magniy + L-Teanin + Vitamin B6 (Vitaprotein®)',
      en: 'Magnesium + L-Theanine + B6 (Vitaprotein®)',
    },
    categoryId: 'vitamins',
    categoryLabel: {
      ru: 'Витамины и метаболизм',
      uz: 'Vitaminlar va metabolizm',
      en: 'Vitamins & Metabolism',
    },
    dispenseType: 'OTC',
    dosageForm: {
      ru: 'Капсулы с целевой доставкой Vitaprotein®',
      uz: 'Vitaprotein® maqsadli yetkazish kapsulalari',
      en: 'Vitaprotein® targeted-delivery capsules',
    },
    dosageStrength: '400 мг комплекс',
    packSize: '№60 капсул',
    country: {
      ru: 'США',
      uz: 'AQSh',
      en: 'USA',
    },
    standard: 'EU GMP',
    regNumber: 'BF/X 02214/05/26',
    storageTemp: '+15°C ... +25°C',
    indications: {
      ru: 'Снижение эмоционального напряжения, восстановление физиологического ритма сна и защита нервной системы от стресса (флагман Greenwell).',
      uz: 'Asab tizimini tinchlantirish, stressni kamaytirish va sogʻlom uyqu ritmini tiklash (Greenwell flagmani).',
      en: 'Stress resilience, nervous system recovery, and healthy circadian sleep support (Greenwell flagship).',
    },
    packageColor: 'teal',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'market-analysis',
    number: '01',
    title: {
      ru: 'Анализ рынка и стратегия выхода',
      uz: 'Bozor tahlili va kirish strategiyasi',
      en: 'Market Intelligence & Entry Strategy',
    },
    description: {
      ru: 'Оценка емкости фармрынка Узбекистана и стран Центральной Азии, конкурентный и ценовой аудит, подбор высокомаржинальных ниш для лонча.',
      uz: 'O‘zbekiston va Markaziy Osiyo farmatsevtika bozori sig‘imini baholash, raqobatchilar va narxlar auditi.',
      en: 'Comprehensive sizing of Uzbekistan & Central Asian pharma markets, competitive pricing audits, and launch roadmaps.',
    },
    deliverables: {
      ru: ['Аудит нозологий и МНН', 'Прогноз продаж на 3 года', 'Расчет референтного ценообразования'],
      uz: ['MNN va nozologiyalar auditi', '3 yillik savdo prognozi', 'Referent narxlarni hisoblash'],
      en: ['INN & therapeutic niche audit', '3-year sales forecasting', 'Reference pricing calculation'],
    },
    metric: {
      ru: 'INSO Service · Консалтинг',
      uz: 'INSO Service · Konsalting',
      en: 'INSO Service · Consulting',
    },
  },
  {
    id: 'molecule-sourcing',
    number: '02',
    title: {
      ru: 'Поиск молекул и GMP-производителей',
      uz: 'Molekulalar va GMP-zavodlarni izlash',
      en: 'Molecule Sourcing & Contract Manufacturing',
    },
    description: {
      ru: 'INSO Service: находим перспективные молекулы, дженерики и БАД среди 25+ проверенных производителей из 6 стран (Германия, Польша, Южная Корея, Индия, Китай, Узбекистан).',
      uz: 'INSO Service: 6 mamlakatdagi 25+ xalqaro GMP ishlab chiqaruvchilari orasidan istiqbolli molekulalar va preparatlarni topamiz.',
      en: 'INSO Service: molecule scouting and contract negotiations across 25+ audited GMP manufacturers in 6 countries.',
    },
    deliverables: {
      ru: ['Подбор EU/WHO GMP площадок', 'Заключение прямых контрактов', 'Передача партнёрам готового продукта'],
      uz: ['EU/WHO GMP zavodlarini tanlash', 'To‘g‘ridan-to‘g‘ri shartnomalar', 'Hamkorlarga tayyor mahsulot taqdim etish'],
      en: ['EU/WHO GMP site qualification', 'Direct manufacturing contracts', 'Turnkey ready-product delivery'],
    },
    metric: {
      ru: '25+ производителей из 6 стран',
      uz: '6 mamlakatdan 25+ ishlab chiqaruvchi',
      en: '25+ manufacturers from 6 countries',
    },
  },
  {
    id: 'regulatory-affairs',
    number: '03',
    title: {
      ru: 'Регуляторные услуги и регистрация под ключ',
      uz: 'Regulyator xizmatlar va ro‘yxatdan o‘tkazish',
      en: 'Regulatory Affairs & Turnkey Registration',
    },
    description: {
      ru: 'Сами оформляем все документы и регистрацию лекарственных средств, ИМН и БАД в РУз: формирование досье в формате CTD, признание GMP и сертификация.',
      uz: 'Dori vositalari, tibbiy buyumlar va BFQ hujjatlarini o‘zimiz rasmiylashtiramiz hamda O‘zbekistonda to‘liq ro‘yxatdan o‘tkazamiz.',
      en: 'We handle all paperwork and CTD registration for medicines, medical devices, and supplements in Uzbekistan.',
    },
    deliverables: {
      ru: ['Сборка и аудит CTD-досье', 'Локализация макетов (UZ/RU)', 'Сертификация каждой серии ввоза'],
      uz: ['CTD-dosye yig‘ish va auditi', 'Qadoq maketlarini mahalliylashtirish', 'Har bir seriyani sertifikatlash'],
      en: ['CTD dossier compilation & audit', 'Artwork localization (UZ/RU)', 'Batch release certification'],
    },
    metric: {
      ru: '70+ препаратов в портфеле',
      uz: 'Portfelda 70+ preparat',
      en: '70+ registered portfolio SKUs',
    },
  },
  {
    id: 'gdp-logistics',
    number: '04',
    title: {
      ru: 'Дистрибуция и GDP-склад (10 000 м²)',
      uz: 'Distribyutsiya va GDP-ombor (10 000 m²)',
      en: 'GDP Warehousing & Distribution (10,000 m²)',
    },
    description: {
      ru: 'Доводим препараты от производителя до аптек и клиник: складской комплекс 10 000 м² по стандартам GDP, холодовая цепь (+2...+8 °C) и собственный рефрижераторный автопарк.',
      uz: 'Preparatlarni ishlab chiqaruvchidan dorixona va klinikalargacha yetkazamiz: GDP standartiga mos 10 000 m² ombor va refrijerator avtoparki.',
      en: 'We deliver medicines from manufacturer to pharmacies and hospitals via our 10,000 m² GDP warehouse and refrigerated fleet.',
    },
    deliverables: {
      ru: ['Склад 10 000 м² по стандартам GDP', 'Круглосуточный термомониторинг +2…+8 °C', 'Собственный рефрижераторный автопарк'],
      uz: ['GDP standartidagi 10 000 m² ombor', '24/7 harorat monitoringi +2…+8 °C', 'Maxsus refrijerator avtoparki'],
      en: ['10,000 m² GDP-compliant warehouse', '24/7 digital cold-chain telemetry', 'Dedicated refrigerated vehicle fleet'],
    },
    metric: {
      ru: '10 000 м² склад по стандартам GDP',
      uz: '10 000 m² GDP standartidagi ombor',
      en: '10,000 m² GDP-compliant facility',
    },
  },
  {
    id: 'marketing-promotion',
    number: '05',
    title: {
      ru: 'Промоция и медицинский маркетинг',
      uz: 'Targ‘ibot va tibbiy marketing',
      en: 'Medical Promotion & Field Force',
    },
    description: {
      ru: 'Продвигаем препараты среди врачей и аптек через команды медицинских представителей субрендов INSO Inom, HB, LPS и Neues Leben через сеть из 13 региональных офисов.',
      uz: '13 ta hududiy ofis va tibbiy vakillar jamoalari orqali shifokorlar hamda dorixonalar o‘rtasida preparatlarni targ‘ib qilamiz.',
      en: 'We promote medicines among physicians and pharmacies through dedicated medical representative teams across 13 regional offices.',
    },
    deliverables: {
      ru: ['13 региональных офисов по стране', 'Профильные команды медпредставителей', 'Научные конференции и работа с ЛПУ'],
      uz: ['Mamlakat bo‘ylab 13 ta hududiy ofis', 'Ixtisoslashgan tibbiy vakillar jamoasi', 'Ilmiy konferensiyalar va shifoxonalar qamrovi'],
      en: ['13 regional offices nationwide', 'Specialized medical rep teams', 'Scientific symposia & hospital reach'],
    },
    metric: {
      ru: '13 региональных офисов',
      uz: '13 ta hududiy ofis',
      en: '13 regional representative offices',
    },
  },
  {
    id: 'pharmacovigilance-tenders',
    number: '06',
    title: {
      ru: 'Фармаконадзор и госпитальные поставки',
      uz: 'Farmakonazorat va gospital ta’minot',
      en: 'Pharmacovigilance & Hospital Supply',
    },
    description: {
      ru: 'Круглосуточный контроль качества и безопасности на каждом этапе — от выбора производителя до стационара и аптеки, сопровождение госпитальных закупок.',
      uz: 'Ishlab chiqaruvchini tanlashdan shifoxona va dorixonagacha har bir bosqichda sifat hamda xavfsizlik nazorati (GVP).',
      en: 'End-to-end GVP safety monitoring and quality control at every stage from manufacturer selection to hospital and pharmacy.',
    },
    deliverables: {
      ru: ['Локальное контактное лицо по GVP (QPPV)', 'Мониторинг безопасности 24/7', 'Поставки в стационары и реанимации'],
      uz: ['GVP bo‘yicha mahalliy mas’ul shaxs (QPPV)', '24/7 xavfsizlik monitoringi', 'Shifoxona va reanimatsiya ta’minoti'],
      en: ['Dedicated local QPPV safety officer', '24/7 pharmacovigilance monitoring', 'Hospital & ICU tender supply'],
    },
    metric: {
      ru: '6 профильных субрендов холдинга',
      uz: 'Xoldingning 6 ta sub-brendi',
      en: '6 specialized holding sub-brands',
    },
  },
];

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'research',
    type: 'research',
    title: {
      ru: 'Исследования и биоэквивалентность',
      uz: 'Tadqiqotlar va bioekvivalentlik',
      en: 'Research & Bioequivalence Studies',
    },
    subtitle: {
      ru: 'Последние исследовательские статьи, данные фармакокинетики и досье биоэквивалентности препаратов портфеля INSO Group.',
      uz: 'INSO Group portfelidagi dori vositalarining farmakokinetikasi va bioekvivalentlik ma’lumotlari.',
      en: 'Latest pharmacokinetic data, stability profiles, and bioequivalence dossiers across the INSO Group portfolio.',
    },
    articlesCount: 42,
    latestTopic: {
      ru: 'Целевая доставка микронутриентов по технологии Vitaprotein® (Greenwell) и кардиометаболическая поддержка (Крефос / Дифоскор).',
      uz: 'Vitaprotein® (Greenwell) maqsadli yetkazish texnologiyasi va kardiometabolik terapiya sharhi.',
      en: 'Targeted micronutrient delivery via Vitaprotein® (Greenwell) and cardiometabolic cytoprotection (Krefos / Difoskor).',
    },
    date: 'Ноябрь 2026',
    summary: {
      ru: 'Клинико-фармакологический обзор эффективности флагманских препаратов субрендов INSO Inom, HB, LPS, Greenwell и Neues Leben в стационарной и амбулаторной практике.',
      uz: 'INSO Inom, HB, LPS, Greenwell va Neues Leben sub-brendlari flagman preparatlarining klinik samaradorligi tahlili.',
      en: 'Clinical pharmacology review of flagship medicines across INSO Inom, HB, LPS, Greenwell, and Neues Leben in hospital and outpatient care.',
    },
  },
  {
    id: 'clinical',
    type: 'clinical',
    title: {
      ru: 'Клинические обзоры и протоколы',
      uz: 'Klinik sharhlar va protokollar',
      en: 'Clinical Reviews & Treatment Protocols',
    },
    subtitle: {
      ru: 'Актуальные клинические случаи, алгоритмы терапии и междисциплинарные рекомендации для практикующих врачей здравоохранения.',
      uz: 'Amaliyotchi shifokorlar uchun klinik holatlar, terapiya algoritmlari va tavsiyalar.',
      en: 'Evidence-based clinical case studies, therapeutic algorithms, and multidisciplinary guidelines for physicians.',
    },
    articlesCount: 68,
    latestTopic: {
      ru: 'Госпитальная нейропротекция и противоотечная терапия (Креатон-Био / Вазолизин) в первые 24 часа ишемического инсульта и ЧМТ.',
      uz: 'Ishemik insultning dastlabki 24 soatida neyroprotektiv va shishga qarshi terapiya (Kreaton-Bio / Vazolizin).',
      en: 'Hospital neuroprotective and anti-edematous therapy (Kreaton-Bio / Vazolizin) within 24 hours of acute stroke and TBI.',
    },
    date: 'Ноябрь 2026',
    summary: {
      ru: 'Анализ 310 клинических случаев показал ускорение восстановления когнитивных и моторных функций по шкале NIHSS на 28% к 30-му дню терапии.',
      uz: '310 ta klinik holat tahlili terapiyaning 30-kuniga kelib NIHSS shkalasi bo‘yicha tiklanishning 28% tezlashishini ko‘rsatdi.',
      en: 'Evaluation of 310 patient cases demonstrated a 28% faster improvement on the NIHSS motor and cognitive recovery scale by Day 30.',
    },
  },
  {
    id: 'education',
    type: 'education',
    title: {
      ru: 'Образование и фармшколы',
      uz: 'Ta’lim va farmatsevtik seminarlar',
      en: 'Medical Education & Pharma Academy',
    },
    subtitle: {
      ru: 'Образовательные модули, вебинары для провизоров и врачей, а также курсы по стандартам GDP/GMP и фармаконадзору.',
      uz: 'Provizorlar va shifokorlar uchun vebinarlar, GDP/GMP standartlari va farmakonazorat bo‘yicha o‘quv modullari.',
      en: 'Continuing medical education modules, pharmacist training webinars, and GxP / Pharmacovigilance certification workshops.',
    },
    articlesCount: 29,
    latestTopic: {
      ru: 'Практический семинар: Управление холодовой цепью (+2...+8 °C) на GDP-складе 10 000 м² и региональная логистика в 13 филиалах.',
      uz: 'Amaliy seminar: 10 000 m² GDP-omborda sovuqlik zanjirini (+2...+8 °C) boshqarish va 13 ta hududiy ofis logistikasi.',
      en: 'Workshop: Cold-chain integrity (+2...+8 °C) across our 10,000 m² GDP warehouse and 13 regional branches.',
    },
    date: 'Ноябрь 2026',
    summary: {
      ru: 'Сертифицированный курс для специалистов по качеству и заведующих аптечными складами с разбором реальных кейсов термокартирования склада 10 000 м².',
      uz: 'Sifat bo‘yicha mutaxassislar va ombor mudirlari uchun 10 000 m² GDP-ombor keyslari asosida sertifikatlangan kurs.',
      en: 'Certified training module for QA directors and warehouse managers featuring real thermal-mapping protocols from our 10,000 m² GDP facility.',
    },
  },
];

export interface FAQItem {
  id: string;
  category: {
    ru: string;
    uz: string;
    en: string;
  };
  question: {
    ru: string;
    uz: string;
    en: string;
  };
  answer: {
    ru: string;
    uz: string;
    en: string;
  };
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-holding-subbrands',
    category: {
      ru: 'Структура холдинга',
      uz: 'Xolding tuzilmasi',
      en: 'Holding Structure',
    },
    question: {
      ru: 'Какие субренды входят в INSO Group и как распределены направления?',
      uz: 'INSO Group tarkibiga qaysi sub-brendlar kiradi va yoʻnalishlar qanday taqsimlangan?',
      en: 'Which sub-brands belong to INSO Group and how are business lines structured?',
    },
    answer: {
      ru: 'В холдинг INSO Group входят шесть профильных субрендов, закрывающих весь путь от производителя до пациента: INSO Inom (21 позиция для стационаров и аптек + линейка БАД), INSO Health Care Business / HB (19 препаратов кардионеврологии и парентерального питания), Life Pharm Systems / LPS (10 госпитальных препаратов), Greenwell (13 БАДов из США с технологией Vitaprotein®), Neues Leben / NL (прямая GDP-дистрибуция, склад 10 000 м² и 13 офисов) и INSO Service (поиск молекул, регистрация и консалтинг под ключ).',
      uz: 'INSO Group xoldingi oltita sub-brendni birlashtiradi: INSO Inom (21 pozitsiya), INSO Health Care Business / HB (19 preparat), Life Pharm Systems / LPS (10 shifoxona preparati), Greenwell (Vitaprotein® texnologiyali 13 ta AQSh BFQ), Neues Leben / NL (10 000 m² GDP ombor va 13 ta hududiy ofis) hamda INSO Service (molekulalarni izlash va roʻyxatdan oʻtkazish).',
      en: 'INSO Group unites six specialized sub-brands covering the entire journey from manufacturer to patient: INSO Inom (21 hospital/retail SKUs & supplements), INSO Health Care Business / HB (19 cardio-neurology & parenteral nutrition SKUs), Life Pharm Systems / LPS (10 hospital/ICU medicines), Greenwell (13 US supplements with Vitaprotein® technology), Neues Leben / NL (10,000 m² GDP warehouse & 13 regional offices), and INSO Service (molecule sourcing & turnkey registration).',
    },
  },
  {
    id: 'faq-registration',
    category: {
      ru: 'INSO Service · Регистрация',
      uz: 'INSO Service · Ro‘yxatdan o‘tkazish',
      en: 'INSO Service · Registration',
    },
    question: {
      ru: 'Кто в холдинге отвечает за поиск молекул и регистрацию препаратов под ключ?',
      uz: 'Xoldingda molekula topish va preparatlarni ro‘yxatdan o‘tkazish uchun kim javob beradi?',
      en: 'How does INSO Service handle molecule sourcing and turnkey registration in Uzbekistan?',
    },
    answer: {
      ru: 'Сервисное направление представляет INSO Service (в кооперации с регуляторной экспертизой Neues Leben): мы сами находим перспективные молекулы у 25+ заводов из 6 стран (Индия, Китай, Германия, Польша, Южная Корея, Узбекистан), оформляем CTD-досье, проводим регистрацию в Минздраве РУз и передаём партнёрам готовый к продажам продукт.',
      uz: 'INSO Service molekulalarni topadi, barcha CTD hujjatlari va roʻyxatdan oʻtkazishni oʻzi rasmiylashtiradi hamda hamkorlarga Oʻzbekiston bozoriga tayyor mahsulotni taqdim etadi.',
      en: 'INSO Service sources high-potential molecules across 25+ manufacturers in 6 countries, compiles CTD dossiers, manages regulatory approval in Uzbekistan, and delivers a market-ready product to partners.',
    },
  },
  {
    id: 'faq-gdp-coldchain',
    category: {
      ru: 'GDP-логистика (10 000 м²)',
      uz: 'GDP-logistika (10 000 m²)',
      en: 'GDP Logistics (10,000 m²)',
    },
    question: {
      ru: 'Как обеспечивается хранение на складе 10 000 м² и доставка через 13 региональных офисов?',
      uz: '10 000 m² GDP-omborda saqlash va 13 ta hududiy ofis orqali yetkazib berish qanday ta’minlanadi?',
      en: 'How do you maintain GDP storage across 10,000 m² and distribute through 13 regional offices?',
    },
    answer: {
      ru: 'Дистрибуционный контур холдинга располагает складским комплексом 10 000 м² по стандартам GDP с круглосуточным мониторингом температуры (+2…+8 °C и +15…+25 °C), собственным рефрижераторным автопарком и 13 региональными офисами, что гарантирует быструю и надёжную доставку от производителя до аптек и стационаров по всему Узбекистану.',
      uz: 'GDP standartlariga mos 10 000 m² ombor majmuasi, +2…+8 °C sovuqlik zanjiri, maxsus refrijerator avtoparki va 13 ta hududiy ofis preparatlarni ishlab chiqaruvchidan bemorgacha ishonchli yetkazishni kafolatlaydi.',
      en: 'Our distribution backbone features a 10,000 m² GDP-compliant warehouse with 24/7 thermal telemetry (+2…+8 °C and +15…+25 °C), a proprietary refrigerated fleet, and 13 regional offices across Uzbekistan.',
    },
  },
  {
    id: 'faq-wholesale',
    category: {
      ru: 'Партнёрство и прайс-лист',
      uz: 'Hamkorlik va prays-list',
      en: 'Partnership & Wholesale',
    },
    question: {
      ru: 'Как фармпроизводителям, аптечным сетям и клиникам начать сотрудничество с INSO Group?',
      uz: 'Ishlab chiqaruvchilar, dorixonalar va klinikalar INSO Group bilan qanday hamkorlik boshlashi mumkin?',
      en: 'How can manufacturers, pharmacy chains, and hospitals partner with INSO Group?',
    },
    answer: {
      ru: 'Нажмите кнопку «Обсудить сотрудничество» на главном экране или оставьте заявку в форме обратной связи внизу страницы. Мы свяжемся с вами в течение 2 рабочих часов, чтобы обсудить дистрибуцию, промоцию медицинскими представителями, регистрацию новых молекул или актуальный оптовый прайс-лист по любому из 6 субрендов.',
      uz: 'Bosh ekrandagi «Hamkorlikni muhokama qilish» tugmasini bosing yoki aloqa formasi orqali murojaat qoldiring. Mutaxassislarimiz distribyutsiya, targʻibot yoki roʻyxatdan oʻtkazish boʻyicha 2 ish soati ichida bogʻlanadi.',
      en: 'Click "Discuss a partnership" in the hero section or submit an inquiry via our contact form. Our leadership and commercial team will respond within 2 business hours with a tailored roadmap or wholesale catalog.',
    },
  },
  {
    id: 'faq-values-culture',
    category: {
      ru: 'Ценности и карьера',
      uz: 'Qadriyatlar va karyera',
      en: 'Values & Careers',
    },
    question: {
      ru: 'На каких принципах строится работа с партнёрами и корпоративная культура в INSO Group?',
      uz: 'INSO Group-da hamkorlar bilan ishlash va korporativ madaniyat qanday tamoyillarga asoslanadi?',
      en: 'What core values guide partner relations and workplace culture at INSO Group?',
    },
    answer: {
      ru: 'Шесть ценностей холдинга складываются в одну фразу: «Бережём доверие, берём ответственность, опираемся на факты, доводим до конца, видим дальше, ценим людей». При этом действует жёсткое правило приоритета: если ценности вступают в конфликт, всегда побеждает «Бережём доверие» — скорость, план и прибыль никогда не важнее качества, безопасности и этики.',
      uz: 'Oltita qadriyatimiz bir jumlada: «Ishonchni asraymiz, masʼuliyatli ishlaymiz, dalillarga tayanamiz, oxirigacha yetkazamiz, uzoqni koʻramiz, insonni qadrlaymiz». Har qanday holatda sifat, xavfsizlik va halollik birinchi oʻrinda turadi.',
      en: 'Our six action-verb values form a single pledge: "We safeguard trust, take ownership, rely on facts, see it through, look further and value people." Quality, patient safety, and ethics always override speed or short-term profit.',
    },
  },
];
