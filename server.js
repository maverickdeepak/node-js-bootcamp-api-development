const express = require("express");
const dotenv = require("dotenv");

// load .env file
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const app = express();
const bootCampsRoute = require("./routes/bootcamps");

app.use(express.json());

app.use("/api/v1", bootCampsRoute);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
