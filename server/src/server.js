const http = require("http");
require("dotenv").config()
const { mongoConnenct } = require("./services/mongo");
const { loadLunchData } = require("./models/launches.models");
const { loadPlanetsData } = require("./models/planets.model");
const app = require("./app");

//we config the main port in package.json
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  //connect to DB
  await mongoConnenct();
  // call it by await case this should by wait for response and then answer
  await loadPlanetsData();
  // load data from spaceX api
  await loadLunchData();

  server.listen(PORT, () => {
    console.log(`app run on port: ${PORT}`);
  });
}

startServer();
