import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useLoginMutation } from '../../api';
import { AppButton, AppText, AppTextInput, Logo, Screen } from '../../components/common';
import { SPACING } from '../../constants';
import { useAuth, useTheme } from '../../providers';
import { getErrorMessage, isValidEmail } from '../../utils';
import { SIGN_IN_ERRORS, SIGN_IN_TEXT } from './constants';

interface SignInPageProps {
  onCreateAccount: () => void;
}

export function SignInPage({ onCreateAccount }: SignInPageProps) {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const login = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    email: isValidEmail(email) ? undefined : SIGN_IN_ERRORS.email,
    password: password ? undefined : SIGN_IN_ERRORS.password,
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (errors.email || errors.password) return;
    login.mutate({ email: email.trim(), password }, { onSuccess: signIn });
  };

  return (
    <Screen>
      <Logo />
      <AppText variant="display" style={styles.title}>
        {SIGN_IN_TEXT.title}
      </AppText>
      <AppText variant="caption" style={styles.subtitle}>
        {SIGN_IN_TEXT.subtitle}
      </AppText>
      <View style={styles.form}>
        <AppTextInput
          label={SIGN_IN_TEXT.email}
          placeholder={SIGN_IN_TEXT.emailPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          error={submitted ? errors.email : undefined}
        />
        <AppTextInput
          label={SIGN_IN_TEXT.password}
          placeholder={SIGN_IN_TEXT.passwordPlaceholder}
          value={password}
          onChangeText={setPassword}
          secure
          error={submitted ? errors.password : undefined}
        />
        {login.isError ? (
          <AppText variant="caption" style={{ color: colors.danger }}>
            {getErrorMessage(login.error)}
          </AppText>
        ) : null}
      </View>
      <View style={styles.actions}>
        <AppButton title={SIGN_IN_TEXT.submit} onPress={handleSubmit} loading={login.isPending} />
        <Pressable onPress={onCreateAccount} style={styles.footer}>
          <AppText variant="caption">{SIGN_IN_TEXT.noAccount}</AppText>
          <AppText variant="link">{SIGN_IN_TEXT.createAccount}</AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: SPACING.lg },
  subtitle: { marginTop: SPACING.xs },
  form: { marginTop: SPACING.lg, gap: SPACING.md },
  actions: { marginTop: 'auto', paddingTop: SPACING.xl, gap: SPACING.md },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
