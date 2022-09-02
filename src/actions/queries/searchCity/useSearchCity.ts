import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '..';
import { searchCity } from './searchCity';
import { WidgetQueryClientContext } from '../../../context/WidgetQueryClientContext';

export function useSearchCity(searchTerm: string, params: { apiKey: string }) {
  return useQuery(
    [QueryKey.SearchCity, searchTerm],
    () => searchCity(searchTerm, params.apiKey),
    {
      staleTime: Infinity,
      retry: false,
      context: WidgetQueryClientContext,
    },
  );
}
