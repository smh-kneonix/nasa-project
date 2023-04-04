const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortlunchById,
} = require("../../models/launches.models");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  //get skip and limit from req 
  const { skip, limit } = getPagination(req.query);
  //NOTE: the json just get array and obj
  const launches = await getAllLaunches(skip,limit);
  return res.status(200).json(launches)
}

//handle the post request for make new launch
async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  //check validation for existing
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "bad request",
    });
  }

  //convert simple string of date to formated date
  launch.launchDate = new Date(launch.launchDate);
  //check validation for cerect type date
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "invalid launch date",
    });
  }

  await scheduleNewLaunch(launch);

  //201 is created
  return res.status(201).json(launch);
}

async function httpDeleteLaunches(req, res) {
  const launchId = +req.params.id;

  //if launch dosent exict return 404
  if (await existsLaunchWithId(launchId)) {
    // the function return the aborted and we pass it as ans response
    const aborted = await abortlunchById(launchId);
    if (aborted) {
      return res.status(202).json(aborted);
    } else {
      return res.status(204).json({
        error: "launch not aborted",
      });
    }
  } else {
    // deleteLaunchById(launchId);
    return res.status(204).json({
      error: "launch id not found",
    });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunches,
};
