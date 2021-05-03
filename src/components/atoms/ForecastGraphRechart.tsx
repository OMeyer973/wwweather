import React, { useRef, useEffect, useState } from "react";
import "./ForecastGraphRechart.scss";
import { DataByHour } from "~/components/abstracts/Types";
import { clamp } from "~/components/abstracts/DataManagement";
import { oneDay, oneHour } from "~components/abstracts/DataManagement";

import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

import Color from "color";
import { Gradient } from "~/components/abstracts/Gradient";

export type GraphType = "wind" | "waves" | "weather";

export interface GraphColorScheme {
  gradient: Gradient;
  strokeColor: Color;
  opacity: number;
  fatStroke?: boolean;
}

export interface GraphProperties {
  colors: GraphColorScheme[];
  maxY: number;
}

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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);
  return { width, height };
};

// const graphColors = new Gradient(
//   Color("#b94cff"),
//   Color("#413cff"),
//   Color("#00f7ff"),
//   Color("#ffff00"),
//   Color("#ff0000"),
//   Color("#510049")
// );

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

export const ForecastGraph: React.FC<Props> = ({
  graphType,
  predictions,
  currentPredictionId,
  setCurrentPredictionId,
}) => {
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

  const graphContainer = useRef(null);
  useResize(graphContainer);

  const graphContainerWidth = graphContainer.current
    ? graphContainer.current.offsetWidth
    : 0;

  const graphWidth = isTouchEnabled()
    ? Math.max(800, graphContainerWidth)
    : graphContainerWidth;

  const data =
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
            timeStamp: prediction.time.valueOf(),
            label: prediction.time.toDateString().slice(0, -5),
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
  return (
    <>
      <script src="node_modules/dragscroll/dragscroll.js"></script>
      <div className="forecast-graph" ref={graphContainer}>
        <div
          className="cursor secondary"
          style={{
            marginLeft:
              (
                (predictions.findIndex(
                  (item) => Math.abs(item.time.valueOf() - Date.now()) < oneHour
                ) /
                  predictions.length) *
                graphWidth
              ).toFixed(4) + "px",
          }}
        ></div>
        <div
          className="cursor primary"
          style={{
            marginLeft:
              ((currentPredictionId / predictions.length) * graphWidth).toFixed(
                4
              ) + "px",
          }}
        ></div>

        <AreaChart
          onMouseMove={setPredictionFromMouseEvent}
          width={graphWidth}
          height={100}
          data={data}
          margin={{ top: 0, right: 0, left: 1, bottom: 0 }}
        >
          <defs>
            {graphProperties.colors.map((item, graphId) => (
              <linearGradient
                key={graphId}
                id={"value" + graphId}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                {data.map((item, id) => (
                  <stop
                    key={id}
                    offset={"" + (id / data.length) * 100 + "%"}
                    stopColor={graphProperties.colors[graphId].gradient
                      .eval(
                        graphProperties.maxY == 0
                          ? 0
                          : data[id]["value" + graphId] / graphProperties.maxY
                      )
                      .hex()}
                  />
                ))}
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="time" ticks={[0]} />
          <YAxis
            domain={[
              0,
              (dataMax: number) => Math.max(graphProperties.maxY, dataMax),
            ]}
            hide={true}
          />
          {console.log()}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            verticalPoints={data
              .map((item, id, array) =>
                id === 0
                  ? 1
                  : item.time.getHours() === 0
                  ? (id / (array.length - 0.7)) * graphWidth
                  : -1
              )
              .filter((item) => item != -1)}
            style={{ strokeWidth: "0.1em", stroke: "rgba(0, 0, 0, 0.7)" }}
          />
          {graphProperties.colors.map((_, id, array) => {
            const graphId = array.length - id - 1;
            const item = array[graphId];
            return (
              <Area
                key={graphId}
                type="monotone"
                dataKey={"value" + graphId}
                stroke={
                  item.fatStroke
                    ? "url(#value" + graphId + ")"
                    : item.strokeColor.hex()
                }
                strokeWidth={item.fatStroke ? 2 : 1}
                fillOpacity={item.opacity}
                fill={"url(#value" + graphId + ")"}
              />
            );
          })}
        </AreaChart>
      </div>
    </>
  );
};
