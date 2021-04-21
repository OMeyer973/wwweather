import React from "react";
import "./WeatherTab.scss";

import { WeatherData } from "~/components/abstracts/Types";

import { DataColumn } from "~components/molecules/DataColumn";

// todo : make dynamic
import dayCloud3 from "~/components/atoms/icons/weather/day-cloud-3.svg";
import rain3 from "~/components/atoms/icons/weather/rain-3.svg";

import thermometer from "~/components/atoms/icons/weather/thermometer.svg";

export interface Props {
  weatherData: WeatherData;
}

export const WeatherTab: React.FC<Props> = ({ weatherData }) => {
  return (
    <div className="weather-tab">
      <DataColumn
        label="Cloud coverage"
        icon={dayCloud3}
        value={weatherData.cloudCover.toFixed(0) + " %"}
      />
      <DataColumn
        label="Risk of rain"
        icon={rain3}
        value={weatherData.riskOfRain.toFixed(0) + " %"}
      />
      <DataColumn
        label="Temperature"
        icon={thermometer}
        value={weatherData.temperature.toFixed(0) + "°C"}
      />
    </div>
  );
};
