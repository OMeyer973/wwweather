import React, { useRef, useEffect, useState } from "react";
//import "./ForecastGraph.scss";

import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const tooltipStyle = {
  // display: "none",
  backgroundColor: "red",
  color: "blue",
};

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
  const chartContainer = useRef(null);
  // useEffect(() => {}, [chartContainer.current]);
  const graphWidth = chartContainer.current
    ? chartContainer.current.offsetWidth
    : 0;
  const chartContainerSize = useResize(chartContainer);
  return (
    <div id="chart-container" ref={chartContainer}>
      <AreaChart
        width={graphWidth}
        // width={800}
        height={100}
        data={data}
      >
        {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" /> */}
        <defs>
          <linearGradient id="maxWindSpeed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="windSpeed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          // dataKey="time"
          dataKey="timeStamp"
          //angle={45}
          ticks={[0]}
          // ticks={data
          //   .filter(
          //     (item) =>
          //       item.timeStamp != undefined && item.time.getHours() === 0
          //   )
          //   .map((item) => item.timeStamp)}
        />
        {/* <YAxis /> */}
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          // verticalPoints={[100, 1619431200000, 0, 1, 2, 3, 4, 5, 6]}
          verticalPoints={new Array(10).map(
            (item, id) => (id * graphWidth) / 10
          )}
          // horizontalPoints={data
          //   .map((item, id) => (item.time.getHours() === 0 ? id : -1))
          //   .filter((item) => item != -1)}
          // horizontalPoints={data
          //   .filter(
          //     (item) =>
          //       item.timeStamp != undefined && item.time.getHours() === 3
          //   )
          //   .map((item) => item.timeStamp)}
        />
        <Tooltip
          // labelStyle={tooltipStyle}
          // contentStyle={tooltipStyle}
          wrapperStyle={tooltipStyle}
        />
        <Area
          type="monotone"
          dataKey="maxWindSpeed"
          stroke="url(#maxWindSpeed)"
          fillOpacity={1}
          fill="url(#maxWindSpeed)"
        />
        <Area
          type="monotone"
          dataKey="windSpeed"
          stroke="black"
          fillOpacity={1}
          fill="url(#windSpeed)"
        />
      </AreaChart>
    </div>
  );
};
