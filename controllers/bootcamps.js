const Bootcamp = require("../models/bootcamps");
const ErrorResponse = require("../utils/errorResponse");

const getAllBootCamps = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({
      status: "Success",
      results: bootcamp.length,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "something went wrong",
    });
  }
};

const getSingleBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById({ _id: req.params.id });
    if (!bootcamp) {
      // return res.status(400).json({
      //   status: "failure",
      //   message: "Bootcamp not found. Please check your bootcamp id",
      // });
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
  } catch (error) {
    // res.status(400).json({
    //   status: "failure",
    //   message: "something went wrong",
    // });
    next(
      new ErrorResponse(
        `Bootcamp not found with id ${req.params.id}. Please check your bootcamp id`,
        404
      )
    );
  }
};

const createBootCamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({
      status: "Success",
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "something went wrong",
    });
  }
};

const updateBootCamp = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "failure",
      information: "something went wrong",
    });
  }
};

const deleteBootCamp = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "something went wrong",
    });
  }
};

module.exports = {
  getAllBootCamps,
  getSingleBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
};
