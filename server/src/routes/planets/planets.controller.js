//import planets array
const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  //we use the return to make sure to the function is not working for own
  return res.status(200).json(await getAllPlanets());
}

//export all funtion
module.exports = {
  httpGetAllPlanets,
};
