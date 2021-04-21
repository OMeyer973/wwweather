import React, { useState } from "react";
import CSS from "csstype";
import "./MapTab.scss";

import { WindData, WavesData } from "~components/abstracts/Types";

import { Map } from "~/components/atoms/Map";
import { Magnet } from "~/components/atoms/Magnet";

import windArrow from "~/components/atoms/icons/wind-kite-arrow.svg";
import wavesArrow from "~/components/atoms/icons/waves-kite-arrow.svg";

export interface Props {
  windData: WindData;
  wavesData: WavesData;
}

export const MapTab: React.FC<Props> = ({ windData, wavesData }) => {
  const [bearing, setBearing] = useState(0);

  const invertTags = () => {
    const wi = (windData.direction + bearing + 180) % 360;
    const wa = (wavesData.direction + bearing + 180) % 360;
    return (wa < wi && wi < 180) || (180 < wi && wi < wa);
  };

  const updateCompass = () => {};

  return (
    <div className="map-tab">
      <div id="compass" style={{ transform: "rotate(" + -bearing + "deg)" }}>
        <div id="cardinals-primary" className="cardinal-grid">
          <div
            className="cardinal-point cardinal-top"
            style={{ transform: "rotate(" + bearing + "deg)" }}
          >
            <span>N</span>
          </div>
          <div
            className="cardinal-point cardinal-right"
            style={{ transform: "rotate(" + bearing + "deg)" }}
          >
            <span>E</span>
          </div>
          <div
            className="cardinal-point cardinal-down"
            style={{ transform: "rotate(" + bearing + "deg)" }}
          >
            <span>S</span>
          </div>
          <div
            className="cardinal-point cardinal-left"
            style={{ transform: "rotate(" + bearing + "deg)" }}
          >
            <span>O</span>
          </div>
        </div>

        <div id="cardinals-secondary" className="cardinal-grid">
          <div
            className="cardinal-point cardinal-top"
            style={{ transform: "rotate(" + (bearing + 45) + "deg)" }}
          >
            <span>NO</span>
          </div>
          <div
            className="cardinal-point cardinal-right"
            style={{ transform: "rotate(" + (bearing + 45) + "deg)" }}
          >
            <span>NE</span>
          </div>
          <div
            className="cardinal-point cardinal-down"
            style={{ transform: "rotate(" + (bearing + 45) + "deg)" }}
          >
            <span>SE</span>
          </div>
          <div
            className="cardinal-point cardinal-left"
            style={{ transform: "rotate(" + (bearing + 45) + "deg)" }}
          >
            <span>SO</span>
          </div>
        </div>

        <div id="compass-ticks" className="map__overlay"></div>

        <div
          id="wind-arrow"
          className="map__overlay"
          style={{
            transform: "rotate(" + windData.direction + "deg) translateY(-25%)",
          }}
        >
          <img src={windArrow} alt="wind-kite-arrow"></img>
          <Magnet
            color="primary"
            style={{
              gridArea: "1 / 1 / 2 / 2",
              transform:
                "rotate(" +
                (bearing - windData.direction) +
                "deg) translateY(" +
                (invertTags() ? "-" : "") +
                "4em)",
            }}
          >
            Wind {windData.speed.toFixed(0)} kts
          </Magnet>
        </div>

        <div
          id="waves-arrow"
          className="map__overlay"
          style={{
            transform:
              "rotate(" + wavesData.direction + "deg) translateY(-25%)",
          }}
        >
          <img src={wavesArrow} alt="waves-kite-arrow"></img>
          <Magnet
            color="secondary"
            style={{
              gridArea: "1 / 1 / 2 / 2",
              transform:
                "rotate(" +
                (bearing - wavesData.direction) +
                "deg) translateY(" +
                (invertTags() ? "" : "-") +
                "4em)",
            }}
          >
            Waves {wavesData.height.toFixed(1)} m
          </Magnet>
        </div>

        <div id="map-container">
          <Map
            style={{ transform: "rotate(" + bearing + "deg)" }}
            onRotate={setBearing}
          />
        </div>
      </div>
    </div>
  );
};
