import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

export const PLATFORM_STYLES = {
  headerPadding: IS_IOS ? 44 : 24,
  keyboardBehavior: IS_IOS ? 'padding' as const : undefined,
} as const;

// Android network configuration
export const ANDROID_LOCALHOST_IP = '10.0.2.2'; // Android Emulator
export const IOS_LOCALHOST_IP = 'localhost';
export const DEFAULT_PORT = '1337';
