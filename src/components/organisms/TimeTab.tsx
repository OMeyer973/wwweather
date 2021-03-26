import React from "react";
import { useState } from "react";
import "./timeTab.scss"

import { Button } from "~components/atoms/Button"
import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";

export interface Timetable {
  sunrise: string;
  sunset: string;
  
  firstLowTide: string;
  secondLowTide: string;
  firstHighTide: string;
  secondHighTide: string;
  
  fastestWind: string;
  slowestWind: string;

  highestWaves: string;
  lowestWaves: string;
}

export interface Props {
  date: string;
  time: string;
  timetable: Timetable;
}

export const TimeTab: React.FC<Props> = ({date, time, timetable}) => {
  const [showTimetable, setShowTimetable] = useState<boolean>(false);

  return (
    <div className="time-tab">
      <div className="main">
        <div className="time-info">
          <Value flavor="slim">{date}</Value><br/>
          <Value>{time}</Value><br/>
          <Value flavor="slim">(in 2 hours) {/*Todo : compute*/}</Value>
        </div>
        <Button className="btn-minus-3h" onClick={() =>"TODO"}>-3h</Button>
        <Button className="btn-plus-3h" onClick={() =>"TODO"}>+3h</Button>
      </div>
      <Button
        color="secondary"
        onClick={() => setShowTimetable(!showTimetable)}
        className="show-timetable"
      >
        {`${showTimetable ? "hide" : "show"} timetable`}
      </Button>

      <div id="timetable" className={`timetable ${showTimetable ? "" : "hidden"}`}>
        <div>
          <div>
            <p><Label>Sunrise</Label> <Value flavor="small">{timetable.sunrise}</Value></p>
            <p><Label>Sunset</Label> <Value flavor="small">{timetable.sunset}</Value></p>
          </div>
          <div>
            <p><Label>Low Tide</Label> <span><Value flavor="small">{timetable.firstLowTide}</Value> <Value flavor="small">{timetable.secondLowTide}</Value></span></p>
            <p><Label>High Tide</Label> <Value flavor="small">{timetable.firstHighTide}</Value> <Value flavor="small">{timetable.secondLowTide}</Value></p>
          </div>
        </div>
        <div>
          <div>
            <p><Label>Fastest Wind</Label> <Value flavor="small">{timetable.fastestWind}</Value></p>
            <p><Label>Slowest Wind</Label> <Value flavor="small">{timetable.fastestWind}</Value></p>
          </div>
          <div>
            <p><Label>Highest Waves</Label> <Value flavor="small">{timetable.highestWaves}</Value></p>
            <p><Label>Lowest Waves</Label> <Value flavor="small">{timetable.lowestWaves}</Value></p>
          </div>
        </div>
      </div>
    </div>
  )
}
