import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_PREFIX, API_TIMEOUT_MS, HTTP_STATUS, PLATFORM_HEADER, PLATFORM_MOBILE } from '../constants';

const http = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/+$/, '')}${API_PREFIX}`,
  timeout: API_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json', [PLATFORM_HEADER]: PLATFORM_MOBILE },
});

type TokenListener = (token: string | null) => void;

let tokenListener: TokenListener | null = null;
let unauthorizedListener: (() => void) | null = null;
let hasToken = false;

export const setAuthToken = (token: string | null): void => {
  hasToken = Boolean(token);
  if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete http.defaults.headers.common.Authorization;
};

/** Called whenever the server hands back a fresher token (sessions slide with each request). */
export const onAuthTokenRefreshed = (listener: TokenListener): void => {
  tokenListener = listener;
};

/** Called when a request made with a token is rejected as unauthorized. */
export const onUnauthorized = (listener: () => void): void => {
  unauthorizedListener = listener;
};

http.interceptors.response.use(
  (response) => {
    const refreshed = (response.data as { loginToken?: string } | undefined)?.loginToken;
    if (refreshed) {
      setAuthToken(refreshed);
      tokenListener?.(refreshed);
    }
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === HTTP_STATUS.unauthorized && hasToken) {
      unauthorizedListener?.();
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? error.message;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
};

export const httpGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  (await http.get<T>(url, config)).data;

export const httpPost = async <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
  (await http.post<T>(url, body, config)).data;
