import React from "react";
import ReactDom from "react-dom";

import Header from "~/components/organisms/Header";

import { LocationTab } from "~components/organisms/LocationTab";
import { TimeTab, Timetable } from "~components/organisms/TimeTab";
import Map from "~components/organisms/MapTab";
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
  lowestWaves: "06:47"
}

export const Dashboard: React.FC = () => (
  <>
    <Header/>
    <section id="dashboard">
      <LocationTab/>
      <TimeTab date="Monday, february 8th" time="21:00" timetable={timetable}/>
      <Map/>
      <WeatherTab/>      
      <div id="wind-waves-tab">
      <DirectionTab title="Wind" icon={windArrow} iconRotation={69}>
          <DataRow label="Speed" value="zz"/>
          <DataRow label="Gusts" value="zz"/>
          <DataRow label="Direction" value="ENE 69 °"/> 
        </DirectionTab>
        <DirectionTab title="Waves" icon={wavesArrow} iconRotation={69}>
          <DataRow label="Height" value="zz"/>
          <DataRow label="Tide" value="zz"/>
          <DataRow label="Direction" value="ENE 69 °"/> 
        </DirectionTab>
      </div>
      <ForecastTab/>
    </section>
  </>
);

