import React from "react";

import WindWavesData from "../molecules/WindWavesData";
import windArrow from "~/vector/wind-kite-arrow.svg";

export interface Props {
  speed: string;
  gusts: string;
  direction: string;
}

export const Wind : React.FC<Props> = ({speed, gusts, direction}) => {
  return (
    <div id="wind-tab" className="tab">
      <div className="title-line flex flex--horizontal">
        <h2>Wind</h2>
        <img src={windArrow} alt="wind-kite-arrow"></img>
      </div>
      <WindWavesData label="Speed" value={speed}/>
      <WindWavesData label="Gusts" value={gusts}/>
      <WindWavesData label="Direction" value={direction}/>
    </div>
  )
}
