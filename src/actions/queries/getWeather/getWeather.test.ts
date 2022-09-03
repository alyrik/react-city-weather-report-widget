import mockAxios from 'jest-mock-axios';

import { getWeather } from './getWeather';
import { apiProviderConfig } from '../../../config/apiProviderConfig';
import { mockedWeather } from '../../../tests/mocks/weather.mock';

const apiKey = 'apiKey';

describe('getWeather', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('requests correct URL', async () => {
    mockAxios.get.mockResolvedValue({ data: {} });

    await getWeather([1, 2], apiKey);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `${apiProviderConfig.baseUrl}/data/2.5/weather`,
      {
        params: {
          lat: 1,
          lon: 2,
          units: 'metric',
          appid: apiKey,
        },
      },
    );
  });

  it('returns data on success', async () => {
    mockAxios.get.mockResolvedValue({ data: mockedWeather });

    const data = await getWeather([1, 2], apiKey);

    expect(data).toEqual(mockedWeather);
  });
});
