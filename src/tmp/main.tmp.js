import refreshCompass from "./compass.tmp";

const eps = 0.0001; //epsilon for lat and long coordinates comparison

const currLongitude = -52.6446239;
const currLatitude = 5.168286;

var DataColumn;
DataColumn = {
  hours: [
    {
      airTemperature: { noaa: 23.56, sg: 23.56 },
      airTemperature1000hpa: { noaa: 24.21, sg: 24.21 },
      airTemperature100m: { noaa: 24.26, sg: 24.26 },
      airTemperature200hpa: { noaa: -53.63, sg: -53.63 },
      airTemperature500hpa: { noaa: -5.15, sg: -5.15 },
      airTemperature800hpa: { noaa: 16.35, sg: 16.35 },
      airTemperature80m: { noaa: 24.28, sg: 24.28 },
      cloudCover: { noaa: 100, sg: 100 },
      currentDirection: { meto: 159.27, sg: 159.27 },
      currentSpeed: { meto: 0.04, sg: 0.04 },
      gust: { noaa: 8.3, sg: 8.3 },
      humidity: { noaa: 86, sg: 86 },
      iceCover: { noaa: 0, sg: 0 },
      precipitation: { noaa: 0.07, sg: 0.07 },
      pressure: { noaa: 1011.61, sg: 1011.61 },
      seaLevel: { meto: 0.06, sg: 0.06 },
      secondarySwellDirection: { noaa: 12.07, sg: 12.07 },
      secondarySwellHeight: { noaa: 0.37, sg: 0.37 },
      secondarySwellPeriod: { noaa: 15.79, sg: 15.79 },
      snowDepth: { noaa: 0, sg: 0 },
      swellDirection: { icon: 38.21, meteo: 350.51, noaa: 6.52, sg: 350.51 },
      swellHeight: { icon: 1.24, meteo: 1.05, noaa: 0.49, sg: 1.05 },
      swellPeriod: { icon: 7.36, meteo: 12.63, noaa: 13.32, sg: 12.63 },
      time: "2021-01-28T00:00:00+00:00",
      visibility: { noaa: 24.14, sg: 24.14 },
      waterTemperature: { meto: 27.63, noaa: 22.96, sg: 27.63 },
      waveDirection: { icon: 38.22, meteo: 25.76, noaa: 56.49, sg: 25.76 },
      waveHeight: { icon: 1.24, meteo: 1.79, noaa: 1.78, sg: 1.79 },
      wavePeriod: { icon: 7.33, meteo: 5.39, noaa: 7.66, sg: 5.39 },
      windDirection: { icon: 42.63, noaa: 36.79, sg: 42.63 },
      windDirection1000hpa: { noaa: 89.93, sg: 89.93 },
      windDirection100m: { noaa: 89.93, sg: 89.93 },
      windDirection200hpa: { noaa: 269.82, sg: 269.82 },
      windDirection20m: { noaa: 89.92, sg: 89.92 },
      windDirection30m: { noaa: 89.92, sg: 89.92 },
      windDirection40m: { noaa: 89.92, sg: 89.92 },
      windDirection500hpa: { noaa: 270.02, sg: 270.02 },
      windDirection50m: { noaa: 89.92, sg: 89.92 },
      windDirection800hpa: { noaa: 89.95, sg: 89.95 },
      windDirection80m: { noaa: 89.93, sg: 89.93 },
      windSpeed: { icon: 3.39, noaa: 3.04, sg: 3.39 },
      windSpeed1000hpa: { noaa: 3.89, sg: 3.89 },
      windSpeed100m: { noaa: 4.24, sg: 4.24 },
      windSpeed200hpa: { noaa: 2.84, sg: 2.84 },
      windSpeed20m: { noaa: 2.4, sg: 2.4 },
      windSpeed30m: { noaa: 2.47, sg: 2.47 },
      windSpeed40m: { noaa: 2.76, sg: 2.76 },
      windSpeed500hpa: { noaa: 0.77, sg: 0.77 },
      windSpeed50m: { noaa: 3.04, sg: 3.04 },
      windSpeed800hpa: { noaa: 5.02, sg: 5.02 },
      windSpeed80m: { noaa: 3.88, sg: 3.88 },
      windWaveDirection: {
        icon: 40.62,
        meteo: 57.91,
        noaa: 50.14,
        sg: 57.91,
      },
      windWaveHeight: { icon: 0.09, meteo: 0.84, noaa: 1.65, sg: 0.84 },
      windWavePeriod: { icon: 1.61, meteo: 3.55, noaa: 7.66, sg: 3.55 },
    },
  ],
};

// fetch(`https://api.stormglass.io/v2/weather/point?lat=${5.168286}&lng=${-52.6446239}&params=${
//     'airTemperature,airTemperature80m,airTemperature100m,airTemperature1000hpa,airTemperature800hpa,airTemperature500hpa,airTemperature200hpa,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,iceCover,precipitation,snowDepth,seaLevel,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,visibility,waterTemperature,waveDirection,waveHeight,wavePeriod,windWaveDirection,windWaveHeight,windWavePeriod,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windDirection1000hpa,windDirection800hpa,windDirection500hpa,windDirection200hpa,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m,windSpeed1000hpa,windSpeed800hpa,windSpeed500hpa,windSpeed200hpa'
//   }`, {
//   headers: {
//     'Authorization': '746e3610-6106-11eb-8ed6-0242ac130002-746e367e-6106-11eb-8ed6-0242ac130002'
//   }
// }).then((response) => response.json()).then((jsonData) => {
//   DataColumn = jsonData
// });

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shamarkin/ckkgs8xvm0nyn17pdo4splpqe",
  center: [currLongitude, currLatitude], // starting position [lng, lat]
  zoom: 12, // starting zoom
  maxZoom: 14.5,
  // minZoom: 9,
  maxBounds: [
    [currLongitude - 0.5, currLatitude - 0.5], // Southwest coordinates
    [currLongitude + 0.5, currLatitude + 0.5], // Northeast coordinates
  ],
  //interactive: false
});

map.dragPan.disable();

// stay centered on point of interest
map.on("moveend", function () {
  console.log();
  const currCenter = map.getCenter();
  if (
    Math.abs(currCenter.lng - currLongitude) > eps &&
    Math.abs(currCenter.lat - currLatitude) > eps
  )
    map.setCenter([currLongitude, currLatitude]);
});

// rotate compas
map.on("move", function () {
  refreshCompass(map.getBearing(), 52, 68);
});

refreshCompass(map.getBearing(), 52, 68);
