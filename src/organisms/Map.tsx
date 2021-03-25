import React from "react";

import windArrow from "~/vector/wind-kite-arrow.svg"
import wavesArrow from "~/vector/waves-kite-arrow.svg"

const Map = () => {
  return (
    <div id="map-tab" className="tab tab--map">

      <div id="compass">
        <div id="cardinals-primary" className="cardinal-grid">
          <div className="cardinal-point cardinal-top"><span>N</span></div>
          <div className="cardinal-point cardinal-right"><span>E</span></div>
          <div className="cardinal-point cardinal-down"><span>S</span></div>
          <div className="cardinal-point cardinal-left"><span>O</span></div>
        </div>
        
        <div id="cardinals-secondary" className="cardinal-grid">
          <div className="cardinal-point cardinal-top"><span>NO</span></div>
          <div className="cardinal-point cardinal-right"><span>NE</span></div>
          <div className="cardinal-point cardinal-down"><span>SE</span></div>
          <div className="cardinal-point cardinal-left"><span>SO</span></div>
        </div>
  
        <div id="compass-ticks" className="map__overlay"></div>
  
        <div id="wind-arrow" className="map__overlay">
          <img src={windArrow} alt="wind-kite-arrow"></img>
          <label id="wind-arrow__label" className="map-label map-label--orange">
            Wind 18 kts
          </label>
        </div>
        
        <div id="waves-arrow" className="map__overlay">
          <img src={wavesArrow} alt="waves-kite-arrow"></img>
          <label id="waves-arrow__label" className="map-label map-label--teal">
            Waves 2.5 m
          </label>
        </div>

        <div id="map-container">
          <div id="map">
          
          </div>      
            
        </div>      
      </div>
    </div>
  )
}

export default Map;
