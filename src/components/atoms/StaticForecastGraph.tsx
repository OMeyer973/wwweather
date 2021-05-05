import React, { useRef, useEffect, useState } from "react";
import "./ForecastGraphRechart.scss";
import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from "recharts";
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

export interface GraphDataPoint {
  value0: number;
  value1: number;
  value2: number;
  time: Date;
}

export interface GridPoint {
  position: number;
  label: string;
}

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

export interface Props {
  graphData: GraphDataPoint[];
  graphProperties: GraphProperties;
  graphWidth: number;
  onMouseMove?: any;
}

////////////////////////////////////////////////
//////// COMPONENT BEGIN
export const StaticForecastGraph: React.FC<Props> = React.memo(
  ({ graphData, graphProperties, graphWidth, onMouseMove }) => {
    const gridData: GridPoint[] = graphData
      .map((item, id, array) => ({
        label:
          weekDays[(item.time.getDay() + 6) % 7] +
          "\xa0" + // non breaking space
          item.time.getMonth() +
          "/" +
          item.time.getDate(),
        position:
          id < 1
            ? 1
            : item.time.getHours() === 0
            ? (id / (array.length - 0.7)) * graphWidth
            : -1,
      }))
      .filter((item) => item.position != -1)
      .slice(0, -1);

    return (
      <>
        <AreaChart
          onMouseMove={onMouseMove}
          width={graphWidth}
          height={100}
          data={graphData}
          margin={{ top: 0, right: 0, left: 1, bottom: 0 }}
        >
          <defs>
            {graphProperties.colors.map((item, graphId: number) => (
              <linearGradient
                key={graphId}
                id={"value" + graphId}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                {graphData.map((item, id) => (
                  <stop
                    key={id}
                    offset={"" + (id / graphData.length) * 100 + "%"}
                    stopColor={graphProperties.colors[graphId].gradient
                      .eval(
                        graphProperties.maxY == 0
                          ? 0
                          : graphData[id]["value" + graphId] /
                              graphProperties.maxY
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
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            verticalPoints={gridData.map((item) => item.position)}
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
        <div className="grid-labels">
          {gridData.map((item) => {
            return (
              <label
                className="label grid-label"
                style={{ left: item.position }}
                key={item.label}
              >
                {item.label}
              </label>
            );
          })}
        </div>
      </>
    );
  }
);
