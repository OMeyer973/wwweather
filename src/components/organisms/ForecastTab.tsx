import React, { useRef, useEffect, useState } from "react";
import "./ForecastTab.scss";
import Dropdown from "react-dropdown";
import { DataByHour } from "~/components/abstracts/Types";
import { oneHour, clamp, throttle } from "~components/abstracts/DataManagement";
import BoundedLabel from "~components/atoms/BoundedLabel";
import { Magnet } from "~components/atoms/Magnet";
import { ForecastGraph } from "~components/atoms/ForecastGraph";
import { makeRelativeTimeLabel } from "~components/organisms/TimeTab";

export type GraphType = "wind" | "waves" | "weather";

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

const isTouchEnabled = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

const useResize = (myRef: any) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth);
      setHeight(myRef.current.offsetHeight);
    };
    window.addEventListener("resize", throttle(handleResize, 200));
    return () => {
      window.removeEventListener("resize", throttle(handleResize, 200));
    };
  }, [myRef]);
  return { width, height };
};

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

  const options: { value: GraphType; label: string }[] = [
    { value: "wind", label: "Wind forecast" },
    { value: "waves", label: "Waves forecast" },
    { value: "weather", label: "Weather forecast" },
  ];

  const graphContainer = useRef(null);
  useResize(graphContainer);
  const graphContainerWidth = graphContainer.current
    ? graphContainer.current.offsetWidth
    : 0;
  const graphWidth: number = isTouchEnabled()
    ? Math.max(800, graphContainerWidth)
    : graphContainerWidth;

  const currTime = predictions[currentPredictionId].time;

  const setPredictionFromMouseEvent = (e: any) =>
    e == null || e.chartX == undefined
      ? {}
      : setCurrentPredictionId(
          clamp(
            Math.floor((e.chartX / graphWidth) * predictions.length),
            0,
            predictions.length - 1
          )
        );

  const primaryCursorPosition =
    (currentPredictionId / predictions.length) * graphWidth;
  const secondaryCursorPosition =
    (predictions.findIndex(
      (item) => Math.abs(item.time.valueOf() - Date.now()) < oneHour
    ) /
      predictions.length) *
    graphWidth;

  return (
    <div className="forecast-tab">
      <h2>
        <Dropdown
          options={options}
          onChange={(e) => setGraphType(e.value)}
          placeholder={options[0].value}
        />
      </h2>

      <div className="graph-holder" ref={graphContainer}>
        <div
          className="cursor secondary"
          style={{
            left: secondaryCursorPosition.toFixed(0) + "px",
          }}
        ></div>
        <div
          className="cursor primary"
          style={{
            left: primaryCursorPosition.toFixed(0) + "px",
          }}
        ></div>
        <ForecastGraph
          predictions={predictions}
          graphType={graphType}
          graphWidth={graphWidth}
          onMouseMove={setPredictionFromMouseEvent}
        />

        <BoundedLabel
          minX={0}
          maxX={graphWidth}
          centerX={secondaryCursorPosition}
          className="graph-label"
        >
          <Magnet color="secondary">Now </Magnet>
        </BoundedLabel>

        <BoundedLabel
          size={{ width: 120, height: 100 }} // non mandatory, prevents flickering
          minX={0}
          maxX={graphWidth}
          centerX={primaryCursorPosition}
          className="graph-label"
        >
          <Magnet>
            {weekDays[(currTime.getDay() + 6) % 7] +
              " " +
              months[currTime.getMonth()].toLowerCase() +
              " " +
              currTime.getDate() +
              ", " +
              ("00" + currTime.getHours()).slice(-2) +
              ":" +
              ("00" + currTime.getMinutes()).slice(-2)}
          </Magnet>
          <br />
          <label className="label">
            {" (" + makeRelativeTimeLabel(currTime) + ")"}
          </label>
        </BoundedLabel>
      </div>
    </div>
  );
};
