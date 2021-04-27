import React, { useRef, useEffect, useState } from "react";
import "./ForecastTab.scss";

import { ForecastGraph } from "~components/atoms/ForecastGraphRechart";
import { Value } from "~components/atoms/Value";
import { makeRelativeTimeLabel } from "~components/organisms/TimeTab";
import { DataByHour } from "~/components/abstracts/Types";

export interface Props {
  predictions: DataByHour[];
  currentPredictionId: number;
  setCurrentPredictionId: React.Dispatch<React.SetStateAction<number>>;
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ForecastTab: React.FC<Props> = ({
  predictions,
  currentPredictionId,
  setCurrentPredictionId,
}) => {
  const time = predictions[currentPredictionId].time;

  return (
    <div className="forecast-tab">
      <h2>Forecast</h2>
      <ForecastGraph
        predictions={predictions}
        currentPredictionId={currentPredictionId}
        setCurrentPredictionId={setCurrentPredictionId}
      />
      <div className="time-info">
        <Value flavor="slim">
          {weekDays[(time.getDay() + 6) % 7] +
            " " +
            months[time.getMonth()].toLowerCase() +
            " " +
            time.getDate() +
            ", " +
            ("00" + time.getHours()).slice(-2) +
            ":" +
            ("00" + time.getMinutes()).slice(-2) +
            " (" +
            makeRelativeTimeLabel(time) +
            ")"}
        </Value>
      </div>
    </div>
  );
};
