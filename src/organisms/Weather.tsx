import React from "react";

import { WeatherData } from "~/molecules/WeatherData";

// todo : make dynamic
import dayCloud3 from "~/vector/weather/day-cloud-3.svg"
import rain3 from "~/vector/weather/rain-3.svg"

import thermometer from "~/vector/weather/thermometer.svg"

export const Weather = () => {
  return (
    <div id="weather-tab" className="tab">
      <div className="flex flex--horizontal">
        <WeatherData label="Cloud coverage" icon={dayCloud3} value="5%"/>
        <WeatherData label="Risk of rain" icon={rain3} value="5%"/>
        <WeatherData label="Temperature" icon={thermometer} value="28°C"/>
      </div>
    </div>
  )
}

