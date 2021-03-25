export default function refreshCompass(compassAngle, windAngle, wavesAngle) {
  // compass & cardinals
  var compass = document.getElementById("compass");
  if (compass !== null)
    compass.style.transform = "rotate(" + -compassAngle + "deg)";
  else console.error("can't find #compass element");

  var mapElem = document.getElementById("map");
  if (mapElem !== null)
    mapElem.style.transform = "rotate(" + compassAngle + "deg)";
  else console.error("can't find #map element");

  var cardinals = document.querySelectorAll(".cardinal-point > span");
  if (cardinals !== null && cardinals.length === 8)
    for (let cardinal of cardinals) {
      cardinal.style.transform = "rotate(" + compassAngle + "deg)";
    }
  else console.error("can't find .cardinal-point > span elements");

  // arrows & labels
  var windArrow = document.getElementById("wind-arrow");
  if (windArrow !== null)
    windArrow.style.transform = "rotate(" + windAngle + "deg) translateY(-25%)";
  else console.error("can't find #wind-arrow");

  var windArrowLabel = document.getElementById("wind-arrow__label");
  if (windArrowLabel !== null)
    windArrowLabel.style.transform =
      "rotate(" + (-windAngle + compassAngle) + "deg)  translateY(-4em)";
  else console.error("can't find #wind-arrow__label");

  var wavesArrow = document.getElementById("waves-arrow");
  if (wavesArrow !== null)
    wavesArrow.style.transform =
      "rotate(" + wavesAngle + "deg) translateY(-25%)";
  else console.error("can't find #waves-arrow");

  var wavesArrowLabel = document.getElementById("waves-arrow__label");
  if (wavesArrowLabel !== null)
    wavesArrowLabel.style.transform =
      "rotate(" + (-wavesAngle + compassAngle) + "deg)  translateY(4em)";
  else console.error("can't find #waves-arrow__label");
}
