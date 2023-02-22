const getAllBootCamps = (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Get All Bootcamps",
    middleware: req.hello,
  });
};

const getSingleBootCamp = (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Get Single Bootcamp",
    bootcampId: req.params.id,
  });
};

const createBootCamp = (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Post Single Bootcamp",
  });
};

const updateBootCamp = (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Update Single Bootcamp",
  });
};

const deleteBootCamp = (req, res) => {
  res.status(200).json({
    status: "Success",
    information: "Delete Single Bootcamp",
  });
};

module.exports = {
  getAllBootCamps,
  getSingleBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
};
