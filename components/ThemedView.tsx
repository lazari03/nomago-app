import { useThemeColor } from '@/hooks/useThemeColor';
import { type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor('background');
  return <SafeAreaView style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
}

