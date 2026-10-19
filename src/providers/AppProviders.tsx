import React, { PropsWithChildren } from 'react';
import { queryClient } from '../api';
import { QueryClientProvider } from '../utils';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
