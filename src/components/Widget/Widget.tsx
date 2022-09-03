import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import { useSearchCity } from '../../actions/queries/searchCity/useSearchCity';
import { useGetWeather } from '../../actions/queries/getWeather/useGetWeather';
import { Loader } from '../Loader/Loader';
import { weatherImages } from '../../config/weatherImages';
import { WeatherType } from '../../models/weather';
import {
  StyledButton,
  StyledContent,
  StyledForm,
  StyledInfo,
  StyledInput,
  StyledLoaderWrapper,
  StyledMaskedImage,
  StyledMessage,
  StyledRoot,
  StyledRow,
} from './Widget.styled';

export interface IProps {
  apiKey: string;
  defaultCity: string;
  orientation: 'horizontal' | 'vertical';
  refetchInterval?: number;
}

const defaultWeatherType: WeatherType = 'Clear';

export const Widget: FC<IProps> = ({
  defaultCity,
  refetchInterval,
  apiKey,
  orientation,
}) => {
  const [currentCity, setCurrentCity] = useState(defaultCity);
  const [inputValue, setInputValue] = useState(currentCity);
  const [latestWeatherType, setLatestWeatherType] =
    useState<WeatherType>(defaultWeatherType);

  const {
    data: cityData,
    isError: isCityError,
    isSuccess: isCitySuccess,
    isLoading: isCityLoading,
  } = useSearchCity(currentCity, { apiKey });
  const isWeatherQueryEnabled = Boolean(cityData?.lat && cityData?.lon);

  const {
    data: weatherData,
    isError: isWeatherError,
    isLoading: isWeatherLoading,
  } = useGetWeather([cityData?.lat, cityData?.lon], {
    isEnabled: isWeatherQueryEnabled,
    refetchInterval,
    apiKey,
  });
  const currentWeatherType = weatherData?.weather?.[0].main as WeatherType;

  useEffect(() => {
    if (currentWeatherType) {
      setLatestWeatherType(currentWeatherType);
    }
  }, [currentWeatherType]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    setCurrentCity(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };

  return (
    <StyledRoot orientation={orientation}>
      <StyledMaskedImage
        style={{
          backgroundImage: `url(${weatherImages[latestWeatherType]})`,
        }}
      />
      {(isCityLoading || (isWeatherLoading && isWeatherQueryEnabled)) && (
        <StyledLoaderWrapper>
          <Loader />
        </StyledLoaderWrapper>
      )}
      <StyledContent>
        <StyledForm onSubmit={handleFormSubmit}>
          <StyledInput
            type="text"
            placeholder="Enter city name"
            value={inputValue}
            onChange={handleInputChange}
          />
          <StyledButton type="submit">🔍</StyledButton>
        </StyledForm>
        {(isCityError || isWeatherError) && (
          <StyledMessage>
            Sorry, we couldn't load data.
            <br />
            Check out your network or try again later.
          </StyledMessage>
        )}
        {isCitySuccess && !cityData && !isCityError && (
          <StyledMessage>
            Sorry, we couldn't find the city you provided.
            <br />
            Please, try another search.
          </StyledMessage>
        )}
        {weatherData && (
          <StyledInfo orientation={orientation}>
            <StyledRow>
              {cityData?.name}, {cityData?.country}
            </StyledRow>
            <StyledRow>{weatherData.weather?.[0].description}</StyledRow>
            <StyledRow>
              🌡 {Math.round(weatherData.main.temp)}°, feels like{' '}
              {Math.round(weatherData.main.feels_like)}°
            </StyledRow>
            <StyledRow>💨 {weatherData.wind.speed} km/h</StyledRow>
            <StyledRow>💦 {weatherData.main.humidity}%</StyledRow>
            <StyledRow>🤯 {weatherData.main.pressure} mb</StyledRow>
          </StyledInfo>
        )}
      </StyledContent>
    </StyledRoot>
  );
};
