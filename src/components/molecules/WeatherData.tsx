import React from "react";
import "./weatherData.scss"

import { Icon } from "~components/atoms/Icon";
import { Label } from "~components/atoms/Label";

export interface Props {
  label: string;
  icon: string;
  value: string;
}

export const WeatherData: React.FC<Props> = ({label, icon, value}) => {
  return (
    <div className="weather-data">
      <Label>{label}</Label>
      <Icon src={icon} size="large"/>
      <p className="data">{value}</p>        
    </div>
  )
}
