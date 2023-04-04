//planets data
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
//add schema of planet
const planets = require("./planets.mongo");

// read deta and find find habiablePlanets and export
function isHabiablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, rejects) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async function (data) {
        if (isHabiablePlanet(data)) {
          saveplanet(data);
        }
      })
      .on("error", function (err) {
        console.log(`ERROR !!!!!
        ${err}`);
        //in error event we call the reject
        rejects(err);
      })
      .on("end", async function () {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(countPlanetsFound, "habitable planet");

        //we call the resolve and we dont want to pass any argument because we already have own array
        resolve();
      });
  });
}

async function getAllPlanets() {
  //HINT: if you pass empty obj its return list of planets
  /*
  module.find(
    {dataName},
    {-excludeDataName includeDataName}
    )
  */
  return await planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
}

//upsert
async function saveplanet(planet) {
  // create document in DB
  // insert + update = upsert // if data exist update and if not insert
  /*
    we use (updateOne({
    dataYouLookingFor
    },{
    dataYouWantUpsert
    },{
    upsert: true,
    }))
  */
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
