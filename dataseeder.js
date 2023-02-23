const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config({ path: "./config.env" });

// load models
const Bootcamp = require("./models/bootcamps");

// connect to database
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://devcamper:mOm4zKC8eluneJj9@cluster0.n6yc4a9.mongodb.net/devcamper?retryWrites=true&w=majority"
  )
  .then((conn) =>
    console.log(
      `database connection established on host: ${conn.connection.host}`
        .underline.bgBlue
    )
  )
  .catch((error) => console.log(`database connection error: ${error}`.bgRed));

// read the json file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// import into database
const importsData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("data imported successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete data from database
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("data deleted successfully".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importsData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
