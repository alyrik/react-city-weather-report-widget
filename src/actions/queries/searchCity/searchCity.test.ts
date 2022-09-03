import mockAxios from 'jest-mock-axios';

import { searchCity } from './searchCity';
import { apiProviderConfig } from '../../../config/apiProviderConfig';
import {
  mockedAlternativeCity,
  mockedCity,
} from '../../../tests/mocks/city.mock';

const searchTerm = 'searchTermTest';
const apiKey = 'apiKey';

describe('searchCity', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('requests correct URL', async () => {
    mockAxios.get.mockResolvedValue({ data: {} });

    await searchCity(searchTerm, apiKey);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `${apiProviderConfig.baseUrl}/geo/1.0/direct`,
      {
        params: {
          q: searchTerm,
          limit: 3,
          appid: apiKey,
        },
      },
    );
  });

  it('returns data on success', async () => {
    const expectedData = [mockedCity, mockedAlternativeCity];
    mockAxios.get.mockResolvedValue({ data: expectedData });

    const data = await searchCity(searchTerm, apiKey);

    expect(data).toEqual(mockedCity);
  });

  it('does not perform search if empty searchTerm provided', async () => {
    mockAxios.get.mockResolvedValue({ data: {} });

    await searchCity('', apiKey);

    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });
});
