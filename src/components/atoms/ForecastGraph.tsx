import React, { useRef, useEffect, useState } from "react";
import "./ForecastGraph.scss";

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
  data: ForecastGraphPoint[];
  targetTime: Date;
}

export const ForecastGraph: React.FC<Props> = ({ data, targetTime }) => {
  const graphContainer = useRef(null);
  useResize(graphContainer);

  const graphContainerWidth = graphContainer.current
    ? graphContainer.current.offsetWidth
    : 0;

  const graphWidth = isTouchEnabled()
    ? Math.max(800, graphContainerWidth)
    : graphContainerWidth;
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
          {/* <YAxis /> */}
          {console.log()}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            verticalPoints={[...new Array(daysPredicted + 1)].map(
              (item, id) => (id * graphWidth) / daysPredicted
            )}
          />
          <Tooltip
            // labelStyle={tooltipStyle}
            // contentStyle={tooltipStyle}
            wrapperStyle={{ display: "none" }}
          />
          <Area
            type="monotone"
            dataKey="maxWindSpeed"
            stroke="url(#maxWindSpeed)"
            fillOpacity={0.7}
            fill="url(#maxWindSpeed)"
          />
          <Area
            type="monotone"
            dataKey="windSpeed"
            stroke="#ffffff"
            fillOpacity={1}
            fill="url(#windSpeed)"
            strokeWidth="1.5"
          />
        </AreaChart>
      </div>
    </>
  );
};
