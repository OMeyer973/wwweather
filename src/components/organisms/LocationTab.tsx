import React from "react";
import "./LocationTab.scss";

import { Value } from "~components/atoms/Value";
import { SearchBar } from "~components/molecules/SearchBar";

export interface Props {
  location: string;
  country: string;
}

export const LocationTab: React.FC<Props> = ({ location, country }) => {
  return (
    <div className="location-tab">
      <div>
        <Value flavor="title">{location}</Value>
        <br />
        <Value flavor="slim">{country}</Value>
      </div>
      {/* todo : "share" button ? */}
    </div>
  );
};
