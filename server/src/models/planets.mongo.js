const mongoose = require("mongoose");

//schema of planets
const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Planet", planetSchema)