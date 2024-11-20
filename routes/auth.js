const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
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


router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: "Por favor, llena todos los campos" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email });
  } else {
    try {
      let user = await User.findOne({ email });
      if (user) {
        errors.push({ msg: "El correo ya está registrado" });
        console.log(errors);
        res.render("register", { errors, name, email });
      } else {
        await userController.createUser(req, res);
        res.redirect("/auth/login");
      }
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  }
});




router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  if (!email || !password) {
    errors.push({ msg: "Por favor, llena todos los campos" });
    return res.render("login", { errors, email });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      errors.push({ msg: "Usuario no encontrado" });
      return res.render("login", { errors, email });
    }

    if (!user.password) {
      errors.push({ msg: "Error interno: falta el hash de la contraseña" });
      return res.render("login", { errors, email });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      errors.push({ msg: "Contraseña incorrecta" });
      return res.render("login", { errors, email });
    }

    req.session.user = user;

    if (user.role === "admin") {
      res.redirect("/admin/dashboard");
    } else if (user.role === "client") {
      res.redirect("/products");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/auth/login");
  }
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
