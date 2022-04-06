var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var pug = require("pug");
const mongoose = require("mongoose");
var foundusers = require("./user_model.js");
require("dotenv").config();

const port = 5000;

const uri = process.env.MONGOURI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/notified/:id", async function (req, res) {
  console.log(req.params.id);
  const filter = { shortcode: req.params.id };
  const update = { notified: "yes checking.." };

  let doc = await foundusers.findOneAndUpdate(filter, update);

  res.redirect("/list/n#table");
});

app.get("/report/:id", async function (req, res) {
  console.log(req.params.id);
  const filter = { shortcode: req.params.id };
  const update = { notified: "reported" };

  let doc = await foundusers.findOneAndUpdate(filter, update);

  res.redirect("/list/n#table");
});

app.get("/list/n", async function (req, res) {
  var data = await foundusers.find({}).exec(); //find all entrys
  res.render("listn", { tabledata: data });
});

app.get("/", async function (req, res) {
  res.render("index");
});

app.get("/list", async function (req, res) {
  var data = await foundusers.find({}).exec(); //find all entrys
  res.render("list", { tabledata: data });
});

app.get("/information", function (req, res) {
  res.render("information");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening at http://localhost:${port}`);
});
