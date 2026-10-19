import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, RefreshControlProps, ScrollView, StyleSheet } from 'react-native';
import { SPACING, TOP_INSET } from '../../constants';
import { useTheme } from '../../providers';

interface ScreenProps extends PropsWithChildren {
  refreshControl?: React.ReactElement<RefreshControlProps>;
  /** Bottom space, e.g. to clear a floating tab bar. */
  bottomInset?: number;
}

export function Screen({ children, refreshControl, bottomInset = SPACING.xl }: ScreenProps) {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: TOP_INSET, paddingBottom: SPACING.xl },
});
