import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { FONT_SIZE, RADIUS, SIZE } from '../../constants';
import { useTheme } from '../../providers';
import { AppText } from './AppText';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

export function AppButton({ title, onPress, variant = 'primary', loading, disabled }: AppButtonProps) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';
  const textColor = isPrimary ? colors.onPrimary : colors.text;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        isPrimary
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: SIZE.borderWidth },
        (pressed || disabled) && styles.dim,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <AppText style={[styles.label, { color: textColor }]}>{title}</AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { height: SIZE.control, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: FONT_SIZE.md + 1, fontWeight: '700' },
  dim: { opacity: 0.7 },
});
