import React, { FC } from 'react';

import { Widget } from './Widget/Widget';
import { WidgetQueryClientContextProvider } from '../context/WidgetQueryClientContext';

export interface IProps {
  defaultCity: string;
  apiKey: string;
  refetchInterval?: number;
  orientation?: 'horizontal' | 'vertical';
}

const ReactCityWeatherReportWidget: FC<IProps> = ({
  defaultCity,
  apiKey,
  refetchInterval,
  orientation = 'vertical',
}) => {
  return (
    <WidgetQueryClientContextProvider>
      <Widget
        defaultCity={defaultCity}
        apiKey={apiKey}
        refetchInterval={refetchInterval}
        orientation={orientation}
      />
    </WidgetQueryClientContextProvider>
  );
};

export default ReactCityWeatherReportWidget;
