// handle requests
// read zip code and scale from UL and query string (validates)
// calls weather api and sends back response

// get weatherByZip included from weather.js
// get express
const express = require('express');
const { getWeatherByZip } = require('../services/weather');

// make router
const router = express.Router();

// This define hebavior for GET /locations/:zipCode
router.get('/:zipCode', async (req, res) => {

  // Read zip code out of URL
  const { zipCode } = req.params;

  // Read scale out of query string (?scale=Celsius)
  // default to 'Fahrenheit'
  const scale = req.query.scale || 'Fahrenheit';

  // Check that the zip code has 5 digits
  if (!/^\d{5}$/.test(zipCode)) {
    return res.status(400).json({ error: 'Invalid zip code. Must be a 5-digit number.' });
  }

  // Check the scale
  if (scale !== 'Fahrenheit' && scale !== 'Celsius') {
    return res.status(400).json({ error: 'Invalid scale. Must be "Fahrenheit" or "Celsius".' });
  }

  // fetch weather
  // Wrap in try/catch incase failure at any point
  try {
    const result = await getWeatherByZip(zipCode, scale);

    // getWeatherByZip returns null when the zip code wasn't found
    if (result === null) {
      return res.status(404).json({ error: `No location found for zip code ${zipCode}.` });
    }

    // Everything worked, send back temp with 200
    return res.status(200).json(result);

  } catch (error) {
    // Log error on the server for later review
    console.error(error);
    return res.status(502).json({ error: 'Failed to fetch weather data from upstream service.' });
  }

});

// Export router so others can use it
module.exports = router;