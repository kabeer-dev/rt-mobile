export const BRAND = {
  green: '#2DD9A0',
  blue: '#4B5CF0',
  ink: '#0B1220',
  white: '#FFFFFF',
} as const;

export interface ThemeColors {
  primary: string;
  onPrimary: string;
  link: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  danger: string;
}

export const LIGHT_COLORS: ThemeColors = {
  primary: BRAND.green,
  onPrimary: BRAND.ink,
  link: BRAND.blue,
  background: '#F4F6FA',
  surface: '#FFFFFF',
  border: '#E3E8F0',
  text: BRAND.ink,
  textMuted: '#667085',
  danger: '#EF4444',
};

export const DARK_COLORS: ThemeColors = {
  primary: BRAND.blue,
  onPrimary: BRAND.white,
  link: '#7C8BFF',
  background: BRAND.ink,
  surface: '#121A2B',
  border: '#25304A',
  text: '#F1F5F9',
  textMuted: '#94A3B8',
  danger: '#F87171',
};
