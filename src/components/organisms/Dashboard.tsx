import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

import {
  Location,
  Coordinates,
  Timetable,
  DataByHour,
} from "~/components/abstracts/Types";

import { oneDay, oneHour } from "~components/abstracts/DataManagement";
import {
  makeDataThisHour,
  isSameDay,
  minMax,
} from "~/components/abstracts/DataManagement";

import { LocationTab } from "~components/organisms/LocationTab";
import { TimeTab } from "~components/organisms/TimeTab";
import { MapTab } from "~components/organisms/MapTab";
import { WeatherTab } from "~components/organisms/WeatherTab";

import { DirectionTab } from "~components/organisms/DirectionTab";
import windArrow from "~/components/atoms/icons/wind-kite-arrow.svg";
import wavesArrow from "~/components/atoms/icons/waves-kite-arrow.svg";
import { DataRow } from "~components/molecules/DataRow";

import { ForecastTab } from "~components/organisms/ForecastTab";

import dummyRawWeatherData from "~components/abstracts/dummyRawWeatherData.json";

// start yesterday at midnight (local time)
const startDate = new Date(new Date().setHours(0, 0, 0, 0) - oneDay);
const numberDaysPredicted = 10;

const placeholderPredictions: DataByHour[] = [
  {
    time: startDate,
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
  },
];

const weatherKeys = [
  // "8ea1e1a8-ae72-11eb-849d-0242ac130002-8ea1e248-ae72-11eb-849d-0242ac130002",
  // "746e3610-6106-11eb-8ed6-0242ac130002-746e367e-6106-11eb-8ed6-0242ac130002",
  // "66b43972-ae8e-11eb-8d12-0242ac130002-66b439ea-ae8e-11eb-8d12-0242ac130002",
  "2c7517f8-ae8f-11eb-9f40-0242ac130002-2c7518fc-ae8f-11eb-9f40-0242ac130002",
  // "025354a6-b1e3-11eb-9f40-0242ac130002-0253551e-b1e3-11eb-9f40-0242ac130002",
  // "941a0b2a-b1e6-11eb-8d12-0242ac130002-941a0ba2-b1e6-11eb-8d12-0242ac130002",
  // "0b3a1686-b1f2-11eb-849d-0242ac130002-0b3a16fe-b1f2-11eb-849d-0242ac130002",
  // "bfd056a6-b1f6-11eb-8d12-0242ac130002-bfd0571e-b1f6-11eb-8d12-0242ac130002",
  // "5393b808-b1fa-11eb-8d12-0242ac130002-5393b880-b1fa-11eb-8d12-0242ac130002",
  // "3ebcf5e6-b1fc-11eb-80d0-0242ac130002-3ebcf65e-b1fc-11eb-80d0-0242ac130002",
];
const fetchWeatherData = async (coordinates: Coordinates) => {
  const lat = coordinates.latitude;
  const lng = coordinates.longitude;
  const res = await fetch(
    `https://api.stormglass.io/v2/weather/point?start=${startDate.toISOString()}&lat=${lat}&lng=${lng}&params=${"airTemperature,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,precipitation,seaLevel,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m"}`,
    {
      headers: {
        Authorization: weatherKeys[Date.now() % weatherKeys.length],
      },
    }
  );
  const data = await res.json();
  return data;
};

const getWeatherPredictions: (coordinates: Coordinates) => any = async (
  coordinates
) => {
  const weatherFromServer = await fetchWeatherData(coordinates);
  if (weatherFromServer.hours === undefined) {
    console.error(
      "couldn't fetch data from weather api, fallback to dummy data"
    );
    return;
  }
  const rawWeatherData =
    weatherFromServer.hours === undefined
      ? dummyRawWeatherData
      : weatherFromServer;

  return rawWeatherData.hours.map((hour: any) => makeDataThisHour(hour));
};

const fetchAstroData = async (coordinates: Coordinates) => {
  const endDate = new Date(
    startDate.valueOf() + numberDaysPredicted * oneDay - oneHour
  );
  const lat = coordinates.latitude;
  const lng = coordinates.longitude;
  const res = await fetch(
    `https://api.stormglass.io/v2/astronomy/point?start=${startDate.toISOString()}&end=${endDate.toISOString()}&lat=${lat}&lng=${lng}`,
    {
      headers: {
        Authorization: weatherKeys[Date.now() % weatherKeys.length],
      },
    }
  );
  const data = await res.json();
  return data;
};

const fetchTideData = async (coordinates: Coordinates) => {
  // further end date than astro data bc astro returns one data object per day vs one per tide here
  const endDate = new Date(
    startDate.valueOf() + numberDaysPredicted * oneDay + oneHour
  );
  const lat = coordinates.latitude;
  const lng = coordinates.longitude;
  const res = await fetch(
    `https://api.stormglass.io/v2/tide/extremes/point?start=${startDate.toISOString()}&end=${endDate.toISOString()}&lat=${lat}&lng=${lng}`,
    {
      headers: {
        Authorization: weatherKeys[Date.now() % weatherKeys.length],
      },
    }
  );
  const data = await res.json();
  return data;
};

const angleToCardinal = (angle: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
  return directions[Math.round((angle % 360) / 45)];
};

export interface Props {
  location: Location | null;
}

export const Dashboard: React.FC<Props> = ({ location }) => {
  const [predictions, setPredictions] = useState(placeholderPredictions); // todo make null & fix errors
  const [currentPredictionId, setCurrentPredictionId] = useState(0);
  const [astroData, setAstroData] = useState([]);
  const [tideData, setTideData] = useState([]);

  useEffect(() => {
    if (location && location.coordinates) {
      getWeatherPredictions(location.coordinates).then(
        (newPredictions: DataByHour[]) => {
          setPredictions(newPredictions);
          setCurrentPredictionId(
            newPredictions.findIndex(
              (item: DataByHour) =>
                Math.abs(item.time.valueOf() - Date.now()) < oneHour
            )
          );
        }
      );

      fetchAstroData(location.coordinates).then((newAstroData) =>
        setAstroData(newAstroData.data)
      );
      fetchTideData(location.coordinates).then((newTideData) =>
        setTideData(newTideData.data)
      );
    }
  }, [location]);

  return (
    <>
      <section className="dashboard">
        <LocationTab
          location={location ? location.name : ""}
          country={location ? location.region : ""}
        />
        <TimeTab
          // time={predictions[currentPredictionId].time}
          currentPredictionId={currentPredictionId}
          astroData={astroData}
          tideData={tideData}
          predictions={predictions}
          onMinus3hours={() => {
            setCurrentPredictionId(Math.max(0, currentPredictionId - 3));
          }}
          onPlus3hours={() =>
            setCurrentPredictionId(
              Math.min(predictions.length - 1, currentPredictionId + 3)
            )
          }
        />

        <MapTab
          location={location}
          windData={predictions[currentPredictionId].windData}
          wavesData={predictions[currentPredictionId].wavesData}
        />
        <WeatherTab
          weatherData={predictions[currentPredictionId].weatherData}
        />
        <div className="wind-waves-tab">
          <DirectionTab
            title="Wind"
            icon={windArrow}
            iconRotation={predictions[currentPredictionId].windData.direction}
          >
            <DataRow
              label="Speed"
              value={
                predictions[currentPredictionId].windData.speed.toFixed(0) +
                " kts"
              }
            />
            <DataRow
              label="Gusts"
              value={
                predictions[currentPredictionId].windData.gusts.toFixed(0) +
                " kts"
              }
            />
            <DataRow
              label="Direction"
              value={
                angleToCardinal(
                  predictions[currentPredictionId].windData.direction
                ) +
                " / " +
                predictions[currentPredictionId].windData.direction.toFixed(0) +
                "°"
              }
            />
          </DirectionTab>
          {!predictions[currentPredictionId].wavesData ? (
            ""
          ) : (
            <DirectionTab
              title="Waves"
              icon={wavesArrow}
              iconRotation={
                predictions[currentPredictionId].wavesData.direction
              }
            >
              <DataRow
                label="Height"
                value={
                  predictions[currentPredictionId].wavesData.height.toFixed(1) +
                  " m"
                }
              />
              <DataRow
                label="Tide"
                value={predictions[currentPredictionId].wavesData.tide}
              />
              <DataRow
                label="Direction"
                value={
                  angleToCardinal(
                    predictions[currentPredictionId].wavesData.direction
                  ) +
                  " / " +
                  predictions[currentPredictionId].wavesData.direction.toFixed(
                    0
                  ) +
                  "°"
                }
              />
            </DirectionTab>
          )}
        </div>
        <ForecastTab
          predictions={predictions}
          currentPredictionId={currentPredictionId}
          setCurrentPredictionId={setCurrentPredictionId}
        />
      </section>
    </>
  );
};
