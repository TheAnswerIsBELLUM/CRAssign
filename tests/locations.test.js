// autoated test to verify responses

const request = require('supertest');
const app = require('../src/app');

// replace the weather service with a fake one (no real calls to internet)
jest.mock('../src/services/weather', () => ({
  getWeatherByZip: jest.fn(),
}));

// pull in mocked version
const { getWeatherByZip } = require('../src/services/weather');

describe('GET /locations/:zipCode', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tests to check that correct input gives correct output

  test('returns temperature in Fahrenheit by default', async () => {
    // set fake weather service what to return for this test
    getWeatherByZip.mockResolvedValue({ temperature: 43, scale: 'Fahrenheit' });

    // send a fake GET request
    const res = await request(app).get('/locations/24060');

    // check the response
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ temperature: 43, scale: 'Fahrenheit' });
  });

  test('returns temperature in Celsius when scale=Celsius', async () => {
    getWeatherByZip.mockResolvedValue({ temperature: 25, scale: 'Celsius' });

    const res = await request(app).get('/locations/90210?scale=Celsius');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ temperature: 25, scale: 'Celsius' });
  });

  test('returns temperature in Fahrenheit when scale=Fahrenheit is explicit', async () => {
    getWeatherByZip.mockResolvedValue({ temperature: 63, scale: 'Fahrenheit' });

    const res = await request(app).get('/locations/60606?scale=Fahrenheit');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ temperature: 63, scale: 'Fahrenheit' });
  });


  // test that bad input is handled

  test('returns 400 for a zip code that is not 5 digits', async () => {
    const res = await request(app).get('/locations/123');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 400 for a zip code with letters', async () => {
    const res = await request(app).get('/locations/ABCDE');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 400 for an invalid scale value', async () => {
    const res = await request(app).get('/locations/24060?scale=Kelvin');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 404 when zip code is not found', async () => {
    // reutrn null to simulate a zip code that DNE
    getWeatherByZip.mockResolvedValue(null);

    const res = await request(app).get('/locations/00000');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 502 when the weather API fails', async () => {
    // simultate service error
    getWeatherByZip.mockRejectedValue(new Error('API is down'));

    const res = await request(app).get('/locations/24060');

    expect(res.status).toBe(502);
    expect(res.body).toHaveProperty('error');
  });

});