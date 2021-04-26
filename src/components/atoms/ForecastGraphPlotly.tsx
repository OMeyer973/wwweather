import React, { useRef, useEffect, useState } from "react";
//import "./ForecastGraph.scss";

import Plot from "react-plotly.js";

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

function random_date(start, end, mul) {
  return new Date(start.getTime() + mul * (end.getTime() - start.getTime()));
}

function date_list(y1, m1, d1, y2, m2, d2, count) {
  var a = [];
  for (let i = 0; i < count; i++) {
    a.push(random_date(new Date(y1, m1, d1), new Date(y2, m2, d2), i));
  }
  return a;
}

function random_number(num, mul) {
  var value = [];
  for (let i = 0; i <= num; i++) {
    var rand = Math.random() * mul;
    value.push(rand);
  }
  return value;
}

var trace1 = {
  x: date_list(2001, 0o1, 0o1, 2001, 0o2, 0o1, 50),
  y: random_number(50, 20),
  line: { width: 0 },
  marker: { color: "444" },
  mode: "lines",
  name: "Lower Bound",
  type: "scatter",
};

var trace2 = {
  x: date_list(2001, 0o1, 0o1, 2001, 0o2, 0o1, 50),
  y: random_number(50, 21),
  fill: "tonexty",
  fillcolor: "rgba(68, 68, 68, 0.3)",
  line: { color: "rgb(31, 119, 180)" },
  mode: "lines",
  name: "Measurement",
  type: "scatter",
};

var trace3 = {
  x: date_list(2001, 0o1, 0o1, 2001, 0o2, 0o1, 50),
  y: random_number(50, 22),
  fill: "tonexty",
  fillcolor: "rgba(68, 68, 68, 0.3)",
  line: { width: 0 },
  marker: { color: "444" },
  mode: "lines",
  name: "Upper Bound",
  type: "scatter",
};

var traceData = [trace1, trace2, trace3];
var layout = {
  showlegend: false,
  title: "Continuous, variable value error bars<br>Notice the hover text!",
  yaxis: { title: "Wind speed (m/s)" },
};

export interface Props {
  data: ForecastGraphPoint[];
  targetTime: Date;
}

export const ForecastGraph: React.FC<Props> = ({ data, targetTime }) => {
  const chartContainer = useRef(null);
  // useEffect(() => {}, [chartContainer.current]);
  const chartContainerSize = useResize(chartContainer);
  return (
    <div id="chart-container" ref={chartContainer}>
      {console.log(data)}
      <Plot data={traceData} layout={layout} />
      {/* <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{
          width: chartContainer.current
            ? chartContainer.current.offsetWidth
            : 0,
          height: 100,
          title: "A Fancy Plot",
        }}
      /> */}
    </div>
  );
};
