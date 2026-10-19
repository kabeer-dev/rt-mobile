import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { DARK_COLORS, LIGHT_COLORS, ThemeColors } from '../constants';

interface ThemeValue {
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeValue>({ colors: LIGHT_COLORS, isDark: false });

/** Light or dark colors, following the phone's current setting. */
export function ThemeProvider({ children }: PropsWithChildren) {
  const isDark = useColorScheme() === 'dark';
  const value = useMemo(() => ({ colors: isDark ? DARK_COLORS : LIGHT_COLORS, isDark }), [isDark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): ThemeValue => useContext(ThemeContext);
