import React from "react";
import"./LocationTab.scss";

import { Value } from "~components/atoms/Value";
import { SearchBar } from "~components/molecules/SearchBar";

export const LocationTab = () => {
  return (
    <div className="location-tab">
      <div>
        <Value flavor="title">Pointe du Talut/Belle-Île</Value><br/>
        <Value flavor="slim">French Guiana</Value>
      </div>
      <SearchBar label="Search Location"/>
    </div>
  )
}
