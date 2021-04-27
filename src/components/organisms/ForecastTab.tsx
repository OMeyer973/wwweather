import React, { useRef, useEffect, useState } from "react";
import "./ForecastTab.scss";

import { ForecastGraph } from "~components/atoms/ForecastGraphRechart";

import { DataByHour } from "~/components/abstracts/Types";

export interface Props {
  predictions: DataByHour[];
  currentPredictionId: number;
  setCurrentPredictionId: React.Dispatch<React.SetStateAction<number>>;
}

export const ForecastTab: React.FC<Props> = ({
  predictions,
  currentPredictionId,
  setCurrentPredictionId,
}) => {
  return (
    <div className="forecast-tab">
      <h2>Forecast</h2>
      <ForecastGraph
        predictions={predictions}
        currentPredictionId={currentPredictionId}
        setCurrentPredictionId={setCurrentPredictionId}
      />
    </div>
  );
};
