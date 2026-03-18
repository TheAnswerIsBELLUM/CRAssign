# CRAssign
# Weather API
An API that returns the current temperature of a given US zip code.
Made using Node.js and Express.
Weather data  acquired using Open-Meteo api

## Requires

- Node.js v18 or higher
- npm

## Settup and Running

Clone the repository:
git clone https://github.com/TheAnswerIsBELLUM/CRAssign.git
cd CRAssgin

Install dependencies:
npm install

Start the server:
npm start

The API will be available at http://localhost:8080

Get requests can be done by appending '/locations/ZIPCode' to url
Append query string for specifiying scale if desired

## Running Tests
npm test

## API Reference
https://open-meteo.com/

## File Structure
src/
├── index.js          - Entry point, starts the server on port 8080
├── app.js            - Express app setup
├── routes/
│   └── locations.js  - Handles GET /locations/:zipCode
└── services/
    └── weather.js    - Fetches data from Open-Meteo API
tests/
└── locations.test.js - Automated tests

## References

- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- [Express.js Documentation](https://expressjs.com)
- [Jest Documentation](https://jestjs.io)
- [Supertest](https://github.com/ladjs/supertest)
- LLM used for research on appropriate weather API and search of documentation, refining of initial structure
    of project, and in the creation of automated test suite, with review to ensure functionality and good practices