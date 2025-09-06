import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

export const PLATFORM_STYLES = {
  headerPadding: IS_IOS ? 44 : 24,
  keyboardBehavior: IS_IOS ? 'padding' as const : undefined,
} as const;

// Android network configuration
export const API_HOST = 'management.nomago.al';
export const DEFAULT_PORT = '1337';
