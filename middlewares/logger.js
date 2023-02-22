const logger = (req, res, next) => {
  (req.hello = "Hello World from middlewares!"),
    console.log("middleware is running");
  next();
};

module.exports = logger;
