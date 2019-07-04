const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const userRoute = require("./routes/api/user.js");
const postRoute = require("./routes/api/post.js");
const profileRoute = require("./routes/api/profile.js");

const app = express();
const port = process.env.PORT || 5000;

//Uses bodyparser to parse incoming request bodies and make info available under req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
}

//Initializes passport for express
app.use(passport.initialize());

//Binds and listens to port for connections
app.listen(port, () => {});

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per windowMs
  handler: function(req, res) {
    const errors = { errors: { misc: "" } };
    errors.errors.misc =
      "Too many posts/comments in a short time. Please wait 1 minute before posting again.";
    return res.status(429).send(errors);
  }
});

//  apply to all requests
app.use("/api/post/create*", limiter);

//Route to make calls to user
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/profile", profileRoute);

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Connecting to mongodb database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {})
  .catch(err => {
    console.log(`Connection to mongodb failed because ${err}`);
  });
