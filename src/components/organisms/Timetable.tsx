import React, { useEffect, useState } from "react";
import "./timeTable.scss";

import { WWWData } from "~/components/abstracts/Types";
import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";
import { Br } from "~components/atoms/Br";

import {
  AstroData,
  TideData,
  TidesToday,
  WindMinMax,
  WavesMinMax,
} from "~/components/abstracts/Types";

import {
  oneDay,
  oneHour,
  startDate,
  numberDaysPredicted,
  placeholderWWWData,
  isSameDay,
} from "~components/abstracts/Common";

const daysPredicted = Array(numberDaysPredicted)
  .fill(0)
  .map((item, id) => new Date(startDate.valueOf() + oneDay * id));

const makeTidesByDay: (tideData: TideData[]) => TidesToday[] = (tideData) =>
  daysPredicted.map((date: Date) => ({
    lowTides: tideData.filter(
      (tideItem: TideData) =>
        isSameDay(new Date(tideItem.time), date) && tideItem.type == "low"
    ),

    highTides: tideData.filter(
      (tideItem: TideData) =>
        isSameDay(new Date(tideItem.time), date) && tideItem.type == "high"
    ),
  }));

const makeWindMinmaxsByDay: (predictions: WWWData[]) => WindMinMax[] = (
  predictions
) =>
  daysPredicted.map((date: Date) => {
    const todaysPredictions = predictions.filter((item) =>
      isSameDay(item.time, date)
    );
    return {
      fastestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed >=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
      slowestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed <=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
    };
  });

const makeWavesMinmaxsByDay: (predictions: WWWData[]) => WavesMinMax[] = (
  predictions
) => {
  if (!predictions || !predictions[0] || !predictions[0].wavesData) return [];
  return daysPredicted.map((date: Date) => {
    const todaysPredictions = predictions.filter((item) =>
      isSameDay(item.time, date)
    );
    return {
      highestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev.wavesData.height >= current.wavesData.height ? prev : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
      lowestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev.wavesData.height <= current.wavesData.height ? prev : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
    };
  });
};

export interface Props {
  currentHourId: number;
  astroData: AstroData[];
  tideData: TideData[];
  weatherPredictionsByHour: WWWData[];
}

export const Timetable: React.FC<Props> = React.memo(
  ({ currentHourId, astroData, tideData, weatherPredictionsByHour }) => {
    const [currentDayId, setCurrentDayId] = useState(0);

    useEffect(() => {
      setCurrentDayId(Math.floor(currentHourId / 24));
    }, [currentHourId]);

    const astroDataByDay = astroData;
    const tidesByDay = makeTidesByDay(tideData);
    const windMinmaxsByDay = makeWindMinmaxsByDay(weatherPredictionsByHour);
    const wavesMinmaxsByDay = makeWavesMinmaxsByDay(weatherPredictionsByHour);

    const time = weatherPredictionsByHour[currentHourId].time;
    return (
      <div id="timetable" className="timetable">
        <div>
          {!astroDataByDay[currentDayId] ? (
            ""
          ) : (
            <div>
              <p>
                <Label>Dawn</Label>
                <Br under="tiny" />
                <Value flavor="small">
                  {" "}
                  {new Date(
                    astroData[currentDayId].civilDawn
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Value>
              </p>
              <p>
                <Label>Dusk</Label>
                <Br under="tiny" />
                <Value flavor="small">
                  {" "}
                  {new Date(
                    astroData[currentDayId].civilDusk
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Value>
              </p>
            </div>
          )}
          {!tidesByDay[currentDayId] ? (
            console.log(tidesByDay)
          ) : (
            <div>
              <p>
                <Label>Low Tide</Label>
                <Br under="tiny" />{" "}
                <Value flavor="small">
                  {tidesByDay[currentDayId].lowTides.map(
                    (item, id, array) =>
                      new Date(item.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + (id < array.length - 1 ? " | " : "")
                  )}
                </Value>
              </p>
              <p>
                <Label>High Tide</Label>
                <Br under="tiny" />{" "}
                <Value flavor="small">
                  {" "}
                  {tidesByDay[currentDayId].highTides.map(
                    (item, id, array) =>
                      new Date(item.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + (id < array.length - 1 ? " | " : "")
                  )}
                </Value>
              </p>
            </div>
          )}
        </div>
        <div>
          {!windMinmaxsByDay[currentDayId] ? (
            ""
          ) : (
            <div>
              <p>
                <Label>Fastest Wind</Label>
                <Br under="tiny" />
                <Value flavor="small">
                  {" "}
                  {new Date(
                    windMinmaxsByDay[currentDayId].fastestWind.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Value>
              </p>
              <p>
                <Label>Slowest Wind</Label>
                <Br under="tiny" />
                <Value flavor="small">
                  {" "}
                  {new Date(
                    windMinmaxsByDay[currentDayId].slowestWind.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Value>
              </p>
            </div>
          )}
          {!wavesMinmaxsByDay[currentDayId] ? (
            ""
          ) : (
            <div>
              <p>
                <Label>Highest Waves</Label>
                <Br under="tiny" />
                <Value flavor="small">
                  {" "}
                  {new Date(
                    wavesMinmaxsByDay[currentDayId].highestWaves.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Value>
              </p>
              <p>
                <Label>Lowest Waves</Label>
                <Br under="tiny" />
                <Value flavor="small">
                  {" "}
                  {new Date(
                    wavesMinmaxsByDay[currentDayId].lowestWaves.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Value>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);
