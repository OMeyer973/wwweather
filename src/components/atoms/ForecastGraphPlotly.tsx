import React, { useRef, useEffect, useState } from "react";
import "./ForecastGraph.scss";

import Plot from "react-plotly.js";

import { DataByHour } from "~/components/abstracts/Types";
import Color from "color";
import { Gradient } from "~/components/abstracts/Gradient";
import { Data } from "plotly.js";

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

const makeDataFromPredictions: (
  predictions: DataByHour[],
  name: string,
  predictionSelector: (prediction: DataByHour) => number
) => Data = (predictions, name, predictionSelector) => ({
  x: predictions
    .filter((prediction) => prediction.time.getHours() % 3 === 0) // comment to have a crisper graph
    .map((prediction) => prediction.time),
  y: predictions
    .filter((prediction) => prediction.time.getHours() % 3 === 0) // comment to have a crisper graph
    .map((item) => predictionSelector(item)),
  fill: "tozeroy",
  line: { shape: "spline" },
  type: "scatter",
  hovertemplate: "%{y:.0f} kts",
  textPosition: "top center",
  mode: "none",

  name: name,
});

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
  return (
    <>
      <div className="forecast-graph" ref={graphContainer}>
        <Plot
          data={[
            makeDataFromPredictions(
              predictions,
              "wind",
              (prediction) => prediction.windData.speed
            ),
            makeDataFromPredictions(
              predictions,
              "gusts",
              (prediction) => prediction.windData.gusts
            ),
          ]}
          layout={{
            width: graphContainerWidth,
            height: 200,
            title: {},
            margin: { l: 0, r: 0, t: 0, b: 20 },
            showlegend: false,
            // xaxis: {
            //   showticklabels: false,
            //   fixedrange: true,
            // },

            // yaxis: {
            //   showticklabels: false,
            //   fixedrange: true,
            // },
          }}
          //config={{ staticPlot: true }}
          config={{ displayModeBar: false, scrollZoom: false }}
        />
      </div>
    </>
  );
};
