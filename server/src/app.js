const express = require("express");
const path = require("path");
//morgan is middleware for get log of request
const morgan = require("morgan");
// for set the cros origin we need a package
const cors = require("cors");
const api = require("./routes/api");
const app = express();

const crosOrigin = ["http://localhost:3000", "http://192.168.1.102:3000"];
app.use(cors(crosOrigin));

//add morgan
app.use(morgan("common"));

//config json
app.use(express.json());

//add middleware for express build
app.use(express.static(path.join(__dirname, "..", "public")));

//version1
app.use("/v1", api);

//and send main static as (/)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
