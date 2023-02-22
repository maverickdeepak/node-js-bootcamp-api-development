const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middlewares/error");

// load .env file
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const bootCampsRoute = require("./routes/bootcamps");

// global middlewares
app.use(express.json());

// database connection
connectDB();

// development logging middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1", bootCampsRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`.yellow.bold);
});
