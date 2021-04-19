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
