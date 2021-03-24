import React from "react";

import Location from "./Location";
import Time from "./Time";
import Map from "./Map";
import Weather from "./Weather";
import WindWaves from "./WindWaves";
import Forecast from "./Forecast";

const Dashboard = () => {
  return (

    <section id="dashboard">
      <Location/>
      <Time/>
      <Map/>
      <Weather/>
      <WindWaves/>
      <Forecast/>
    </section>
  )
}

export default Dashboard;
