import React, { useRef, useEffect, useState } from "react";
import "./ForecastTab.scss";

import { ForecastGraph } from "~components/atoms/ForecastGraphRechart";

import { DataByHour } from "~/components/abstracts/Types";

const data = [
  {
    windSpeed: 4000,
    maxWindSpeed: 2400,
    time: new Date(2400),
  },
  {
    windSpeed: 3000,
    maxWindSpeed: 1398,
    time: new Date(2210),
  },
  {
    windSpeed: 2000,
    maxWindSpeed: 9800,
    time: new Date(2290),
  },
  {
    windSpeed: 2780,
    maxWindSpeed: 3908,
    time: new Date(2000),
  },
  {
    windSpeed: 1890,
    maxWindSpeed: 4800,
    time: new Date(2181),
  },
  {
    windSpeed: 2390,
    maxWindSpeed: 3800,
    time: new Date(2500),
  },
  {
    windSpeed: 3490,
    maxWindSpeed: 4300,
    time: new Date(2100),
  },
];

export interface Props {
  predictions: DataByHour[];
  currentPredictionId: number;
}

export const ForecastTab: React.FC<Props> = ({
  predictions,
  currentPredictionId,
}) => {
  return (
    <div className="forecast-tab">
      <h2>Forecast</h2>
      <ForecastGraph predictions={predictions} />
    </div>
  );
};
