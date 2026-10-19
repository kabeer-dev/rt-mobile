import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppButton, AppText, Screen } from '../../components/common';
import { SPACING } from '../../constants';
import { useAuth } from '../../providers';
import { HOME_TEXT } from './constants';

export function HomePage() {
  const { user, signOut } = useAuth();

  return (
    <Screen>
      <AppText variant="caption">{HOME_TEXT.greeting}</AppText>
      <AppText variant="display">{user?.name}</AppText>
      <View style={styles.details}>
        <AppText variant="caption">{HOME_TEXT.email}</AppText>
        <AppText>{user?.email}</AppText>
        <AppText variant="caption">{HOME_TEXT.role}</AppText>
        <AppText>{user?.role}</AppText>
      </View>
      <View style={styles.actions}>
        <AppButton title={HOME_TEXT.signOut} onPress={signOut} variant="outline" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  details: { marginTop: SPACING.lg, gap: SPACING.xs },
  actions: { marginTop: 'auto', paddingTop: SPACING.xl },
});
