import { ru } from './ru';
import { uz } from './uz';
import { en } from './en';
import { zh } from './zh';
import type { Dictionary } from './types';
import type { Language } from '@/lib/insopharm-data';

export * from './types';

export const dictionaries: Record<Language, Dictionary> = {
  ru,
  uz,
  en,
  zh,
};

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang] || dictionaries.ru;
}
