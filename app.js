const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const emailFunc = require("./email");
const app = express();

// View Engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  console.log(typeof email);
  emailFunc(name, email, message)
    .then(suc => res.render("contact", { msg: "Success" }))
    .catch(err => res.render("contact", { msg: `Error: ${err} ` }));
});

app.listen(3000, () => console.log("Server Started..."));
