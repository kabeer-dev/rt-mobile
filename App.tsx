import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AUTH_SCREENS, AuthScreen } from './src/constants';
import { HomePage, SignInPage, SignUpPage } from './src/pages';
import { AppProviders, useAuth, useTheme } from './src/providers';

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

function Root() {
  const { user, isRestoring } = useAuth();
  const { colors } = useTheme();
  const [screen, setScreen] = useState<AuthScreen>(AUTH_SCREENS.signIn);

  if (isRestoring) {
    return (
      <View style={[styles.splash, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  // Only a signed-in user can reach the app
  if (user) return <HomePage />;
  if (screen === AUTH_SCREENS.signUp) return <SignUpPage onSignIn={() => setScreen(AUTH_SCREENS.signIn)} />;
  return <SignInPage onCreateAccount={() => setScreen(AUTH_SCREENS.signUp)} />;
}

export default function App() {
  return (
    <AppProviders>
      <Root />
      <ThemedStatusBar />
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
