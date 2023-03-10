const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/bootcamps");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

const getAllBootCamps = asyncHandler(async (req, res, next) => {
  // get the bootcamps data on query parameters or return all the data
  let query;

  // copy of req.query
  const requestQuery = { ...req.query };

  // fields to execlude
  const removeFields = ["select", "sort", "page", "limit"];

  // loop over remove fields and delete from request query
  removeFields.forEach((removeField) => delete requestQuery[removeField]);

  // create query string
  let queryString = JSON.stringify(req.query);

  // create operatore like lte lt etc
  queryString = queryString.replace(
    /\b(gt|gte|lte|lt|in)\b/g,
    (match) => `$${match}}`
  );

  // find the resources/bootcamps
  query = Bootcamp.find(JSON.parse(queryString));

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // executing the query
  const bootcamp = await query;

  // pagination results
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.status(200).json({
    status: "Success",
    results: bootcamp.length,
    pagination: pagination,
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
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
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
