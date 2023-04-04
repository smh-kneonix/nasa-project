const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunches,
} = require("./launches.controller");

const launchRouter = express.Router();

launchRouter.get("/", httpGetAllLaunches);
launchRouter.post("/", httpAddNewLaunch);
launchRouter.delete("/:id", httpDeleteLaunches);

module.exports = launchRouter;
