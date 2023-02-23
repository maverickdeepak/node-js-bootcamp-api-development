const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // logs statements for developer
  console.log(err.stack.red);

  //   code for mongoose bad error
  if (err.name === "CastError") {
    const message = `Resource not found with request ${err.value}.`;
    // console.log(err.value);
    error = new ErrorResponse(message, 404);
  }

  // code mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field entered: ${err.keyValue.name}`;
    // console.log(err);
    error = new ErrorResponse(message, 400);
  }

  // code for mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((err) => err.message);
    // console.log(err);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    status: "failure",
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
