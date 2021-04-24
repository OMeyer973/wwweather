import React from "react";
import { useState } from "react";
import "./timeTab.scss";

import { Timetable } from "~components/abstracts/Types";

import { Button } from "~components/atoms/Button";
import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";
import { Br } from "~components/atoms/Br";

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
            {weekDays[time.getDay()] +
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
          <Value flavor="slim">(now) {/*Todo : compute*/}</Value>
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
