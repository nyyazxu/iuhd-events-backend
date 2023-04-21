const path = require("path");
const express = require("express");
const { User, Event } = require("./database.js");

const app = express();

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// Endpoint to login user by checking name and password
app.post("/login", async (req, res) => {
  const { studentId, password } = req.body;
  const user = await User.findOne({ studentId, password });
  if (!user) return res.status(404).send("User not found.");
  res.send(user);
});

// Endpoint to get user by name
app.get("/users/:name", async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  if (!user) return res.status(404).send("User not found.");
  res.send({ ...user, password: undefined });
});

// Endpoint to get all events
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

// const user1 = new User({
//   name: "John Doe",
//   faculty: "Computer Science",
//   studentId: "123456",
//   password: "mypassword",
// });

// const user2 = new User({
//   name: "Jane Doe",
//   faculty: "Mathematics",
//   studentId: "654321",
//   password: "mypassword",
// });

// const event1 = new Event({
//   title: "Conference 1",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   date: new Date("2023-05-15"),
//   place: "New York",
//   image: "event1.jpg",
//   isUpcoming: true,
// });

// const event2 = new Event({
//   title: "Conference 2",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   date: new Date("2023-05-16"),
//   place: "Los Angeles",
//   image: "event2.jpg",
//   isUpcoming: true,
// });

// const event3 = new Event({
//   title: "Conference 3",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   date: new Date("2023-05-17"),
//   place: "Chicago",
//   image: "event3.jpg",
//   isUpcoming: true,
// });

// const event4 = new Event({
//   title: "Conference 4",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   date: new Date("2023-05-18"),
//   place: "Houston",
//   image: "event4.jpg",
//   isUpcoming: false,
// });

// const event5 = new Event({
//   title: "Conference 5",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   date: new Date("2023-05-19"),
//   place: "Seattle",
//   image: "event5.jpg",
//   isUpcoming: false,
// });

// user1.save();
// user2.save();
// event2.save();
// event1.save();
// event3.save();
// event4.save();
// event5.save();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
