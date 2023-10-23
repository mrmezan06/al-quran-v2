const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((con) => {
        // text color white and bold, background color bgcyan
        console.log(
          `Connected to MongoDB at ${con.connection.host}`.rainbow.bold
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
