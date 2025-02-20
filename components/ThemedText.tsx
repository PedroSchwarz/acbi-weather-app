import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useSettings } from '@/contexts/SettingsContext';
import { useMemo } from 'react';
import { TextSize } from '@/hooks/useLocalStorageSettings';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'body' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const { settings: { textSize } } = useSettings();

  const textScale = useMemo(() => {
    return textSize === TextSize.Large ? 1.1 : textSize === TextSize.ExtraLarge ? 1.2 : 1;
  }, [textSize]);

  const textStyle = useMemo(() => {
    return styles[type] ?? styles.default;
  }, [type]);

  return (
    <Text
      style={[
        { color },
        textStyle,
        { fontSize: textStyle.fontSize * textScale },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    fontSize: 18,
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
    color: '#0a7ea4',
  },
});
