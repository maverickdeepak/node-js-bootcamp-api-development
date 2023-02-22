const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// load .env file
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const app = express();
const logger = require("./middlewares/logger");
const bootCampsRoute = require("./routes/bootcamps");

// global middlewares
app.use(express.json());

// app.use(logger);

// development logging middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1", bootCampsRoute);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
