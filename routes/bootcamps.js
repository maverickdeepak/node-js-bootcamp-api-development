const express = require("express");
const router = express.Router();

const {
  getAllBootCamps,
  getSingleBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
} = require("../controllers/bootcamps");

router.get("/bootcamps", getAllBootCamps);

router.get("/bootcamps/:id", getSingleBootCamp);

router.post("/bootcamps", createBootCamp);

router.put("/bootcamps/:id", updateBootCamp);

router.delete("/bootcamps/:id", deleteBootCamp);

router.get("/bootcamps/:radius/:distance", getBootCampsInRadius);

module.exports = router;
