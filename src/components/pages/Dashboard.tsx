import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

import {
  Timetable,
  WeatherData,
  WindData,
  WavesData,
  DataByHour,
} from "~/components/abstracts/Types";

import { makeDataThisHour } from "~/components/abstracts/DataManagement";

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

const placeholderDataThisHour: DataByHour = {
  time: new Date(),
  weatherData: {
    cloudCover: 0,
    riskOfRain: 0,
    temperature: 0,
  },
  windData: {
    direction: 0,
    speed: 0,
    gusts: 0,
  },
  wavesData: {
    direction: 180,
    height: 0,
    tide: "low",
  },
};

const fetchWeatherData = async () => {
  // start yesterday at midnight (local time)
  const start = new Date(
    new Date().setHours(0, 0, 0, 0) - 86400000
  ).toISOString();
  const lat = 5.168286;
  const lng = -52.6446239;
  const res = await fetch(
    `https://api.stormglass.io/v2/weather/point?start=${start}&lat=${lat}&lng=${lng}&params=${"airTemperature,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,precipitation,seaLevel,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m"}`,
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

  //const [rawData, setRawData] = useState(null);
  const [dataThisHour, setDataThisHour] = useState(placeholderDataThisHour);

  useEffect(() => {
    const getTasks = async () => {
      const weatherFromServer = await fetchWeatherData();
      console.log(weatherFromServer);
      const newDataThisHour = makeDataThisHour(weatherFromServer.hours[0]);
      console.log(newDataThisHour);
      setDataThisHour(newDataThisHour);
    };
    getTasks();
  }, []);

  return (
    <>
      <Header />
      <section className="dashboard">
        <LocationTab location="Kourou" country="French Guiana" />
        <TimeTab time={dataThisHour.time} timetable={timetable} />
        <MapTab
          windData={dataThisHour.windData}
          wavesData={dataThisHour.wavesData}
        />
        <WeatherTab weatherData={dataThisHour.weatherData} />
        <div className="wind-waves-tab">
          <DirectionTab
            title="Wind"
            icon={windArrow}
            iconRotation={dataThisHour.windData.direction}
          >
            <DataRow
              label="Speed"
              value={dataThisHour.windData.speed.toFixed(0) + " kts"}
            />
            <DataRow
              label="Gusts"
              value={dataThisHour.windData.gusts.toFixed(0) + " kts"}
            />
            <DataRow
              label="Direction"
              value={
                angleToCardinal(dataThisHour.windData.direction) +
                " / " +
                dataThisHour.windData.direction.toFixed(0) +
                "°"
              }
            />
          </DirectionTab>
          <DirectionTab
            title="Waves"
            icon={wavesArrow}
            iconRotation={dataThisHour.wavesData.direction}
          >
            <DataRow
              label="Height"
              value={dataThisHour.wavesData.height.toFixed(1) + " m"}
            />
            <DataRow label="Tide" value={dataThisHour.wavesData.tide} />
            <DataRow
              label="Direction"
              value={
                angleToCardinal(dataThisHour.wavesData.direction) +
                " / " +
                dataThisHour.wavesData.direction.toFixed(0) +
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
