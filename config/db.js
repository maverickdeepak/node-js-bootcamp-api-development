const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) =>
      console.log(
        `database connection established on host: ${conn.connection.host}`
          .underline.bgBlue
      )
    )
    .catch((error) => console.log(`database connection error: ${error}`.bgRed));
};

module.exports = connectDB;
