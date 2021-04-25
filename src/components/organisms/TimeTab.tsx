import React from "react";
import { useState } from "react";
import "./timeTab.scss";

import { Timetable } from "~components/abstracts/Types";

import { Button } from "~components/atoms/Button";
import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";
import { Br } from "~components/atoms/Br";

export const oneDay = 86400000;
export const oneHour = 3600000;

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

const makeRelativeTimeLabel = (time: Date) => {
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

export interface Props {
  time: Date;
  timetable: Timetable;
  onMinus3hours: () => void;
  onPlus3hours: () => void;
}

export const TimeTab: React.FC<Props> = ({
  time,
  timetable,
  onMinus3hours,
  onPlus3hours,
}) => {
  const [showTimetable, setShowTimetable] = useState<boolean>(false);

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
              <Label>Sunrise</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.sunrise}</Value>
            </p>
            <p>
              <Label>Sunset</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.sunset}</Value>
            </p>
          </div>
          <div>
            <p>
              <Label>Low Tide</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.firstLowTide}</Value> |
              <Value flavor="small"> {timetable.secondLowTide}</Value>
            </p>
            <p>
              <Label>High Tide</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.firstHighTide}</Value> |
              <Value flavor="small"> {timetable.secondLowTide}</Value>
            </p>
          </div>
        </div>
        <div>
          <div>
            <p>
              <Label>Fastest Wind</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.fastestWind}</Value>
            </p>
            <p>
              <Label>Slowest Wind</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.fastestWind}</Value>
            </p>
          </div>
          <div>
            <p>
              <Label>Highest Waves</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.highestWaves}</Value>
            </p>
            <p>
              <Label>Lowest Waves</Label>
              <Br under="tiny" />
              <Value flavor="small"> {timetable.lowestWaves}</Value>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
