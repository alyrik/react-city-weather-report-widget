import axios from 'axios';

import { apiProviderConfig } from '../../../config/apiProviderConfig';
import { ICity } from '../../../models/city';

export const searchCity = async (
  searchTerm: string,
  apiKey: string,
): Promise<ICity | null> => {
  if (!searchTerm) return null;

  const { data } = await axios.get(
    `${apiProviderConfig.baseUrl}/geo/1.0/direct`,
    {
      params: {
        q: searchTerm,
        limit: 3,
        appid: apiKey,
      },
    },
  );

  return data?.[0] ?? null;
};
