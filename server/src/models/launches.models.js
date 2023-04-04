const axios = require("axios");
//add schema of launches
const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");
const defult_flight_number = 100;

//get data from space x api
async function populateLaunches() {
  const SPACEX_API_URL = "https://api.spacexdata.com/v5/launches/query";
  console.log("downloading launch spaceX API...");
  //querying from space x data
  //https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: `rocket`,
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  // if(response.statuse !== 200){
  //   console.log("problem downloading launch data")
  //   throw new Error("launch data download failed")
  // }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunche(launch);
  }

  //todo
}

// find flight from db
async function findLaunch(filter) {
  return await launchesDB.findOne(filter);
}

async function loadLunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("lauch data is already loaded");
    return;
  } else {
    populateLaunches();
  }
}

//add new launch
async function scheduleNewLaunch(launch) {
  //check lauch planets is exist or not
  const planetBoolean = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planetBoolean) {
    throw new Error("no matching planet found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ztm", "nasa"],
    flightNumber: newFlightNumber,
  });
  await saveLaunche(newLaunch);
}

//save a launch into database
async function saveLaunche(launch) {
  await launchesDB.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

//get list of all paginated launches
async function getAllLaunches(skip, limit) {
  //we dont want id and version
  return await launchesDB
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

//find lunch
async function existsLaunchWithId(launchId) {
  return await findLaunch({ flightNumber: launchId });
}

//abort luanch
async function abortlunchById(lauchId) {
  return await launchesDB.findOneAndUpdate(
    { flightNumber: lauchId },
    {
      upcoming: false,
      success: false,
    },
    { new: true }
  );
}

//get the latest flight number
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return defult_flight_number;
  }
  return latestLaunch.flightNumber;
}

module.exports = {
  loadLunchData,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortlunchById,
};
