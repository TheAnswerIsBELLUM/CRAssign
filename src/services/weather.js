// weather api
// fetches weather data from zip code snet
// returns temp

// Convert from Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Covert from zip code to lattitude and longitude
async function getCoordinates(zipCode) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&count=1`;

  const response = await fetch(url);

  // If problem with the geocoding API, throw error
  if (!response.ok) {
    throw new Error('Failed to reach geocoding API');
  }

  const data = await response.json();

  // If empty or missing, zip code doesn't exist
  if (!data.results || data.results.length === 0) {
    return null;
  }

  // Pull latitude and longitude out
  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
}

// Returns current temperature in Celsius, takes coords
async function getTemperature(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to reach weather API');
  }

  const data = await response.json();

  return data.current.temperature_2m;
}

// calls helpers to get final response
async function getWeatherByZip(zipCode, scale) {
  // onvert zip code to coords
  const coords = await getCoordinates(zipCode);

  // If getCoordinates returned null, the zip code wasn't found
  // Return null
  if (!coords) {
    return null;
  }

  // get the temperature in Celsius using those coordinates
  const tempCelsius = await getTemperature(coords.latitude, coords.longitude);

  // convert if needed, round to a whole number
  let temperature;
  if (scale === 'Celsius') {
    temperature = Math.round(tempCelsius);
  } else {
    temperature = Math.round(celsiusToFahrenheit(tempCelsius));
  }

  // Return the final result
  return { temperature, scale };
}

// allow others to use getWeatherByZip
module.exports = { getWeatherByZip };