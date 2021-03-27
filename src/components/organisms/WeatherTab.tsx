import React from "react";
import "./WeatherTab.scss";

import { DataColumn } from "~components/molecules/DataColumn";

// todo : make dynamic
import dayCloud3 from "~/components/atoms/icons/weather/day-cloud-3.svg";
import rain3 from "~/components/atoms/icons/weather/rain-3.svg";

import thermometer from "~/components/atoms/icons/weather/thermometer.svg";

export const WeatherTab = () => {
  return (
    <div className="weather-tab">
      <DataColumn label="Cloud coverage" icon={dayCloud3} value="5%" />
      <DataColumn label="Risk of rain" icon={rain3} value="5%" />
      <DataColumn label="Temperature" icon={thermometer} value="28°C" />
    </div>
  );
};
