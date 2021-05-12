import React from "react";
import "./WeatherTab.scss";

import { WeatherData } from "~/components/abstracts/Types";
import { clamp } from "~components/abstracts/Common";

import { DataColumn } from "~components/molecules/DataColumn";

import dayCloud0 from "~/components/atoms/icons/weather/day-cloud-0.svg";
import dayCloud1 from "~/components/atoms/icons/weather/day-cloud-1.svg";
import dayCloud2 from "~/components/atoms/icons/weather/day-cloud-2.svg";
import dayCloud3 from "~/components/atoms/icons/weather/day-cloud-3.svg";
import dayCloud4 from "~/components/atoms/icons/weather/day-cloud-4.svg";

import rain0 from "~/components/atoms/icons/weather/rain-0.svg";
import rain1 from "~/components/atoms/icons/weather/rain-1.svg";
import rain2 from "~/components/atoms/icons/weather/rain-2.svg";
import rain3 from "~/components/atoms/icons/weather/rain-3.svg";

import thermometer from "~/components/atoms/icons/weather/thermometer.svg";

const rainIcons = [rain0, rain1, rain2, rain3];
const cloudIcons = [dayCloud0, dayCloud1, dayCloud2, dayCloud3, dayCloud4];

export interface Props {
  weatherData: WeatherData;
}

export const WeatherTab: React.FC<Props> = ({ weatherData }) => {
  return (
    <div className="weather-tab">
      <DataColumn
        label="Cloud cover"
        icon={
          cloudIcons[
            Math.floor(
              (clamp(weatherData.cloudCover, 0, 99) / 100) * cloudIcons.length
            )
          ]
        }
        value={weatherData.cloudCover.toFixed(0) + " %"}
      />
      <DataColumn
        label="Risk of rain"
        icon={
          rainIcons[
            Math.floor(
              (clamp(weatherData.riskOfRain, 0, 99) / 100) * rainIcons.length
            )
          ]
        }
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
