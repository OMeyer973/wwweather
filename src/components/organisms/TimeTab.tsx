import React, { useEffect, useState } from "react";
import "./timeTab.scss";

import { Timetable, DataByHour } from "~/components/abstracts/Types";
import { Button } from "~components/atoms/Button";
import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";
import { Br } from "~components/atoms/Br";

import {
  oneDay,
  oneHour,
  isSameDay,
} from "~/components/abstracts/DataManagement";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nth = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

const placeholderTimetables: Timetable[] = [
  {
    day: new Date(),

    dusk: new Date(),
    dawn: new Date(),

    lowTides: [new Date()],
    highTides: [new Date()],

    fastestWind: new Date(),
    slowestWind: new Date(),

    highestWaves: new Date(),
    lowestWaves: new Date(),
  },
];

export const makeRelativeTimeLabel = (time: Date) => {
  const hoursDifference = Math.round(
    (new Date(time).valueOf() - new Date().valueOf()) / oneHour
  );
  if (Math.abs(hoursDifference) <= 12) {
    if (Math.abs(hoursDifference) < 1) return "now";
    if (hoursDifference > 0)
      return "in " + hoursDifference.toFixed(0) + " hours";
    return (-hoursDifference).toFixed(0) + " hours ago";
  }

  const daysDifference = Math.round(
    (new Date(time).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) /
      oneDay
  );
  if (daysDifference === 0) return "today";
  if (daysDifference === +1) return "tomorrow";
  if (daysDifference > 1) return "in " + daysDifference.toFixed(0) + " days";
  if (daysDifference === -1) return "yesterday";
  // can't happen - minimum time : yesterday
  if (daysDifference < -1) return (-daysDifference).toFixed(0) + " days ago";
};

const makeTimeTables: (
  astroData: any[],
  tideData: any[],
  predictions: DataByHour[]
) => Timetable[] = (astroData, tideData, predictions) => {
  // console.log(predictions);
  return astroData.map((astroItem: any) => {
    const lowTideTimes: Date[] = tideData
      .filter(
        (tideItem: any) =>
          isSameDay(new Date(tideItem.time), new Date(astroItem.time)) &&
          tideItem.type == "low"
      )
      .map((item) => new Date(item.time));

    const highTideTimes: Date[] = tideData
      .filter(
        (tideItem: any) =>
          isSameDay(new Date(tideItem.time), new Date(astroItem.time)) &&
          tideItem.type == "high"
      )
      .map((item) => new Date(item.time));

    const todaysPredictions = predictions.filter((item) =>
      isSameDay(item.time, new Date(astroItem.time))
    );

    return {
      day: new Date(astroItem.time),

      dusk: new Date(astroItem.civilDusk),
      dawn: new Date(astroItem.civilDawn),

      lowTides: lowTideTimes,
      highTides: highTideTimes,

      fastestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed >=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0]
      ).time,
      slowestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed <=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0]
      ).time,

      highestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev.wavesData.height >= current.wavesData.height ? prev : current,
        todaysPredictions[0]
      ).time,
      lowestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev.wavesData.height <= current.wavesData.height ? prev : current,
        todaysPredictions[0]
      ).time,
    };
  });
};

const makeAstroTimesByDay: (astroData: any[]) => any[] = (astroData) =>
  // todo: type
  // console.log(predictions);
  astroData.map((astroItem: any) => ({
    dusk: new Date(astroItem.civilDusk),
    dawn: new Date(astroItem.civilDawn),
  }));

const makeTideTimesByDay: (astroData: any[], tideData: any[]) => any[] = (
  astroData,
  tideData
) =>
  // todo : type, todo : don't use astroData as time reference
  astroData.map((astroItem: any) => ({
    lowTides: tideData
      .filter(
        (tideItem: any) =>
          isSameDay(new Date(tideItem.time), new Date(astroItem.time)) &&
          tideItem.type == "low"
      )
      .map((item) => new Date(item.time)),

    highTides: tideData
      .filter(
        (tideItem: any) =>
          isSameDay(new Date(tideItem.time), new Date(astroItem.time)) &&
          tideItem.type == "high"
      )
      .map((item) => new Date(item.time)),
  }));

const makeMinmaxTimesByDay: (
  astroData: any[],
  predictions: DataByHour[]
) => any[] = (astroData, predictions) =>
  // todo : type, todo : don't use astroData as time reference
  astroData.map((astroItem: any) => {
    const todaysPredictions = predictions.filter((item) =>
      isSameDay(item.time, new Date(astroItem.time))
    );
    // console.log(todaysPredictions);
    return {
      fastestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed >=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0]
          ? todaysPredictions[0]
          : { windData: { speed: 0, gusts: 0 }, time: new Date(0) } // todo change type & rm Date(0)
      ).time,
      slowestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed <=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0]
          ? todaysPredictions[0]
          : { windData: { speed: 0, gusts: 0 }, time: new Date(0) } // todo change type & rm Date(0)
      ).time,

      highestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev.wavesData.height >= current.wavesData.height ? prev : current,
        todaysPredictions[0]
          ? todaysPredictions[0]
          : { wavesData: { height: 0 }, time: new Date(0) } // todo change type & rm Date(0)
      ).time,
      lowestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev.wavesData.height <= current.wavesData.height ? prev : current,
        todaysPredictions[0]
          ? todaysPredictions[0]
          : { wavesData: { height: 0 }, time: new Date(0) } // todo change type & rm Date(0)
      ).time,
    };
  });

export interface Props {
  currentHourId: number;
  astroData: any[];
  tideData: any[];
  weatherPredictionsByHour: DataByHour[];
  onMinus3hours: () => void;
  onPlus3hours: () => void;
}

export const TimeTab: React.FC<Props> = ({
  currentHourId, // do we really need this ? can we replace it w time ? => more calculations required
  astroData,
  tideData,
  weatherPredictionsByHour,
  onMinus3hours,
  onPlus3hours,
}) => {
  const [showTimetable, setShowTimetable] = useState<boolean>(false);
  const [timetables, setTimetables] = useState(placeholderTimetables);
  const [astroTimesByDay, setAstroTimesByDay] = useState([]);
  const [tideTimesByDay, setTideTimesByDay] = useState([]);
  const [minmaxTimesByDay, setminmaxTimesByDay] = useState([]);
  const [currentDayId, setCurrentDayId] = useState(0);

  useEffect(() => {
    // todo predictions.length > 2 prevents crashes at initialisation, fix
    if (astroData && tideData && weatherPredictionsByHour.length > 2) {
      setTimetables(
        makeTimeTables(astroData, tideData, weatherPredictionsByHour)
      );
    }
  }, [weatherPredictionsByHour, astroData, tideData]);

  // todo : reactvate & finish refacto
  // useEffect(() => {
  //   // todo predictions.length > 2 prevents crashes at initialisation, fix
  //   if (astroData) {
  //     setAstroTimesByDay(makeAstroTimesByDay(astroData));
  //   }
  // }, [astroData]);

  // useEffect(() => {
  //   // todo predictions.length > 2 prevents crashes at initialisation, fix
  //   if (astroData && tideData) {
  //     setTideTimesByDay(makeTideTimesByDay(astroData, tideData));
  //   }
  // }, [tideData, astroData]);

  // useEffect(() => {
  //   // todo predictions.length > 2 prevents crashes at initialisation, fix
  //   if (astroData && weatherPredictionsByHour) {
  //     setTideTimesByDay(
  //       makeMinmaxTimesByDay(astroData, weatherPredictionsByHour)
  //     );
  //   }
  // }, [weatherPredictionsByHour, astroData]);

  useEffect(() => {
    if (
      !timetables[currentDayId] ||
      !isSameDay(
        weatherPredictionsByHour[currentHourId].time,
        timetables[currentDayId].day
      )
    ) {
      setCurrentDayId(
        timetables.findIndex((timetable) =>
          isSameDay(timetable.day, weatherPredictionsByHour[currentHourId].time)
        )
      );
    }
  }, [currentHourId, timetables]);

  const time = weatherPredictionsByHour[currentHourId].time;
  const timetable = timetables[currentDayId];

  return (
    <div className="time-tab">
      <div className="main">
        <div className="time-info">
          <Value flavor="slim">
            {weekDays[(time.getDay() + 6) % 7] +
              ", " +
              months[time.getMonth()].toLowerCase() +
              " " +
              time.getDate() +
              nth[time.getDate() % 10]}
          </Value>
          <br />
          <Value>
            {("00" + time.getHours()).slice(-2) +
              ":" +
              ("00" + time.getMinutes()).slice(-2)}
          </Value>
          <br />
          <Value flavor="slim">({makeRelativeTimeLabel(time)})</Value>
        </div>
        <Button className="btn-minus-3h" onClick={onMinus3hours}>
          -3h
        </Button>
        <Button className="btn-plus-3h" onClick={onPlus3hours}>
          +3h
        </Button>
      </div>
      {!timetable ? (
        ""
      ) : (
        <>
          <Button
            color="secondary"
            onClick={() => setShowTimetable(!showTimetable)}
            className="show-timetable"
          >
            {`${showTimetable ? "hide" : "show"} timetable`}
          </Button>

          <div
            id="timetable"
            className={`timetable ${showTimetable ? "" : "hidden"}`}
          >
            <div>
              <div>
                <p>
                  <Label>Dusk</Label>
                  <Br under="tiny" />
                  <Value flavor="small">
                    {" "}
                    {timetable.dusk.toLocaleTimeString().slice(0, 5)}
                  </Value>
                </p>
                <p>
                  <Label>Dawn</Label>
                  <Br under="tiny" />
                  <Value flavor="small">
                    {" "}
                    {timetable.dawn.toLocaleTimeString().slice(0, 5)}
                  </Value>
                </p>
              </div>
              <div>
                <p>
                  <Label>Low Tide</Label>
                  <Br under="tiny" />{" "}
                  <Value flavor="small">
                    {timetable.lowTides.map(
                      (item, id, array) =>
                        item.toLocaleTimeString().slice(0, 5) +
                        (id < array.length - 1 ? " | " : "")
                    )}
                  </Value>
                </p>
                <p>
                  <Label>High Tide</Label>
                  <Br under="tiny" />{" "}
                  <Value flavor="small">
                    {timetable.highTides.map(
                      (item, id, array) =>
                        item.toLocaleTimeString().slice(0, 5) +
                        (id < array.length - 1 ? " | " : "")
                    )}
                  </Value>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  <Label>Fastest Wind</Label>
                  <Br under="tiny" />
                  <Value flavor="small">
                    {" "}
                    {timetable.fastestWind.toLocaleTimeString().slice(0, 5)}
                  </Value>
                </p>
                <p>
                  <Label>Slowest Wind</Label>
                  <Br under="tiny" />
                  <Value flavor="small">
                    {" "}
                    {timetable.slowestWind.toLocaleTimeString().slice(0, 5)}
                  </Value>
                </p>
              </div>
              <div>
                <p>
                  <Label>Highest Waves</Label>
                  <Br under="tiny" />
                  <Value flavor="small">
                    {" "}
                    {timetable.highestWaves.toLocaleTimeString().slice(0, 5)}
                  </Value>
                </p>
                <p>
                  <Label>Lowest Waves</Label>
                  <Br under="tiny" />
                  <Value flavor="small">
                    {" "}
                    {timetable.lowestWaves.toLocaleTimeString().slice(0, 5)}
                  </Value>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
