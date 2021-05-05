import React, { useRef, useEffect, useState } from "react";
import "./ForecastTab.scss";
import {
  ForecastGraph,
  GraphType,
} from "~components/atoms/ForecastGraphRechart";
import { Value } from "~components/atoms/Value";
import { makeRelativeTimeLabel } from "~components/organisms/TimeTab";
import { DataByHour } from "~/components/abstracts/Types";

import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

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
  const [graphType, setGraphType] = useState<GraphType>("wind");

  // const time = predictions[currentPredictionId].time;

  const options: { value: GraphType; label: string }[] = [
    { value: "wind", label: "Wind forecast" },
    { value: "waves", label: "Waves forecast" },
    { value: "weather", label: "Weather forecast" },
  ];
  return (
    <div className="forecast-tab">
      <h2>
        <Dropdown
          options={options}
          onChange={(e) => setGraphType(e.value)}
          // value={options[0]}
          placeholder="Wind forecast"
        />
      </h2>
      <ForecastGraph
        graphType={graphType} // todo add other graph types
        predictions={predictions}
        currentPredictionId={currentPredictionId}
        setCurrentPredictionId={setCurrentPredictionId}
      />
      <div className="time-info"></div>
    </div>
  );
};
