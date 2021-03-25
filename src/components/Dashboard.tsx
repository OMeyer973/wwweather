import React from "react";

import Location from "./Location";
import Time from "./Time";
import Map from "./Map";
import { Weather } from "./Weather";
import { Wind } from "./Wind";
import { Waves } from "./Waves";
import Forecast from "./Forecast";

const Dashboard: React.FC = () => {
  return (

    <section id="dashboard">
      <Location/>
      <Time/>
      <Map/>
      <Weather/>      
      <div id="wind-waves-tab">
        <Wind speed="18 kts" gusts="24 kts" direction="ENE 69°"/>
        <Waves height="2.5 m" tide="Rising" direction="ENE 69°"/>
      </div>
      <Forecast/>
    </section>
  )
}

export default Dashboard;
