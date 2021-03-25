import React from "react";
import ReactDom from "react-dom";

import Header from "~/organisms/Header";

import Location from "~/organisms/Location";
import { Time, Timetable } from "~/organisms/Time";
import Map from "~/organisms/Map";
import { Weather } from "~/organisms/Weather";
import { Wind } from "~/organisms/Wind";
import { Waves } from "~/organisms/Waves";
import Forecast from "~/organisms/Forecast";

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
      <Location/>
      <Time date="Monday, february 8th" time="21:00" timetable={timetable}/>
      <Map/>
      <Weather/>      
      <div id="wind-waves-tab">
        <Wind speed="18 kts" gusts="24 kts" direction="ENE 69°"/>
        <Waves height="2.5 m" tide="Rising" direction="ENE 69°"/>
      </div>
      <Forecast/>
    </section>
  </>
);

