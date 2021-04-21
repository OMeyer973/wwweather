import React from "react";
import ReactDom from "react-dom";
import "./Dashboard.scss";

import Header from "~/components/organisms/Header";

import { LocationTab } from "~components/organisms/LocationTab";
import { TimeTab, Timetable } from "~components/organisms/TimeTab";
import { MapTab, WavesData, WindData } from "~components/organisms/MapTab";
import { WeatherTab } from "~components/organisms/WeatherTab";

import { DirectionTab } from "~components/organisms/DirectionTab";
import windArrow from "~/components/atoms/icons/wind-kite-arrow.svg";
import wavesArrow from "~/components/atoms/icons/waves-kite-arrow.svg";
import { DataRow } from "~components/molecules/DataRow";

import { ForecastTab } from "~components/organisms/ForecastTab";

const timetable: Timetable = {
  sunrise: "06:47",
  sunset: "06:47",

  firstLowTide: "06:47",
  secondLowTide: "06:47",
  firstHighTide: "06:47",
  secondHighTide: "06:47",

  fastestWind: "06:47",
  slowestWind: "06:47",

  highestWaves: "06:47",
  lowestWaves: "06:47",
};

const windData: WindData = {
  direction: 69,
  speed: 8,
  gusts: 15,
};

const wavesData: WavesData = {
  direction: 90,
  height: 2,
  tide: "rising",
};

import { Map } from "~/components/atoms/Map";

export const Dashboard: React.FC = () => (
  <>
    <Header />
    <section className="dashboard">
      <LocationTab />
      <TimeTab date="Monday, february 8th" time="21:00" timetable={timetable} />
      <MapTab windData={windData} wavesData={wavesData} />
      <WeatherTab />
      <div className="wind-waves-tab">
        <DirectionTab
          title="Wind"
          icon={windArrow}
          iconRotation={windData.direction}
        >
          <DataRow label="Speed" value="zz" />
          <DataRow label="Gusts" value="zz" />
          <DataRow label="Direction" value="ENE 69 °" />
        </DirectionTab>
        <DirectionTab
          title="Waves"
          icon={wavesArrow}
          iconRotation={wavesData.direction}
        >
          <DataRow label="Height" value="zz" />
          <DataRow label="Tide" value="zz" />
          <DataRow label="Direction" value="ENE 69 °" />
        </DirectionTab>
      </div>
      <ForecastTab />
    </section>
  </>
);
