import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WidgetQueryClientContext } from '../../context/WidgetQueryClientContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const WidgetQueryClientProviderMock = ({
  children,
}: {
  children: ReactNode;
}) => (
  <QueryClientProvider client={queryClient} context={WidgetQueryClientContext}>
    {children}
  </QueryClientProvider>
);
