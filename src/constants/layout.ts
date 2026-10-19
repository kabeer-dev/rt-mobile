import { Platform, StatusBar } from 'react-native';

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
} as const;

export const FONT_SIZE = {
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const SIZE = {
  control: 52,
  logoSm: 44,
  borderWidth: 1,
  androidTopGap: 16,
  iosTopInset: 56,
} as const;

export const LOGO_RADIUS_RATIO = 0.22;

export const TOP_INSET =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + SIZE.androidTopGap : SIZE.iosTopInset;
