var createError = require("http-errors");
var express = require("express");
var path = require("path");
require("dotenv").config();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var productsRouter = require("./routes/products");
var ordersRouter = require("./routes/orders");
var cartRouter = require("./routes/cart");
const adminRouter = require("./routes/admin");
var apiRouter = require("./routes/apis");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "clavesecreta",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/api/users", usersRouter);
//app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "test") {
  connectDB();
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  });
}

module.exports = app;
