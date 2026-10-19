export const AUTH_SCREENS = {
  signIn: 'signIn',
  signUp: 'signUp',
} as const;

export type AuthScreen = (typeof AUTH_SCREENS)[keyof typeof AUTH_SCREENS];
