import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FONT_SIZE, SPACING } from '../../constants';
import { AppText } from './AppText';

interface BackButtonProps {
  onPress: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={SPACING.md} style={styles.button}>
      <AppText style={styles.arrow}>←</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: 'flex-start', marginBottom: SPACING.lg },
  arrow: { fontSize: FONT_SIZE.xl },
});
