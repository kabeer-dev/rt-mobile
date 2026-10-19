import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRegisterMutation } from '../../api';
import { AppButton, AppText, AppTextInput, BackButton, Screen } from '../../components/common';
import { SPACING } from '../../constants';
import { useAuth, useTheme } from '../../providers';
import { getErrorMessage, isStrongPassword, isValidEmail } from '../../utils';
import { SIGN_UP_ERRORS, SIGN_UP_TEXT } from './constants';

interface SignUpPageProps {
  onSignIn: () => void;
}

export function SignUpPage({ onSignIn }: SignUpPageProps) {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const register = useRegisterMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: name.trim() ? undefined : SIGN_UP_ERRORS.name,
    email: isValidEmail(email) ? undefined : SIGN_UP_ERRORS.email,
    password: isStrongPassword(password) ? undefined : SIGN_UP_ERRORS.password,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = () => {
    setSubmitted(true);
    if (hasErrors) return;
    register.mutate({ name: name.trim(), email: email.trim(), password }, { onSuccess: signIn });
  };

  return (
    <Screen>
      <BackButton onPress={onSignIn} />
      <AppText variant="display">{SIGN_UP_TEXT.title}</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        {SIGN_UP_TEXT.subtitle}
      </AppText>
      <View style={styles.form}>
        <AppTextInput
          label={SIGN_UP_TEXT.name}
          placeholder={SIGN_UP_TEXT.namePlaceholder}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          error={submitted ? errors.name : undefined}
        />
        <AppTextInput
          label={SIGN_UP_TEXT.email}
          placeholder={SIGN_UP_TEXT.emailPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          error={submitted ? errors.email : undefined}
        />
        <AppTextInput
          label={SIGN_UP_TEXT.password}
          placeholder={SIGN_UP_TEXT.passwordPlaceholder}
          value={password}
          onChangeText={setPassword}
          secure
          error={submitted ? errors.password : undefined}
        />
        <AppText variant="caption">{SIGN_UP_TEXT.passwordHint}</AppText>
        {register.isError ? (
          <AppText variant="caption" style={{ color: colors.danger }}>
            {getErrorMessage(register.error)}
          </AppText>
        ) : null}
      </View>
      <View style={styles.actions}>
        <AppButton title={SIGN_UP_TEXT.submit} onPress={handleSubmit} loading={register.isPending} />
        <Pressable onPress={onSignIn} style={styles.footer}>
          <AppText variant="caption">{SIGN_UP_TEXT.haveAccount}</AppText>
          <AppText variant="link">{SIGN_UP_TEXT.signIn}</AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { marginTop: SPACING.xs },
  form: { marginTop: SPACING.lg, gap: SPACING.md },
  actions: { marginTop: 'auto', paddingTop: SPACING.xl, gap: SPACING.md },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
