import React from "react";

import WindWavesData from "./WindWavesData";
import wavesArrow from "~/vector/waves-kite-arrow.svg"

export interface Props {
  height: string;
  tide: string;
  direction: string;
}

export const Waves: React.FC<Props> = ({height, tide, direction}) => {
  return (
    <div id="waves-tab" className="tab">
      <div className="title-line flex flex--horizontal">
        <h2>Waves</h2>
        <img src={wavesArrow} alt="wind-kite-arrow"></img>
      </div>
      <WindWavesData label="Height" value={height}/>
      <WindWavesData label="Tide" value={tide}/>
      <WindWavesData label="Direction" value={direction}/>
    </div>
  )
}
