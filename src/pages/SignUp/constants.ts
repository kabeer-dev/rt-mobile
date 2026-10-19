export const SIGN_UP_TEXT = {
  title: 'Create your account',
  subtitle: 'It takes less than a minute.',
  name: 'Name',
  namePlaceholder: 'Your name',
  email: 'Email',
  emailPlaceholder: 'you@example.com',
  password: 'Password',
  passwordPlaceholder: 'At least 8 characters',
  passwordHint: 'Use 8+ characters with upper and lower case letters, a number and a symbol.',
  submit: 'Create account',
  haveAccount: 'Already have an account? ',
  signIn: 'Sign in',
} as const;

export const SIGN_UP_ERRORS = {
  name: 'Enter your name',
  email: 'Enter a valid email',
  password: 'Password does not meet the requirements',
} as const;
