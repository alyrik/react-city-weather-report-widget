import { ReactElement } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import * as getWeatherModule from './getWeather';
import { useGetWeather } from './useGetWeather';
import { WidgetQueryClientProviderMock } from '../../../tests/mocks/QueryClientProvider.mock';
import { mockedWeather } from '../../../tests/mocks/weather.mock';

const wrapper = ({ children }: { children: ReactElement }) => (
  <WidgetQueryClientProviderMock>{children}</WidgetQueryClientProviderMock>
);

describe('useGetWeather', () => {
  it('tests response', async () => {
    jest.spyOn(getWeatherModule, 'getWeather').mockResolvedValue(mockedWeather);

    const { result } = renderHook(
      () => useGetWeather([1, 2], { apiKey: 'apiKey' }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() =>
      expect(result.current.data).toStrictEqual(mockedWeather),
    );
  });
});
