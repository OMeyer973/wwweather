export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  coordinates: Coordinates;
  name: string;
  region: string;
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

export type Tide = "low" | "rising" | "high" | "lowering";

export interface WavesData {
  direction: number;
  height: number;
  tide: Tide;
}

// wind, waves, weather data
export interface WWWData {
  time: Date;
  weatherData: WeatherData;
  windData: WindData;
  wavesData: WavesData | undefined;
}

type ISODate = string;

export interface MoonPhase {
  text: string;
  time: ISODate;
}

export interface AstroData {
  astronomicalDawn: ISODate;
  astronomicalDusk: ISODate;
  civilDawn: ISODate;
  civilDusk: ISODate;
  moonFraction: number;
  moonPhase: {
    closest: MoonPhase;
    current: MoonPhase;
  };
  moonrise: ISODate;
  moonset: ISODate;
  nauticalDawn: ISODate;
  nauticalDusk: ISODate;
  sunrise: ISODate;
  sunset: ISODate;
  time: ISODate;
}

export interface TideData {
  height: number;
  time: ISODate;
  type: Tide;
}

export interface TidesToday {
  lowTides: TideData[];
  highTides: TideData[];
}

export interface WindMinMax {
  fastestWind: WWWData;
  slowestWind: WWWData;
}

export interface WavesMinMax {
  highestWaves: WWWData;
  lowestWaves: WWWData;
}
