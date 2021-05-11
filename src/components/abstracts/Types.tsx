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

// wind, waves, weather data
export interface WWWData {
  time: Date;
  weatherData: WeatherData;
  windData: WindData;
  wavesData: WavesData;
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

export interface WindWavesMinMax {
  fastestWind: WWWData;
  slowestWind: WWWData;
  highestWaves: WWWData;
  lowestWaves: WWWData;
}
