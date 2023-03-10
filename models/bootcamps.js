const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const BootCampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a bootcamp name"],
    unique: true,
    trim: true,
    maxLength: [122, "Name can not exceed 122 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please provide a bootcamp description"],
    maxLength: [500, "Description can not exceed 500 characters"],
  },
  wesbite: {
    type: String,
    match: [
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
      "Please use a valid URL with http or https",
    ],
  },
  phone: {
    type: String,
    maxLength: [18, "Phone number must be be 18 digit"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create slug for bootcamp from name
BootCampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// create geocode and location field
BootCampSchema.pre("save", async function (next) {
  const location = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress,
    street: location[0].streetName,
    city: location[0].city,
    state: location[0].stateCode,
    zipcode: location[0].zipcode,
    country: location[0].countryCode,
  };

  // don't save address into DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model("BootCamp", BootCampSchema);
