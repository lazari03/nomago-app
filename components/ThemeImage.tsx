import React from 'react';
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native';

interface ThemeImageProps extends Omit<ImageProps, 'source'> {
  uri: string | number;
  quality?: number; // 0-100
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}

/**
 * ThemeImage optimizes image loading by resizing, compressing, and enabling progressive rendering.
 * Usage: <ThemeImage uri={url} width={400} height={250} quality={60} />
 */
export const ThemeImage: React.FC<ThemeImageProps> = ({
  uri,
  quality = 60,
  width = 400,
  height = 250,
  style,
  ...rest
}) => {
  let source: any;
  if (typeof uri === 'string') {
    // Remote image: optimize
    source = { uri: uri ? `${uri}?w=${width}&q=${quality}` : '' };
  } else {
    // Local image: require/import
    source = uri;
  }

  return (
    <Image
      source={source}
      style={[{ width, height }, style]}
      resizeMode="cover"
      progressiveRenderingEnabled={true}
      {...rest}
    />
  );
};
