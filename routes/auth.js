const express = require("express");
const router = express.Router();
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

// Ruta de registro
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
        userController.createUser;
        res.redirect("/auth/login");
      }
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  }
});

// Ruta de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  // Validar si todos los campos están llenos
  if (!email || !password) {
    errors.push({ msg: "Por favor, llena todos los campos" });
    return res.render("login", { errors, email });
  }

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      // Si el usuario no existe
      errors.push({ msg: "Usuario no encontrado" });
      return res.render("login", { errors, email });
    }

    // Verificar contraseña
    if (password !== user.password) {
      errors.push({ msg: "Contraseña incorrecta" });
      return res.render("login", { errors, email });
    }

    // Si la autenticación es exitosa, almacenar la sesión del usuario
    req.session.user = user;

    // Redirigir según el rol del usuario
    if (user.role === "admin") {
      res.redirect("/admin");
    } else if (user.role === "client") {
      res.redirect("/products");
    } else {
      // Si el rol no es reconocido, podrías redirigir a una página de error o al inicio
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/auth/login");
  }
});

/* Ruta de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  if (!email || !password) {
    errors.push({ msg: "Por favor, llena todos los campos" });
  }

  if (errors.length > 0) {
    res.render("login", { errors, email });
  } else {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        errors.push({ msg: "Usuario no encontrado" });
        res.render("login", { errors, email });
      } else {
        req.session.user = { userId: user._id, role: user.role };
        //req.flash("success_msg", "Has iniciado sesión correctamente");
        res.redirect("/");
        //errors.push({ msg: 'Contraseña incorrecta' });
        //res.render("login", { errors, email });
      }
    } catch (err) {
      console.error(err);
      console.log(err);
      res.redirect("/auth/login");
    }
  }
});*/

// Ruta de logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  //req.flash('success_msg', 'Has cerrado sesión');
  res.redirect("/auth/login");
});

module.exports = router;
