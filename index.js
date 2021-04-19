const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
const localStratrgy = require("passport-local").localStratrgy;
const bcrypt = require("bcrypt");
const app = express();

dotenv.config();
const { DB_URI } = process.env;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", UserSchema);

// Middleware
app.engine("hbs", hbs({ extname: ".hbs" }));

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // setup user Model
});
