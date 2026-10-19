import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthResult, fetchMe, User } from '../api';
import { AUTH_TOKEN_STORAGE_KEY } from '../constants';
import {
  getStoredItem,
  onAuthTokenRefreshed,
  onUnauthorized,
  removeStoredItem,
  setAuthToken,
  setStoredItem,
  useQueryClient,
} from '../utils';

interface AuthValue {
  user: User | null;
  isRestoring: boolean;
  signIn: (result: AuthResult) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue>({
  user: null,
  isRestoring: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  const signOut = useCallback(() => {
    setAuthToken(null);
    removeStoredItem(AUTH_TOKEN_STORAGE_KEY);
    queryClient.clear();
    setUser(null);
  }, [queryClient]);

  const signIn = useCallback((result: AuthResult) => {
    setAuthToken(result.accessToken);
    setStoredItem(AUTH_TOKEN_STORAGE_KEY, result.accessToken);
    setUser(result.user);
  }, []);

  useEffect(() => {
    onAuthTokenRefreshed((token) => {
      if (token) setStoredItem(AUTH_TOKEN_STORAGE_KEY, token);
    });
    onUnauthorized(signOut);
  }, [signOut]);

  // Restore the previous session on launch using the "me" API
  useEffect(() => {
    let active = true;
    (async () => {
      const token = await getStoredItem(AUTH_TOKEN_STORAGE_KEY);
      if (token) {
        setAuthToken(token);
        try {
          const me = await fetchMe();
          if (active) setUser(me);
        } catch {
          setAuthToken(null);
          removeStoredItem(AUTH_TOKEN_STORAGE_KEY);
        }
      }
      if (active) setIsRestoring(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ user, isRestoring, signIn, signOut }), [user, isRestoring, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthValue => useContext(AuthContext);
