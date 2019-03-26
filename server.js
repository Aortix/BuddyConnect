const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const userRoute = require("./routes/api/user.js");
const homeRoute = require("./routes/api/home.js");
const profileRoute = require("./routes/api/profile.js");

const app = express();
const port = 5000;

//Uses bodyparser to parse incoming request bodies and make info available under req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Initializes passport for express
app.use(passport.initialize());

//Binds and listens to port for connections
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Test get route
app.get("/", (req, res) => {
  res.send(`This message was sent through port ${port} at /`);
});

//Route to make calls to user
app.use("/api/user", userRoute);
app.use("/api/home", homeRoute);
app.use("/api/profile", profileRoute);

//Connecting to mongodb database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb!");
  })
  .catch(err => {
    console.log(`Connection to mongodb failed because ${err}`);
  });
