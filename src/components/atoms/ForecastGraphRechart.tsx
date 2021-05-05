import React, { useRef, useEffect, useState } from "react";
import "./ForecastGraphRechart.scss";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import Color from "color";

import { DataByHour } from "~/components/abstracts/Types";
import {
  oneDay,
  oneHour,
  clamp,
  throttle,
} from "~components/abstracts/DataManagement";

import { Gradient } from "~/components/abstracts/Gradient";
import BoundedLabel from "~components/atoms/BoundedLabel";
import { Value } from "~components/atoms/Value";
import { Magnet } from "~components/atoms/Magnet";
import { makeRelativeTimeLabel } from "~components/organisms/TimeTab";

export type GraphType = "wind" | "waves" | "weather";

import {
  StaticForecastGraph,
  GraphColorScheme,
  GraphProperties,
  GraphDataPoint,
  GridPoint,
} from "~components/atoms/StaticForecastGraph";

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

const windColors = new Gradient(
  Color("#ffffff"),
  Color("#ffa200"),
  Color("#ff6000"),
  Color("#c30017"),
  Color("#45002d"),
  Color("#000000")
);

const graphColors = windColors; // todod : rm

const windSpeedColorScheme: GraphColorScheme = {
  gradient: windColors,
  strokeColor: new Color("#c30017"),
  opacity: 0.9,
};

const windGustsColorScheme: GraphColorScheme = {
  gradient: windColors,
  strokeColor: new Color("#45002d"),
  opacity: 1,
};

const wavesGraphColors = new Gradient(
  Color("#ffffff"),
  Color("#88eaff"),
  Color("#00ff7e"),
  Color("#177d92"),
  Color("#171792"),
  Color("#000000")
);

const wavesHeightColorScheme: GraphColorScheme = {
  gradient: wavesGraphColors,
  strokeColor: new Color("#177d92"),
  opacity: 1,
};

const seaLevelColorScheme: GraphColorScheme = {
  gradient: wavesGraphColors,
  strokeColor: new Color("#177d92"),
  opacity: 1,
};

const cloudsGraphColors = new Gradient(
  Color("#fdff5f"),
  Color("#8f9e8f"),
  Color("#737385"),
  Color("#4a444e")
);

const cloudsColorScheme: GraphColorScheme = {
  gradient: cloudsGraphColors,
  strokeColor: new Color("#737385"),
  opacity: 0.5,
};

const rainGraphColors = new Gradient(
  Color("#fdff5f"),
  Color("#6aacb0"),
  Color("#1c4b85"),
  Color("#152f4e")
);

const rainColorScheme: GraphColorScheme = {
  gradient: rainGraphColors,
  strokeColor: new Color("#1c4b85"),
  opacity: 0.5,
};

const temperatureGraphColors = new Gradient(
  Color("#00162e"),
  Color("#2e47ff"),
  Color("#a31fa3"),
  Color("#b82828"),
  Color("#3c0d1d")
);

const temperatureColorScheme: GraphColorScheme = {
  gradient: temperatureGraphColors,
  strokeColor: new Color("#a31fa3"),
  opacity: 0,
  fatStroke: true,
};

// for drawing days separation in graph
const daysPredicted = 10;
// for drawing danger color in graph (in kts)
const yAxisMax = 40;

export interface Props {
  graphType: GraphType;
  predictions: DataByHour[];
  currentPredictionId: number;
  setCurrentPredictionId: React.Dispatch<React.SetStateAction<number>>;
}

////////////////////////////////////////////////
//////// COMPONENT BEGIN
export const ForecastGraph: React.FC<Props> = ({
  graphType,
  predictions,
  currentPredictionId,
  setCurrentPredictionId,
}) => {
  // LAYOUT
  const graphContainer = useRef(null);
  useResize(graphContainer);
  const graphContainerWidth = graphContainer.current
    ? graphContainer.current.offsetWidth
    : 0;
  const graphWidth: number = isTouchEnabled()
    ? Math.max(800, graphContainerWidth)
    : graphContainerWidth;

  // DATA
  const graphProperties: GraphProperties =
    graphType === "wind"
      ? { colors: [windSpeedColorScheme, windGustsColorScheme], maxY: 40 }
      : graphType === "waves"
      ? { colors: [wavesHeightColorScheme, seaLevelColorScheme], maxY: 8 }
      : graphType === "weather"
      ? {
          colors: [temperatureColorScheme, rainColorScheme, cloudsColorScheme],
          maxY: 100,
        }
      : { colors: [], maxY: 0 };

  const currTime = predictions[currentPredictionId].time;

  const graphData: GraphDataPoint[] =
    predictions === undefined
      ? []
      : predictions
          .filter((prediction) => prediction.time.getHours() % 3 === 0)
          .map((prediction) => ({
            value0:
              graphType === "wind"
                ? prediction.windData.speed
                : graphType === "waves"
                ? prediction.wavesData.height
                : graphType === "weather"
                ? prediction.weatherData.temperature
                : 0,

            value1:
              graphType === "wind"
                ? prediction.windData.gusts
                : graphType === "waves"
                ? 0 // todo : sea level (!= prediction.wavesData.tide)
                : graphType === "weather"
                ? prediction.weatherData.riskOfRain
                : 0,

            value2:
              graphType === "wind"
                ? 0
                : graphType === "waves"
                ? 0
                : graphType === "weather"
                ? prediction.weatherData.cloudCover
                : 0,

            time: prediction.time,
          }));

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
    <>
      <div className="forecast-graph" ref={graphContainer}>
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
        <StaticForecastGraph
          graphData={graphData}
          graphProperties={graphProperties}
          graphWidth={graphWidth}
          onMouseMove={setPredictionFromMouseEvent}
          // onMouseMove={throttle(setPredictionFromMouseEvent, 70)}
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
    </>
  );
};
