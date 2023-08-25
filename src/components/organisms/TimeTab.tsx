import React, { useEffect, useState } from "react";
import "./timeTab.scss";

import { WWWData } from "~/components/abstracts/Types";
import { Button } from "~components/atoms/Button";
import { Value } from "~components/atoms/Value";
import { Timetable } from "~components/organisms/Timetable";

import { AstroData, TideData } from "~/components/abstracts/Types";

import { oneDay, oneHour } from "~components/abstracts/Common";

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
  if (daysDifference < -1) return (-daysDifference).toFixed(0) + " days ago";
};

export interface Props {
  currentHourId: number;
  astroData: AstroData[];
  tideData: TideData[];
  weatherPredictionsByHour: WWWData[];
  onMinus3hours: () => void;
  onPlus3hours: () => void;
}

export const TimeTab: React.FC<Props> = ({
  currentHourId,
  astroData,
  tideData,
  weatherPredictionsByHour,
  onMinus3hours,
  onPlus3hours,
}) => {
  const [showTimetable, setShowTimetable] = useState<boolean>(false);
  const [currentDayId, setCurrentDayId] = useState(0);

  useEffect(() => {
    setCurrentDayId(Math.floor(currentHourId / 24));
  }, [currentHourId]);

  const time = weatherPredictionsByHour[currentHourId].time;
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
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
      <>
        <Button
          color="secondary"
          onClick={() => setShowTimetable(!showTimetable)}
          className="show-timetable"
        >
          {`${showTimetable ? "hide" : "show"} timetable`}
        </Button>
        {showTimetable ? (
          <Timetable
            currentHourId={currentHourId}
            astroData={astroData}
            tideData={tideData}
            weatherPredictionsByHour={weatherPredictionsByHour}
          />
        ) : (
          ""
        )}
      </>
    </div>
  );
};
