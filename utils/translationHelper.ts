import en from '@/i18n/en';
// Create a type that represents all possible translation keys
type EnType = typeof en;
export type TranslationKeys =
  | `common.${keyof EnType['common']}`
  | `HP_01.${keyof EnType['HP_01']}`
  | `HP_02.${keyof EnType['HP_02']}`
  | `explore.${keyof EnType['explore']}`
  | `booking.${keyof EnType['booking']}`
  | `homeHeader.${keyof EnType['homeHeader']}`;

// Create a type-safe translation object similar to SwiftGen's L10n
export const L10n = {
  common: {
    hello: 'common.hello' as const,
    welcome: 'common.welcome' as const,
    loading: 'common.loading' as const,
    error: 'common.error' as const,
    retry: 'common.retry' as const,
    cancel: 'common.cancel' as const,
    nomagoLogo: 'common.nomagoLogo' as const,
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
  },
  explore: {
    title: 'explore.title' as const,
    loading: 'explore.loading' as const,
    error: 'explore.error' as const,
    noListings: 'explore.noListings' as const,
  },
  booking: {
    startBooking: 'booking.startBooking' as const,
    book: 'booking.book' as const,
    bookNow: 'booking.bookNow' as const,
    bookProperty: 'booking.bookProperty' as const,
    name: 'booking.name' as const,
    surname: 'booking.surname' as const,
    email: 'booking.email' as const,
    phoneNumber: 'booking.phoneNumber' as const,
    dates: 'booking.dates' as const,
    cancel: 'booking.cancel' as const,
    bookingConfirmed: 'booking.bookingConfirmed' as const,
    bookingFailed: 'booking.bookingFailed' as const,
    pleaseFillAllFields: 'booking.pleaseFillAllFields' as const,
    pleaseSelectDates: 'booking.pleaseSelectDates' as const,
    propertyDocumentMissing: 'booking.propertyDocumentMissing' as const,
    saveConfirmation: 'booking.saveConfirmation' as const,
    done: 'booking.done' as const,
    weReceived: 'booking.weReceived' as const,
    hereAreDetails: 'booking.hereAreDetails' as const,
    property: 'booking.property' as const,
    checkIn: 'booking.checkIn' as const,
    checkOut: 'booking.checkOut' as const,
    notSelected: 'booking.notSelected' as const,
    success: 'booking.success' as const,
    confirmationSaved: 'booking.confirmationSaved' as const,
    permissionDenied: 'booking.permissionDenied' as const,
    permissionRequired: 'booking.permissionRequired' as const,
    errorSaving: 'booking.errorSaving' as const,
    failedToSave: 'booking.failedToSave' as const,
  },
  homeHeader: {
    title: 'homeHeader.title' as const,
    subtitle: 'homeHeader.subtitle' as const,
  },
};