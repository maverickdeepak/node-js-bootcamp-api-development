const errorHandler = (err, req, res, next) => {
  // logs statements for developer
  console.log(err.stack.red);
  res.status(err.statusCode || 500).json({
    status: "failure",
    error: err.message || "server error",
  });
};

module.exports = errorHandler;
