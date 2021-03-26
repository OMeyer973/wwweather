import React from "react";
import "./weather.scss"

import { WeatherData } from "~/components/molecules/WeatherData";

// todo : make dynamic
import dayCloud3 from "~/components/atoms/icons/weather/day-cloud-3.svg"
import rain3 from "~/components/atoms/icons/weather/rain-3.svg"

import thermometer from "~/components/atoms/icons/weather/thermometer.svg"

export const Weather = () => {
  return (
    <div className="weather">
      <WeatherData label="Cloud coverage" icon={dayCloud3} value="5%"/>
      <WeatherData label="Risk of rain" icon={rain3} value="5%"/>
      <WeatherData label="Temperature" icon={thermometer} value="28°C"/>
    </div>
  )
}

