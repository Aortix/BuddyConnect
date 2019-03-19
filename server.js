const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoute = require("./routes/api/user.js");
const app = express();
const port = 5000;

//Uses bodyparser to parse incoming request bodies and make info available under req.body
app.use(bodyParser.urlencoded({ extended: false }));

//Binds and listens to port for connections
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`This message was sent through port ${port} at /`);
});

//Routes to make calls
app.use("/api/user", userRoute);

//Connecting to mongodb database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb!");
  })
  .catch(err => {
    console.log(`Connection to mongodb failed because ${err}`);
  });
