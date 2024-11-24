const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
const User = require("../models/User");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.render("admin");
});

router.get("/client", isAuthenticated, (req, res) => {
  if (req.session.user.role === "client") {
    res.render("products");
  } else {
    res.status(403).send("Acceso denegado");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: "Por favor, llena todos los campos" });
    return res.render("register", { errors, name, email });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: "El correo ya está registrado" });
      console.log(errors);
      return res.status(400).json({ error: "El correo ya está registrado" });
    } else {
      try {
        await userController.createUser(req, res);
      } catch (err) {
        console.error("Error en el controlador createUser:", err.message);
        return res.status(400).json({ error: err.message });
      }
    }
  } catch (err) {
    console.error("Error en la búsqueda del usuario:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      req.session.user = user;

      if (user.role === "admin") {
        return res.redirect("/admin/dashboard");
      } else if (user.role === "client") {
        return res.redirect("/products");
      } else {
        return res.redirect("/");
      }
    });
  })(req, res, next);
});

// Ruta de logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
});
module.exports = router;
