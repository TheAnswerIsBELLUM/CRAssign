// express set up/configd
// connects all together

// get required
const express = require('express');
const locationsRouter = require('./routes/locations');

// Create the express application
const app = express();

// set to parse incoming JSON request
app.use(express.json());

// Connect the locations router to the /locations path
app.use('/locations', locationsRouter);

// Export so other files can use it
module.exports = app;