import React from "react";

export interface Props {
  label: string;
  icon: string;
  value: string;
}

export const WeatherData: React.FC<Props> = ({label, icon, value}) => {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="icon-holder">
        <img src={icon} alt="day-cloud-3"/>
      </div>
      <p className="data">{value}</p>        
    </div>
  )
}
