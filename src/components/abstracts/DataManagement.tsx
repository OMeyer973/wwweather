import { maxParallelImageRequests } from "mapbox-gl";
import {
  Timetable,
  WeatherData,
  WindData,
  WavesData,
  DataByHour,
} from "~/components/abstracts/Types";

////// Constants
export const oneDay = 86400000;
export const oneHour = 3600000;

////// utils
export const clamp = (x: number, a: number, b: number) =>
  Math.max(a, Math.min(x, b));

////// parse weather server data

// averages all the values of a given object (typescript abomination but very useful in our case)
const avg: (data: Object) => number = (data) => {
  if (data == undefined || data == null) {
    console.error("avg called on null or undefined");
    return 0;
  }
  return (
    Object.values(data).reduce((average: any, value: any) =>
      typeof value === "number"
        ? average + value
        : console.error("avg called on object with non number values")
    ) / Object.values(data).length
  );
};

// meter per second to knots
const mps2kts = (a: number) => a * 1.943844;

// precipitations in mm per hour (equivalent to  kg/m²) to risk of rain percentage, considering 3.33 mm per hour 100% rain
const mmph2riskOfRainPercent = (a: number) => clamp(a * 30, 0, 100);

const sum = (arr: Array<number>) => arr.reduce((a: number, b: number) => a + b);

const degToRad = (a: number) => (Math.PI / 180) * a;

const meanAngleDeg = (arr: Array<number>) =>
  ((180 / Math.PI) *
    Math.atan2(
      sum(arr.map(degToRad).map(Math.sin)) / arr.length,
      sum(arr.map(degToRad).map(Math.cos)) / arr.length
    ) +
    360) %
  360;

// averages all the angle values (in degree) of a given object
const avgAngle = (data: Object) => {
  if (data == undefined || data == null) {
    console.error("avgAngle called on null or undefined");
    return 0;
  }
  return meanAngleDeg(Object.values(data));
};

// rawHourlyDataresult of a stormglass api fetch
export const makeDataThisHour: (rawHourlyData: any) => DataByHour = (
  rawHourlyData
) => {
  const wavesData =
    rawHourlyData.waveDirection && rawHourlyData.waveHeight
      ? {
          direction: avgAngle(rawHourlyData.waveDirection),
          height: avg(rawHourlyData.waveHeight),
          seaLevel:
            rawHourlyData.seaLevel === undefined
              ? 0 // todo fixx !
              : avg(rawHourlyData.seaLevel) * 20,
          tide: "rising", // todo
        }
      : undefined;

  return {
    time: new Date(rawHourlyData.time),
    weatherData: {
      cloudCover: avg(rawHourlyData.cloudCover),
      riskOfRain: mmph2riskOfRainPercent(avg(rawHourlyData.precipitation)),
      temperature: avg(rawHourlyData.airTemperature),
    },
    windData: {
      direction: avgAngle(rawHourlyData.windDirection),
      speed: mps2kts(avg(rawHourlyData.windSpeed)),
      gusts: mps2kts(avg(rawHourlyData.gust)),
    },
    wavesData: wavesData,
  };
};

export const isSameDay: (a: Date, b: Date) => boolean = (a, b) => {
  if (!a || !b) console.error("isSameDay got bad inputs");
  const res = a && b && a.toDateString() == b.toDateString();
  return res;
};

//unused misc

//downloads json data on the clients computer
const handleSaveToPC = (jsonData: any, filename: string) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
};

// throttle the rate at which a callback can be called
// usage :
// window.addEventListener("resize", throttle(handleResize, 200));
export const throttle: any = (
  callback: (args: any) => any,
  interval: number
) => {
  let enableCall = true;

  return (...args: any) => {
    if (!enableCall) return;

    enableCall = false;
    setTimeout(() => {
      callback.apply(this, args);
      enableCall = true;
    }, interval);
  };
};
