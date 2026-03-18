// application entry point
// start server on 8080

const app = require('./app');

// port for application
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Weather API running at http://localhost:${PORT}`);
});