import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { FONT_SIZE } from '../../constants';
import { useTheme } from '../../providers';

type Variant = 'display' | 'title' | 'body' | 'caption' | 'link';

interface AppTextProps extends TextProps {
  variant?: Variant;
}

export function AppText({ variant = 'body', style, ...rest }: AppTextProps) {
  const { colors } = useTheme();
  const color = variant === 'caption' ? colors.textMuted : variant === 'link' ? colors.link : colors.text;
  return <Text style={[styles[variant], { color }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  display: { fontSize: FONT_SIZE.xxl, fontWeight: '800', lineHeight: 38 },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700' },
  body: { fontSize: FONT_SIZE.md },
  caption: { fontSize: FONT_SIZE.sm },
  link: { fontSize: FONT_SIZE.md, fontWeight: '600' },
});
