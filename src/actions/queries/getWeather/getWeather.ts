import axios from 'axios';

import { apiProviderConfig } from '../../../config/apiProviderConfig';
import { IWeather } from '../../../models/weather';

export const getWeather = async (
  [lat, lon]: [lat: number | undefined, lon: number | undefined],
  apiKey: string,
): Promise<IWeather | null> => {
  const { data } = await axios.get(
    `${apiProviderConfig.baseUrl}/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: apiKey,
      },
    },
  );

  return data;
};
