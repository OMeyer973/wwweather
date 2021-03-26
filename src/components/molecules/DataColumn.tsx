import React from "react";
import "./DataColumn.scss"

import { Icon } from "~components/atoms/Icon";
import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";

export interface Props {
  label: string;
  icon: string;
  value: string;
}

export const DataColumn: React.FC<Props> = ({label, icon, value}) => {
  return (
    <div className="weather-data">
      <Label>{label}</Label>
      <Icon src={icon} size="large"/>
      <Value>{value}</Value>        
    </div>
  )
}
