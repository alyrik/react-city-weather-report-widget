import React from 'react';

import ReactCityWeatherReportWidget, {
  IProps,
} from './ReactCityWeatherReportWidget';
import { Story } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default {
  title: 'ReactCityWeatherReportWidget',
  component: ReactCityWeatherReportWidget,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: Story<IProps> = (args) => (
  <QueryClientProvider client={queryClient}>
    <div
      style={{
        padding: '30px',
        minHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <ReactCityWeatherReportWidget
        {...args}
        defaultCity="Wrocław"
        refetchInterval={1000 * 30}
        apiKey={process.env.STORYBOOK_OPEN_WEATHER_MAP_API_KEY as string}
      />
    </div>
  </QueryClientProvider>
);

export const Vertical = Template.bind({});

export const Horizontal = Template.bind({});
Horizontal.args = {
  orientation: 'horizontal',
};
