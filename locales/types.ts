export interface CommonLocale {
  loader: {
    loading: string;
  };
  nav: {
    about: string;
    news: string;
    brands: string;
    career: string;
    catalog: string;
    catalogShort: string;
    faq: string;
    contacts: string;
    contactCta: string;
    serviceContact: string;
    menuOpen: string;
    menuClose: string;
  };
  actions: {
    close: string;
    readMore: string;
    partner: string;
    downloadPdf: string;
    requestDocs: string;
  };
}

export interface HeroLocale {
  sinceBadge: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroDescription: string;
  heroPartnerBtn: string;
  navCatalog: string;
  docs: string;
  next: string;
  play: string;
  pause: string;
  routeStops: [string, string];
}

export interface AboutLocale {
  badge: string;
  title: string;
  lead: string;
  photoCaption: string;
}

export interface DistributionLocale {
  badge: string;
  title: string;
  subtitle: string;
  photoCaption: string;
  photoLink: string;
  metric1Val: string;
  metric1Label: string;
  metric2Val: string;
  metric2Label: string;
  metric3Val: string;
  metric3Label: string;
  licenseTitle: string;
  licenseDesc: string;
  pdfAction: string;
  licenseAction: string;
  deliveryTitle: string;
  deliveryDesc: string;
  deliveryCities: string;
  deliveryAction: string;
}

export interface BusinessLinesLocale {
  badge: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  catalog: string;
  delivery: string;
  registration: string;
}

export interface VisionValuesLocale {
  label: string;
  lead: string;
  region: string;
  end: string;
  valuesBadge: string;
  valuesMain: string;
  valuesAccent: string;
  valuesDesc: string;
  photoAlt: string;
}

export interface LeadershipLocale {
  sectionBadge: string;
  sectionTitle: string;
  sectionLead: string;
  previous: string;
  next: string;
  members: {
    ceo: {
      role: string;
      fullRole: string;
      bio: string;
    };
    cho: {
      role: string;
      fullRole: string;
      bio: string;
    };
    consulting: {
      role: string;
      fullRole: string;
      bio: string;
    };
  };
}

export interface NewsLocale {
  badge: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  readMore: string;
  closeModal: string;
}

export interface FaqLocale {
  badge: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  askQuestion: string;
  needConsult: string;
  contactTeam: string;
  categories: {
    all: string;
    logistics: string;
    registration: string;
    producers: string;
    pharmacies: string;
    compliance: string;
  };
}

export interface ContactLocale {
  badge: string;
  title: string;
  name: string;
  contact: string;
  topic: string;
  message: string;
  send: string;
  draft: string;
  hint: string;
  pending: string;
  ok: string;
  error: string;
  address: string;
  route: string;
  formTitle: string;
  phone: string;
  invalid: string;
}

export interface FooterLocale {
  ctaLead: string;
  ctaLeadAccent: string;
  ctaButton: string;
  descriptor: string;
  license: string;
  company: string;
  history: string;
  values: string;
  brands: string;
  careers: string;
  partners: string;
  catalog: string;
  logistics: string;
  docs: string;
  faq: string;
  office: string;
  address: string;
  telegram: string;
  linkedin: string;
  copyright: string;
  privacy: string;
  top: string;
}

export interface MapLocale {
  badge: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  presetHub: string;
  presetPharmacies: string;
  presetClinics: string;
  resultsLabel: string;
  loadingText: string;
  noResultsText: string;
  openInMaps: string;
  gdpNote: string;
}

export interface Dictionary {
  common: CommonLocale;
  hero: HeroLocale;
  about: AboutLocale;
  distribution: DistributionLocale;
  businessLines: BusinessLinesLocale;
  visionValues: VisionValuesLocale;
  leadership: LeadershipLocale;
  news: NewsLocale;
  faq: FaqLocale;
  contact: ContactLocale;
  footer: FooterLocale;
  map: MapLocale;
}
