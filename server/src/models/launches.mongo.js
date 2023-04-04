const mongoose = require("mongoose");

/*
    make schema
    new mongoos.Schema({
        dataName: dataType,
        .
        .
        dataName: {
            type: dataType,
            required: Boolean,
            default: value,
            min: value,
            max:value,
        },
        dataName: [datatype],
    })
*/
//schema of launch
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    require: true,
  },
  mission: {
    type: String,
    require: true,
  },
  rocket: {
    type: String,
    require: true,
  },
  launchDate: {
    type: Date,
    requrire: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    require: true,
  },
  success: {
    type: Boolean,
    require: true,
    default: true,
  },
});

//create model to connect collection "launche"
//mongoose.model("collectionName",schema)
module.exports = mongoose.model("Launche", launchesSchema);
