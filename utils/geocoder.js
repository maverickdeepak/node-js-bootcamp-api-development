const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODE_PROVIDER,

  // Optional depending on the providers
  //   fetch: customFetchImplementation,
  httpAdapter: "https",
  apiKey: process.env.GEOCODE_CONSUMER_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
