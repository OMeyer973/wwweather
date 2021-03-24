import React from "react";

const Time = () => {
  return (
    
    <div id="time-tab" className="tab flex flex--vertical">
      <div id="time-section" className="flex flex--horizontal flex-item--stretch">
        <div id="time-info">
          <p className="data--slim">Monday, february 8th</p>
          <p className="data">21:00</p>
          <p className="data--slim">(in 2 hours)</p>
        </div>
        <span id="btn-minus-3h">
          <button className="btn">-3h</button>
        </span>
        <span id="btn-plus-3h">
          <button className="btn">+3h</button>
        </span>
      </div>
      <button id="btn-show-timetable" className="btn btn--teal">show timetable</button>
      <div id="timetable">
        <div className="flex flex--horizontal flex-item--stretch">
          <div>
            <p>Sunrise <span className="data--small">06:47</span></p>
            <p>Sunset <span className="data--small">18:47</span></p>
          </div>
          <div>
            <p>Low tides <span className="data--small">06:47</span> <span className="data--small">06:47</span></p>
            <p>High tides <span className="data--small">18:47</span> <span className="data--small">06:47</span></p>
          </div>
        </div>
        <div className="flex flex--horizontal flex-item--stretch">
          <div>
            <p>Fastest wind <span className="data--small">06:47</span></p>
            <p>Slowest wind <span className="data--small">18:47</span></p>
          </div>
          <div>
            <p>Highest waves <span className="data--small">06:47</span></p>
            <p>Lowest Waves <span className="data--small">18:47</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Time;
