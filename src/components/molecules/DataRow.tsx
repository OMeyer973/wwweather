import React from "react";
import "./DataRow.scss"

import { Label } from "~components/atoms/Label";
import { Value } from "~components/atoms/Value";

interface Props {
  label: string;
  value: string;
}

export const DataRow: React.FC<Props> = ({label, value}) => {
  return (
      <div className="wind-waves-data">
        <Label>{label}</Label>
        <Value>{value}</Value>
      </div>
    )
}
  