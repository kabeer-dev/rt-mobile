import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { FONT_SIZE, RADIUS, SIZE, SPACING } from '../../constants';
import { useTheme } from '../../providers';
import { AppText } from './AppText';

interface AppTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  secure?: boolean;
}

export function AppTextInput({ label, error, secure, style, ...rest }: AppTextInputProps) {
  const { colors } = useTheme();
  const [hidden, setHidden] = useState(true);
  return (
    <View style={styles.field}>
      <AppText variant="caption" style={styles.label}>
        {label}
      </AppText>
      <View
        style={[
          styles.box,
          { backgroundColor: colors.surface, borderColor: error ? colors.danger : colors.border },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }, style]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secure && hidden}
          autoCapitalize="none"
          {...rest}
        />
        {secure ? (
          <Pressable onPress={() => setHidden((value) => !value)} hitSlop={SPACING.sm}>
            <AppText variant="caption">{hidden ? 'Show' : 'Hide'}</AppText>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <AppText variant="caption" style={{ color: colors.danger }}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: SPACING.xs },
  label: { fontWeight: '600' },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SIZE.control,
    borderRadius: RADIUS.md,
    borderWidth: SIZE.borderWidth,
    paddingHorizontal: SPACING.md,
  },
  input: { flex: 1, fontSize: FONT_SIZE.md, height: '100%' },
});
