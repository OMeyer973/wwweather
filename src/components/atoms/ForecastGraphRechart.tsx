import React, { useRef, useEffect, useState } from "react";
import "./ForecastGraphRechart.scss";
import { DataByHour } from "~/components/abstracts/Types";

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

const isTouchEnabled = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

const useResize = (myRef) => {
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

const dangerGradient = new Gradient(
  Color("#b94cff"),
  Color("#413cff"),
  Color("#00f7ff"),
  Color("#ffff00"),
  Color("#ff0000"),
  Color("#510049")
);

// for drawing days separation in graph
const daysPredicted = 10;
// for drawing danger color in graph (in kts)
const mostDangerouWind = 40;

export interface ForecastGraphPoint {
  windSpeed: number;
  maxWindSpeed: number;
  time: Date;
  timeStamp: number;
  label?: string;
}

export interface Props {
  predictions: DataByHour[];
  currentPredictionId: number;
}

export const ForecastGraph: React.FC<Props> = ({
  predictions,
  currentPredictionId,
}) => {
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
          .map((prediction) =>
            prediction.time.getHours() === 0
              ? {
                  windSpeed: prediction.windData.speed,
                  maxWindSpeed: prediction.windData.gusts,
                  time: prediction.time,
                  timeStamp: prediction.time.valueOf(),
                  label: prediction.time.toDateString().slice(0, -5),
                }
              : {
                  windSpeed: prediction.windData.speed,
                  maxWindSpeed: prediction.windData.gusts,
                  time: prediction.time,
                  timeStamp: prediction.time.valueOf(),
                }
          );

  return (
    <>
      <script src="node_modules/dragscroll/dragscroll.js"></script>
      <div className="forecast-graph dragscroll" ref={graphContainer}>
        <AreaChart
          width={graphWidth}
          // width={800}
          height={100}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" /> */}
          <defs>
            <linearGradient id="maxWindSpeed" x1="0" y1="0" x2="1" y2="0">
              {data.map((item, id) => (
                <stop
                  key={id}
                  offset={"" + (id / data.length) * 100 + "%"}
                  stopColor={dangerGradient
                    .eval(data[id].maxWindSpeed / mostDangerouWind)
                    .hex()}
                />
              ))}
            </linearGradient>
            <linearGradient id="windSpeed" x1="0" y1="0" x2="1" y2="0">
              {data.map((item, id) => (
                <stop
                  key={id}
                  offset={"" + (id / data.length) * 100 + "%"}
                  stopColor={dangerGradient
                    .eval(data[id].windSpeed / mostDangerouWind)
                    .hex()}
                />
              ))}
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            // dataKey="timeStamp"
            ticks={[0]}
          />
          <YAxis domain={[0, 40]} hide={true} />
          {console.log()}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            verticalPoints={[...new Array(daysPredicted + 1)].map(
              (item, id) => (id * graphWidth) / daysPredicted
            )}
            // width={1.6}
            style={{ strokeWidth: "0.1em", stroke: "rgba(0, 0, 0, 0.7)" }}
          />
          <Tooltip
            // labelStyle={tooltipStyle}
            // contentStyle={tooltipStyle}
            wrapperStyle={{ display: "none" }}
            cursor={{ strokeWidth: "0.125em", stroke: "#000" }}
            //viewbox={{ x: 0, y: 0, width: 400, height: 400 }}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="maxWindSpeed"
            stroke="0"
            fillOpacity={0.6}
            fill="url(#maxWindSpeed)"
          />
          <Area
            type="monotone"
            dataKey="windSpeed"
            stroke="0"
            fillOpacity={0.7}
            fill="url(#windSpeed)"
            strokeWidth="1"
          />
        </AreaChart>
      </div>
    </>
  );
};
