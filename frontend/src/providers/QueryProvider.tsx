'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 5,        // 5 seconds for instant updates
            gcTime: 1000 * 60 * 5,      // 5 minutes
            retry: (failureCount, error) => {
              // Don't retry on 401/403/404
              const status = (error as { response?: { status?: number } })?.response?.status;
              if (status && [401, 403, 404].includes(status)) return false;
              return failureCount < 1;
            },
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
