const express = require("express");
const router = express.Router();

router.get("/bootcamps", (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Get All Bootcamps",
  });
});

router.post("/bootcamps", (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Post Single Bootcamp",
  });
});

router.put("/bootcamps/:id", (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Update Single Bootcamp",
  });
});

router.delete("/bootcamps/:id", (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Delete Single Bootcamp",
  });
});

module.exports = router;
