const express = require("express")
//add router
const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");
const api = express.Router()


//router
api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;