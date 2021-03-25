import React from "react";

interface Props {
  label: string;
  value: string;
}

const WindWavesData: React.FC<Props> = ({label, value}) => {
  return (
      <div className="data-line flex flex--horizontal">
        <label className="label">{label}</label>
        <p className="data">{value}</p>
      </div>
    )
}
export default  WindWavesData;
