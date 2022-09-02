import { createContext, FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const WidgetQueryClientContext = createContext<QueryClient | undefined>(
  undefined,
);
const queryClient = new QueryClient();

export const WidgetQueryClientContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <QueryClientProvider
      client={queryClient}
      context={WidgetQueryClientContext}>
      {children}
    </QueryClientProvider>
  );
};
