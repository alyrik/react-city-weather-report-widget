import React from 'react';
import { render, screen } from '@testing-library/react';
import { UseQueryResult } from '@tanstack/react-query';

import * as useSearchCityModule from '../../actions/queries/searchCity/useSearchCity';
import * as useGetWeatherModule from '../../actions/queries/getWeather/useGetWeather';
import { ICity } from '../../models/city';
import { mockedAlternativeCity, mockedCity } from '../../tests/mocks/city.mock';
import {
  mockedAlternativeWeather,
  mockedWeather,
} from '../../tests/mocks/weather.mock';
import { IWeather } from '../../models/weather';
import { WidgetQueryClientProviderMock } from '../../tests/mocks/QueryClientProvider.mock';
import { Widget } from './Widget';
import { renderWithUserEvent } from '../../tests/utils/renderWithUserEvent';

const mockUseSearchCityData = (result: Partial<UseQueryResult<ICity>>) =>
  jest
    .spyOn(useSearchCityModule, 'useSearchCity')
    .mockReturnValue(result as UseQueryResult<ICity>);

const mockUseGetWeatherData = (result: Partial<UseQueryResult<IWeather>>) =>
  jest
    .spyOn(useGetWeatherModule, 'useGetWeather')
    .mockReturnValue(result as UseQueryResult<IWeather>);

const getInput = () => screen.getByPlaceholderText('Enter city name');
const getButton = () => screen.getByText('🔍');

describe('Widget', () => {
  it('loads and shows full data', () => {
    mockUseSearchCityData({ data: mockedCity });
    mockUseGetWeatherData({ data: mockedWeather });
    render(
      <WidgetQueryClientProviderMock>
        <Widget
          apiKey="apiKey"
          defaultCity={mockedCity.name}
          orientation="vertical"
        />
      </WidgetQueryClientProviderMock>,
    );

    expect(screen.getByDisplayValue(mockedCity.name)).toBeVisible();
    expect(
      screen.getByText(`${mockedCity.name}, ${mockedCity.country}`),
    ).toBeVisible();
    expect(
      screen.getByText(mockedWeather.weather?.[0].description),
    ).toBeVisible();
    expect(
      screen.getByText(
        `🌡 ${Math.round(mockedWeather.main.temp)}°, feels like ${Math.round(
          mockedWeather.main.feels_like,
        )}°`,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(`💨 ${mockedWeather.wind.speed} km/h`),
    ).toBeVisible();
    expect(
      screen.getByText(`💦 ${mockedWeather.main.humidity}%`),
    ).toBeVisible();
    expect(
      screen.getByText(`🤯 ${mockedWeather.main.pressure} mb`),
    ).toBeVisible();
  });

  it('loads and shows full data for the city provided by user', async () => {
    mockUseSearchCityData({ data: mockedCity });
    mockUseGetWeatherData({ data: mockedWeather });
    const { user } = renderWithUserEvent(
      <WidgetQueryClientProviderMock>
        <Widget
          apiKey="apiKey"
          defaultCity={mockedCity.name}
          orientation="vertical"
          refetchInterval={60000}
        />
      </WidgetQueryClientProviderMock>,
    );
    const input = getInput();
    const button = getButton();

    await user.clear(input);
    await user.type(input, mockedAlternativeCity.name);

    expect(screen.getByDisplayValue(mockedAlternativeCity.name)).toBeVisible();

    const useSearchCityDataMock = mockUseSearchCityData({
      data: mockedAlternativeCity,
    });
    const useGetWeatherMock = mockUseGetWeatherData({
      data: mockedAlternativeWeather,
    });

    await user.click(button);

    expect(useSearchCityDataMock).toHaveBeenLastCalledWith(
      mockedAlternativeCity.name,
      { apiKey: 'apiKey' },
    );
    expect(useGetWeatherMock).toHaveBeenLastCalledWith(
      [mockedAlternativeCity.lat, mockedAlternativeCity.lon],
      { refetchInterval: 60000, isEnabled: true, apiKey: 'apiKey' },
    );
    expect(
      screen.getByText(
        `${mockedAlternativeCity.name}, ${mockedAlternativeCity.country}`,
      ),
    ).toBeVisible();
  });

  it('shows error on network or API errors', async () => {
    mockUseSearchCityData({ isError: true });
    mockUseGetWeatherData({});
    renderWithUserEvent(
      <WidgetQueryClientProviderMock>
        <Widget
          apiKey="apiKey"
          defaultCity={mockedCity.name}
          orientation="vertical"
        />
      </WidgetQueryClientProviderMock>,
    );

    expect(
      screen.getByText("Sorry, we couldn't load data.", { exact: false }),
    ).toBeVisible();
  });

  it('shows NotFound message on empty search result', async () => {
    mockUseSearchCityData({ data: undefined, isSuccess: true });
    mockUseGetWeatherData({});
    renderWithUserEvent(
      <WidgetQueryClientProviderMock>
        <Widget
          apiKey="apiKey"
          defaultCity={mockedCity.name}
          orientation="vertical"
        />
      </WidgetQueryClientProviderMock>,
    );

    expect(
      screen.getByText("Sorry, we couldn't find the city you provided.", {
        exact: false,
      }),
    ).toBeVisible();
  });
});
