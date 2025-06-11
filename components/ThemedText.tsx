import { colors, useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  // Fix the type error by using the colors object type instead of hook return type
  colorName?: keyof typeof colors;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  colorName = 'text', // Default to text color
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Use the hook to get the color
  const color = useThemeColor(colorName);
  
  // For link style, get the info color inside the component
  const linkColor = useThemeColor('info');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        // Apply link style and override its color with the hook value
        type === 'link' ? [styles.link, { color: linkColor }] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

// Use the imported colors object for static styles, not hooks
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    // Don't use hooks in StyleSheet.create
    // We'll override the color in the component render function
    color: colors.info,
  },
});