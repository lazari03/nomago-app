import en from '@/i18n/en';
// Create a type that represents all possible translation keys
export type TranslationKeys = 
  | `common.${keyof typeof en.common}`
  | `HP_01.${keyof typeof en.HP_01}`
  | `HP_02.${keyof typeof en.HP_02}`;

// Create a type-safe translation object similar to SwiftGen's L10n
export const L10n = {
  common: {
    hello: 'common.hello' as const,
    welcome: 'common.welcome' as const,
    loading: 'common.loading' as const,
    error: 'common.error' as const,
    retry: 'common.retry' as const,
    cancel: 'common.cancel' as const,
  },
  HP_01: {
    title: 'HP_01.title' as const,
    subtitle: 'HP_01.subtitle' as const,
    getStarted: 'HP_01.getStarted' as const,
    learnMore: 'HP_01.learnMore' as const,
  },
  HP_02: {
    title: 'HP_02.title' as const,
    mainFeature: 'HP_02.mainFeature' as const,
    secondaryFeature: 'HP_02.secondaryFeature' as const,
  }
};