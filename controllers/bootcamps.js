const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/bootcamps");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

const getAllBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res.status(200).json({
    status: "Success",
    results: bootcamp.length,
    data: bootcamp,
  });
});

const getSingleBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById({ _id: req.params.id });
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with id ${req.params.id}. Please check your bootcamp id`,
        404
      )
    );
  } else {
    res.status(200).json({
      status: "Success",
      data: bootcamp,
    });
  }
});

const createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(200).json({
    status: "Success",
    data: bootcamp,
  });
});

const updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    res.status(400).json({
      status: "failure",
      message: "bootcamp not found. Please check bootcamp id",
    });
  } else {
    res.status(200).json({
      status: "Success",
      data: bootcamp,
    });
  }
});

const deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    res.status(400).json({
      status: "failure",
      message: "bootcamp not found. Please check bootcamp id",
    });
  } else {
    res.status(200).json({
      status: "Success",
    });
  }
});

// get bootcamps withhin a radius / area
const getBootCampsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lang from geocoder
  const location = await geocoder.geocode(zipcode);
  const lat = location[0].latitude;
  const lng = location[0].longitude;

  // calculate the radius using radians
  // divide distanc by radius of earth
  // earth radius = 3,963 mi / 6378 km

  const radius = distance / 6378;
  const bootcamps = await Bootcamp.find({
    $geoWithin: { $centerSphere: [[lat, lng], radius] },
  });
  res.status(200).json({
    status: "Success",
    results: bootcamps.length,
    data: bootcamps,
  });
};

module.exports = {
  getAllBootCamps,
  getSingleBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
};
