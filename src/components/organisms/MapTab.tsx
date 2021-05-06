import React, { useState } from "react";
import "./MapTab.scss";

import { LocationData, WindData, WavesData } from "~components/abstracts/Types";

import { Map } from "~/components/atoms/Map";
import { Magnet } from "~/components/atoms/Magnet";

import windArrow from "~/components/atoms/icons/wind-kite-arrow.svg";
import wavesArrow from "~/components/atoms/icons/waves-kite-arrow.svg";

export interface Props {
  location: LocationData;
  windData: WindData;
  wavesData: WavesData;
}

export const MapTab: React.FC<Props> = ({ location, windData, wavesData }) => {
  const [bearing, setBearing] = useState(0);

  const invertTags = () => {
    if (!wavesData || !windData) return false;
    const wi = (windData.direction - bearing + 360) % 360;
    const wa = (wavesData.direction - bearing + 360) % 360;
    return !(
      (wa < wi && wi < 180) ||
      (180 < wi && wi < wa) ||
      ((wa < 90 || wa > 270) && 90 < wi && wi < 270)
    );
    // ;
  };

  const rotateBearing = "rotate(" + bearing + "deg)";
  const rotateBearing45 = "rotate(" + (bearing + 45) + "deg)";

  return (
    <div className="map-tab">
      {!location || !location.coordinates ? (
        ""
      ) : (
        <div id="compass-holder">
          <div
            id="compass"
            style={{ transform: "rotate(" + -bearing + "deg)" }}
          >
            <div id="cardinals-primary" className="cardinal-grid">
              <div
                className="cardinal-point cardinal-top"
                style={{ transform: rotateBearing }}
              >
                <span>N</span>
              </div>
              <div
                className="cardinal-point cardinal-right"
                style={{ transform: rotateBearing }}
              >
                <span>E</span>
              </div>
              <div
                className="cardinal-point cardinal-down"
                style={{ transform: rotateBearing }}
              >
                <span>S</span>
              </div>
              <div
                className="cardinal-point cardinal-left"
                style={{ transform: rotateBearing }}
              >
                <span>O</span>
              </div>
            </div>

            <div id="cardinals-secondary" className="cardinal-grid">
              <div
                className="cardinal-point cardinal-top"
                style={{ transform: rotateBearing45 }}
              >
                <span>NO</span>
              </div>
              <div
                className="cardinal-point cardinal-right"
                style={{ transform: rotateBearing45 }}
              >
                <span>NE</span>
              </div>
              <div
                className="cardinal-point cardinal-down"
                style={{ transform: rotateBearing45 }}
              >
                <span>SE</span>
              </div>
              <div
                className="cardinal-point cardinal-left"
                style={{ transform: rotateBearing45 }}
              >
                <span>SO</span>
              </div>
            </div>

            <div id="compass-ticks" className="map__overlay"></div>

            <div
              id="wind-arrow"
              className="map__overlay"
              style={{
                transform:
                  "rotate(" + windData.direction + "deg) translateY(-25%)",
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
            {!wavesData ? (
              ""
            ) : (
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
            )}

            <div id="map-container">
              <Map
                coordinates={location.coordinates}
                style={{ transform: rotateBearing }}
                onRotate={setBearing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
