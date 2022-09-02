import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '..';
import { getWeather } from './getWeather';
import { WidgetQueryClientContext } from '../../../context/WidgetQueryClientContext';

export function useGetWeather(
  coords: [lat: number | undefined, lon: number | undefined],
  params: { isEnabled?: boolean; refetchInterval?: number; apiKey: string },
) {
  const refetchInterval = params.refetchInterval ?? 1000 * 30;
  return useQuery(
    [QueryKey.GetWeather, coords],
    () => getWeather(coords, params.apiKey),
    {
      staleTime: refetchInterval,
      cacheTime: refetchInterval,
      refetchInterval,
      refetchIntervalInBackground: true,
      enabled: params.isEnabled,
      context: WidgetQueryClientContext,
    },
  );
}
