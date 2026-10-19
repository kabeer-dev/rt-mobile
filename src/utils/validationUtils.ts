import { EMAIL_PATTERN, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '../constants';

export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim());

/** True when the password meets the server rules, so it won't be rejected. */
export const isStrongPassword = (password: string): boolean =>
  password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH && PASSWORD_PATTERN.test(password);
