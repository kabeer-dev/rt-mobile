export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001';
export const API_PREFIX = '/api/v1';
export const API_TIMEOUT_MS = 20000;
export const PLATFORM_HEADER = 'x-platform';
export const PLATFORM_MOBILE = 'mobile';

export const HTTP_STATUS = {
  unauthorized: 401,
} as const;

export const ENDPOINTS = {
  users: {
    register: '/users/register',
    login: '/users/login',
    me: '/users/me',
  },
} as const;

export const QUERY_KEYS = {
  me: ['users', 'me'],
} as const;
