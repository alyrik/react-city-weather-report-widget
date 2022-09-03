import { ReactElement } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import * as searchCityModule from './searchCity';
import { useSearchCity } from './useSearchCity';
import { WidgetQueryClientProviderMock } from '../../../tests/mocks/QueryClientProvider.mock';
import { mockedCity } from '../../../tests/mocks/city.mock';

const wrapper = ({ children }: { children: ReactElement }) => (
  <WidgetQueryClientProviderMock>{children}</WidgetQueryClientProviderMock>
);
const searchTerm = 'searchTermTest';

describe('useSearchCity', () => {
  it('tests response', async () => {
    jest.spyOn(searchCityModule, 'searchCity').mockResolvedValue(mockedCity);

    const { result } = renderHook(
      () => useSearchCity(searchTerm, { apiKey: 'apiKey' }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toStrictEqual(mockedCity));
  });
});
