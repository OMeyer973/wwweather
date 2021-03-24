import React from "react";

import windArrow from "~/vector/wind-kite-arrow.svg"

const Wind = () => {
  return (
      <div id="wind-tab" className="tab">
        <div className="title-line flex flex--horizontal">
          <h2>Wind</h2>
          <img src={windArrow} alt="wind-kite-arrow"></img>
        </div>
        <div className="data-line flex flex--horizontal">
          <label className="label">Speed</label>
          <p className="data">18 kts</p>
        </div>
        <div className="data-line flex flex--horizontal">
          <label className="label">Gusts</label>
          <p className="data">23 kts</p>
        </div>
        <div className="data-line flex flex--horizontal">
          <label className="label">Direction</label>
          <p className="data">ENE 69°</p>
        </div>
      </div>
    )
}

export default Wind;
