import { IWeather } from '../../models/weather';

export const mockedWeather: IWeather = {
  weather: [
    {
      main: 'Clear',
      description: 'clear sky',
      icon: '01n',
    },
  ],
  main: {
    temp: 15.39,
    feels_like: 14.63,
    temp_min: 12.7,
    temp_max: 16.02,
    pressure: 1023,
    humidity: 63,
  },
  wind: {
    speed: 3.6,
  },
};

export const mockedAlternativeWeather: IWeather = {
  weather: [
    {
      main: 'Clouds',
      description: 'Small clouds',
      icon: '02n',
    },
  ],
  main: {
    temp: 14.31,
    feels_like: 11.63,
    temp_min: 13.7,
    temp_max: 16.02,
    pressure: 1000,
    humidity: 60,
  },
  wind: {
    speed: 2,
  },
};
