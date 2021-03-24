import React from "react";

// todo : make dynamic
import dayCloud3 from "~/vector/weather/day-cloud-3.svg"
import rain3 from "~/vector/weather/rain-3.svg"

import thermometer from "~/vector/weather/thermometer.svg"

const Weather = () => {
  return (
    <div id="weather-tab" className="tab">
      <div className="flex flex--horizontal">
        <div>
          <label className="label">Cloud coverage</label>
          <div className="icon-holder">
            <img src={dayCloud3} alt="day-cloud-3"/>
          </div>
          <p className="data">5%</p>        
        </div>
        <div>
          <label className="label">Risk of rain</label>
          <div className="icon-holder">
            <img src={rain3} alt="day-cloud-3"></img>
          </div>
          <p className="data">5%</p>        
        </div>
        <div>
          <label className="label">Temperature</label>
          <div className="icon-holder">
            <img src={thermometer} alt="day-cloud-3"></img>
          </div>
          <p className="data">28°C</p>        
        </div>
      </div>
    </div>
  )
}

export default Weather;
