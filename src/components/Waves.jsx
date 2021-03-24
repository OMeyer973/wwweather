import React from "react";

import wavesArrow from "~/vector/waves-kite-arrow.svg"

const Waves = () => {
  return (

      <div id="waves-tab" className="tab">
        <div className="title-line flex flex--horizontal">
          <h2>Waves</h2>
          <img src={wavesArrow} alt="wind-kite-arrow"></img>
        </div>
        <div className="data-line flex flex--horizontal">
          <label className="label">Height</label>
          <p className="data">2.5 m</p>
        </div>
        <div className="data-line flex flex--horizontal">
          <label className="label">Tide</label>
          <p className="data">Rising</p>
        </div>
        <div className="data-line flex flex--horizontal">
          <label className="label">Direction</label>
          <p className="data">ENE 69°</p>
        </div>
      </div>
    )
}

export default Waves;
