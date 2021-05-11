export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  coordinates: Coordinates;
  name: string;
  region: string;
}

export interface Timetable {
  day: Date;

  dusk: Date;
  dawn: Date;

  lowTides: Date[];
  highTides: Date[];

  fastestWind: Date;
  slowestWind: Date;

  highestWaves: Date;
  lowestWaves: Date;
}

export interface WeatherData {
  cloudCover: number;
  riskOfRain: number;
  temperature: number;
}

export interface WindData {
  direction: number;
  speed: number;
  gusts: number;
}

type Tide = "low" | "rising" | "high" | "lowering";

export interface WavesData {
  direction: number;
  height: number;
  tide: Tide;
}

export interface DataByHour {
  time: Date;
  weatherData: WeatherData;
  windData: WindData;
  wavesData: WavesData;
}
