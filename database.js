const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/iuhd", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: { type: String, required: true },
  studentId: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isUpcoming: { type: Boolean, required: true },
  date: { type: Date, required: true },
  place: { type: String, required: true },
  image: { type: String, required: false },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { User, Event };
