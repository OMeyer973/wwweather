import React from "react";
import CSS from "csstype";
import "./MapTab.scss";

import { Map } from "~/components/atoms/Map";
import { Magnet } from "~/components/atoms/Magnet";

import windArrow from "~/components/atoms/icons/wind-kite-arrow.svg";
import wavesArrow from "~/components/atoms/icons/waves-kite-arrow.svg";

export interface WindData {
  direction: number;
  speed: number;
  gusts: number;
}

type Tide = "low" | "rising" | "high" | "lowering";

export interface WavesData {
  direction: number;
  height: number;
  tide: Tide;
}

export interface Props {
  windAngle: number;
  wavesAngle: number;
}

export const MapTab: React.FC<Props> = ({ windAngle, wavesAngle }) => {
  const windMagnetPlacement: CSS.Properties = {
    gridArea: "1 / 1 / 2 / 2",
    // transform: "rotate(" + windAngle + "deg) translateY(-25%)",
    transform: "rotate(" + -windAngle + "deg) translateY(-25%)",
  };

  return (
    <div className="map-tab">
      <div id="compass">
        <div id="cardinals-primary" className="cardinal-grid">
          <div className="cardinal-point cardinal-top">
            <span>N</span>
          </div>
          <div className="cardinal-point cardinal-right">
            <span>E</span>
          </div>
          <div className="cardinal-point cardinal-down">
            <span>S</span>
          </div>
          <div className="cardinal-point cardinal-left">
            <span>O</span>
          </div>
        </div>

        <div id="cardinals-secondary" className="cardinal-grid">
          <div className="cardinal-point cardinal-top">
            <span>NO</span>
          </div>
          <div className="cardinal-point cardinal-right">
            <span>NE</span>
          </div>
          <div className="cardinal-point cardinal-down">
            <span>SE</span>
          </div>
          <div className="cardinal-point cardinal-left">
            <span>SO</span>
          </div>
        </div>

        <div id="compass-ticks" className="map__overlay"></div>

        <div id="wind-arrow" className="map__overlay">
          <img src={windArrow} alt="wind-kite-arrow"></img>
          <Magnet color="primary" style={windMagnetPlacement}>
            Wind 18 kts
          </Magnet>
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
          <Map
            windAngle={windAngle}
            wavesAngle={wavesAngle}
            onRotate={(r) => console.log(r)}
          />
        </div>
      </div>
    </div>
  );
};
