import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

import {
  Timetable,
  WeatherData,
  WindData,
  WavesData,
} from "~/components/abstracts/Types";

import Header from "~/components/organisms/Header";

import { LocationTab } from "~components/organisms/LocationTab";
import { TimeTab } from "~components/organisms/TimeTab";
import { MapTab } from "~components/organisms/MapTab";
import { WeatherTab } from "~components/organisms/WeatherTab";

import { DirectionTab } from "~components/organisms/DirectionTab";
import windArrow from "~/components/atoms/icons/wind-kite-arrow.svg";
import wavesArrow from "~/components/atoms/icons/waves-kite-arrow.svg";
import { DataRow } from "~components/molecules/DataRow";

import { ForecastTab } from "~components/organisms/ForecastTab";

const timetable: Timetable = {
  sunrise: "06:47",
  sunset: "06:47",

  firstLowTide: "06:47",
  secondLowTide: "06:47",
  firstHighTide: "06:47",
  secondHighTide: "06:47",

  fastestWind: "06:47",
  slowestWind: "06:47",

  highestWaves: "06:47",
  lowestWaves: "06:47",
};

const weatherData: WeatherData = {
  cloudCover: 5,
  riskOfRain: 20,
  temperature: 28,
};

const windData: WindData = {
  direction: 69,
  speed: 8,
  gusts: 15,
};

const wavesData: WavesData = {
  direction: 90,
  height: 2,
  tide: "rising",
};

const fetchWeatherData = async () => {
  const res = await fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${5.168286}&lng=${-52.6446239}&params=${"airTemperature,airTemperature80m,airTemperature100m,airTemperature1000hpa,airTemperature800hpa,airTemperature500hpa,airTemperature200hpa,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,iceCover,precipitation,snowDepth,seaLevel,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,visibility,waterTemperature,waveDirection,waveHeight,wavePeriod,windWaveDirection,windWaveHeight,windWavePeriod,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windDirection1000hpa,windDirection800hpa,windDirection500hpa,windDirection200hpa,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m,windSpeed1000hpa,windSpeed800hpa,windSpeed500hpa,windSpeed200hpa"}`,
    {
      headers: {
        Authorization:
          "746e3610-6106-11eb-8ed6-0242ac130002-746e367e-6106-11eb-8ed6-0242ac130002",
      },
    }
  );
  const data = await res.json();
  return data;
};

export const Dashboard: React.FC = () => {
  const angleToCardinal = (angle: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    return directions[Math.round((angle % 360) / 45)];
  };

  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      const weatherFromServer = await fetchWeatherData();
      setRawData(weatherFromServer);
    };
    getTasks();
  }, []);

  return (
    <>
      <Header />
      <section className="dashboard">
        <LocationTab />
        <TimeTab
          date="Monday, february 8th"
          time="21:00"
          timetable={timetable}
        />
        <MapTab windData={windData} wavesData={wavesData} />
        <WeatherTab weatherData={weatherData} />
        <div className="wind-waves-tab">
          <DirectionTab
            title="Wind"
            icon={windArrow}
            iconRotation={windData.direction}
          >
            <DataRow label="Speed" value={windData.speed.toFixed(0) + " kts"} />
            <DataRow label="Gusts" value={windData.gusts.toFixed(0) + " kts"} />
            <DataRow
              label="Direction"
              value={
                angleToCardinal(windData.direction) +
                " / " +
                windData.direction.toFixed(0) +
                "°"
              }
            />
          </DirectionTab>
          <DirectionTab
            title="Waves"
            icon={wavesArrow}
            iconRotation={wavesData.direction}
          >
            <DataRow
              label="Height"
              value={wavesData.height.toFixed(1) + " m"}
            />
            <DataRow label="Tide" value={wavesData.tide} />
            <DataRow
              label="Direction"
              value={
                angleToCardinal(wavesData.direction) +
                " / " +
                wavesData.direction.toFixed(0) +
                "°"
              }
            />
          </DirectionTab>
        </div>
        <ForecastTab />
      </section>
    </>
  );
};
