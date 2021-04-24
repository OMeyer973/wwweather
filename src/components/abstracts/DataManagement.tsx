import {
  Timetable,
  WeatherData,
  WindData,
  WavesData,
  DataByHour,
  DataByDay,
} from "~/components/abstracts/Types";

// averages all the values of a given object
const avg = (data: any) =>
  Object.values(data).reduce((average: any, value: any) =>
    typeof value === "number"
      ? average + value
      : console.error("avg called on object with non number values")
  ) / Object.values(data).length;

// meter per second to knots
const mps2kts = (a: number) => a * 1.943844;

// precipitations in mm per hour (equivalent to  kg/m²) to risk of rain percentage, considering 10 mm per hour 100% rain
const mmph2riskOfRainPercent = (a: number) => a * 10;

const sum = (arr: Array<number>) => arr.reduce((a: number, b: number) => a + b);

const degToRad = (a: number) => (Math.PI / 180) * a;

const meanAngleDeg = (arr: Array<number>) =>
  (180 / Math.PI) *
  Math.atan2(
    sum(arr.map(degToRad).map(Math.sin)) / arr.length,
    sum(arr.map(degToRad).map(Math.cos)) / arr.length
  );

// averages all the angle values (in degree) of a given object
const avgAngle = (data: any) => meanAngleDeg(Object.values(data));

// rawHourlyDataresult of a stormglass api fetch
export const makeDataThisHour: (rawHourlyData: any) => DataByHour = (
  rawHourlyData
) => {
  //console.log(rawHourlyData);
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
    wavesData: {
      direction: avgAngle(rawHourlyData.waveDirection),
      height: avg(rawHourlyData.waveHeight),
      tide: "rising", // todo
    },
  };
};
