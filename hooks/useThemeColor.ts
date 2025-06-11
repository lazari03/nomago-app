/**
 * Simplified color hook to work with the new color structure
 */

import { Colors, ColorTokens } from '@/constants/Colors';

/**
 * Hook to get a color by its semantic name
 * @param colorName The name of the color to retrieve
 * @returns The requested color value
 */
export function useThemeColor(
  colorName: keyof typeof Colors
) {
  
  return Colors[colorName];
}

/**
 * Get multiple colors at once
 * @param colorNames Array of color names to retrieve
 * @returns Object with the requested colors
 */

export function useColors(...colorNames: Array<keyof typeof Colors>) {
  const result: Record<string, string> = {};
  for (const name of colorNames) {
    result[name] = Colors[name];
  }
  return result;
}

export const colors = Colors;
export const tokens = ColorTokens;