const express = require("express");
const dotenv = require("dotenv");

// load .env file
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API development</h1>");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
