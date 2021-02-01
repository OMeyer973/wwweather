

function setCompassRotation(angle) {
  var compass  = document.getElementById('compass');
  if (compass !== null)
    { compass.style.transform = 'rotate(' + (-angle) + 'deg)'; } 
  else console.error("can't find #compass element")

  var mapElem  = document.getElementById('map');
  if (mapElem !== null)
    { mapElem.style.transform = 'rotate(' + angle + 'deg)'; } 
  else console.error("can't find #map element")

  var cardinals = document.querySelectorAll('.cardinal-point > span');
  if (cardinals !== null && cardinals.length === 8)
    for (let cardinal of cardinals)
    {
      cardinal.style.transform = 'rotate(' + angle + 'deg)';
    }
  else console.error("can't find .cardinal-point > span elements")
}
