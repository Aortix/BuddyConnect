const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const userRoute = require("./routes/api/user.js");
const postRoute = require("./routes/api/post.js");
const profileRoute = require("./routes/api/profile.js");

const app = express();
const port = 5000;

//Uses bodyparser to parse incoming request bodies and make info available under req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//Initializes passport for express
app.use(passport.initialize());

//Binds and listens to port for connections
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static("public"));

//Test get route
app.get("/", (req, res) => {
  res.send(`This message was sent through port ${port} at /`);
});

//Route to make calls to user
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
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
