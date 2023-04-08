const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

async function mongoConnenct() {
  await mongoose
    .connect(MONGO_URL)
    //check connection
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnenct,
  mongoDisconnect,
};
