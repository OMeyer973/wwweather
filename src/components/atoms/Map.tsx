import React, { useRef, useEffect, useState } from "react";
import CSS from "csstype";

import { Coordinates } from "~components/abstracts/Types";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hhbWFya2luIiwiYSI6ImNra2d2aGxydjAzYTUyb21tY3IzazNzamkifQ.lahFmUNO07-YoSdAFi0ZSA";

const eps = 0.0001; //epsilon for lat and long coordinates comparison

export interface Props {
  coordinates: Coordinates;
  onRotate: (bearing: number) => void;
  style?: CSS.Properties;
}

export const Map: React.FC<Props> = React.memo(
  ({ coordinates, onRotate, style }) => {
    const mapContainer = useRef();
    const [mapObject, setMapObject]: [
      mapboxgl.Map | undefined,
      any
    ] = useState();

    useEffect(() => {
      let map = new mapboxgl.Map({
        container: mapContainer.current,
        width: 400,
        height: 400,
        style: "mapbox://styles/shamarkin/ckkgs8xvm0nyn17pdo4splpqe",
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 12,
      });
      setMapObject(map);

      map.on("move", () => {
        onRotate(map.getBearing());
      });

      // stay centered on point of interest
      map.on("moveend", () => {
        const currCenter = map.getCenter();
        if (
          Math.abs(currCenter.lng - coordinates.longitude) > eps &&
          Math.abs(currCenter.lat - coordinates.latitude) > eps
        )
          map.setCenter([coordinates.longitude, coordinates.latitude]);
      });

      //map.dragPan.disable();

      // return () => map.remove();
    }, []);

    // test
    useEffect(() => {
      if (mapObject) {
        console.log("setting map center");
        console.log([coordinates.longitude, coordinates.latitude]);
        mapObject.setCenter([coordinates.longitude, coordinates.latitude]);
        mapObject.setCenter({
          lon: coordinates.longitude,
          lat: coordinates.latitude,
        });
        console.log(mapObject.getCenter());
        console.log(mapObject);
      }
    }, [coordinates, mapObject]);

    return (
      <div
        id="map"
        ref={mapContainer}
        style={style}
        onClick={() => {
          console.log("CLICK !");
          mapObject.setCenter([10, 20]);
        }}
      />
    );
  }
);
