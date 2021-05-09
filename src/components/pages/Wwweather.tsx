import React, { useEffect, useState } from "react";
import "./Wwweather.scss";

import Header from "~/components/organisms/Header";
import { Dashboard } from "~components/organisms/Dashboard";
import { SearchBar } from "~components/molecules/SearchBar";
import { Label } from "~components/atoms/Label";
import { Br } from "~components/atoms/Br";

const fetchLocationData = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const location = queryParams.get("location");
  if (!location || location == "") return null;
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2hhbWFya2luIiwiYSI6ImNra2d2aGxydjAzYTUyb21tY3IzazNzamkifQ.lahFmUNO07-YoSdAFi0ZSA`,
    {}
  );
  const data = await res.json();
  return data;
};

const getLocation = async () => {
  const locationDataFromServer = await fetchLocationData();
  if (
    !locationDataFromServer ||
    locationDataFromServer.features === undefined ||
    locationDataFromServer.features[0] === undefined
  ) {
    console.error("couldn't fetch location from map api");
    // console.error(locationDataFromServer);

    return undefined;
  }

  const name: string = locationDataFromServer.features[0].text;
  const context = locationDataFromServer.features[0].context;
  const region: string = context
    ? context.length > 0
      ? context.length > 1
        ? context[context.length - 1].text +
          ", " +
          context[context.length - 2].text
        : context[context.length - 1].text
      : ""
    : name;

  const [lng, lat] = locationDataFromServer.features[0].center;
  return {
    name: name,
    region: region,
    coordinates: { longitude: lng, latitude: lat },
  };
};

export const Wwweather: React.FC = () => {
  const [location, setLocation]: [Location | null, any] = useState(null);

  useEffect(() => {
    getLocation().then((locationData) => {
      setLocation(locationData);
    });
  }, []);

  return location ? (
    <>
      <Header />
      <Dashboard location={location} />
    </>
  ) : (
    <div className="home">
      <div className="title">
        <h1>
          Wind
          <br />
          Waves
          <br />
          Weather
        </h1>
        <p>
          <Label>
            get forecast quick, <Br under="small" />
            go ride now!
          </Label>
        </p>
      </div>

      <div className="container">
        <Label>Find a spot</Label>
        <SearchBar placeholder="Kourou" />
      </div>
    </div>
  );
};
