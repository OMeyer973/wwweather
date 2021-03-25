import React from "react";
import { useState } from "react";
import { Button } from "~atoms/Button"

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

export const Time: React.FC<Props> = ({date, time, timetable}) => {
  const [showTimetable, setShowTimetable] = useState<boolean>(true);

  return (
    <div id="time-tab" className="tab flex flex--vertical">
      <div id="time-section" className="flex flex--horizontal flex-item--stretch">
        <div id="time-info">
          <p className="data--slim">{date}</p>
          <p className="data">{time}</p>
          <p className="data--slim">(in 2 hours)</p>
        </div>
        <span id="btn-minus-3h">
          <button className="btn">-3h</button>
        </span>
        <span id="btn-plus-3h">
          <button className="btn">+3h</button>
        </span>
      </div>
      {/* <Button text={`${showTimetable ? "hide" : "show"} timetable`} onClick={() => setShowTimetable(!showTimetable)}/> */}
      <button id="btn-show-timetable" className="btn btn--teal">show timetable</button>

      <div id="timetable" className={showTimetable ? "" : "hidden"}>
        <div className="flex flex--horizontal flex-item--stretch">
          <div>
            <p>Sunrise <span className="data--small">{timetable.sunrise}</span></p>
            <p>Sunset <span className="data--small">{timetable.sunrise}</span></p>
          </div>
          <div>
            <p>Low tides <span className="data--small">{timetable.firstLowTide}</span> <span className="data--small">{timetable.secondLowTide}</span></p>
            <p>High tides <span className="data--small">{timetable.firstHighTide}</span> <span className="data--small">{timetable.secondHighTide}</span></p>
          </div>
        </div>
        <div className="flex flex--horizontal flex-item--stretch">
          <div>
            <p>Fastest wind <span className="data--small">{timetable.fastestWind}</span></p>
            <p>Slowest wind <span className="data--small">{timetable.slowestWind}</span></p>
          </div>
          <div>
            <p>Highest waves <span className="data--small">{timetable.highestWaves}</span></p>
            <p>Lowest Waves <span className="data--small">{timetable.lowestWaves}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
