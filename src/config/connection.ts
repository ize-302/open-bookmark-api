const mongoose = require("mongoose");
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  retryWrites: true,
  w: "majority",
});

mongoose.Promise = global.Promise;

const dbConnect = mongoose.connection;

module.exports = dbConnect;
