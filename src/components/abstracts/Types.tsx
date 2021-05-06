export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Timetable {
  sunrise: string;
  sunset: string;

  firstLowTide: string;
  secondLowTide: string;
  firstHighTide: string;
  secondHighTide: string;

  fastestWind: string;
  slowestWind: string;

  highestWaves: string;
  lowestWaves: string;
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
