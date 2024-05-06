const validator = require('validator');
const db = require('../conf/database');
const bcrypt = require('bcrypt');

module.exports = {
  usernameCheck: function (req, res, next) {
    let { username } = req.body;
    username = username.trim();

    if (!validator.isLength(username, { min: 3 })) {
      req.flash("error", "Username must be between 3 and 20 characters.");
    }
    if (!/^[a-zA-Z]/.test(username)) {
      req.flash("error", "Username must begin with a character.");
    }

    const errors = req.flash("error");
    const usernameLabel1 = `Username has at least 3 alphanumeric characters`;
    const usernameLabel2 = `Enter a username that begins with a character ([a-zA-Z])`;

    res.locals.usernameLabel1 = errors.length ? errors[0] : usernameLabel1;
    res.locals.usernameLabel2 = errors.length ? errors[1] : usernameLabel2;
    res.locals.usernameValidity = errors.length ? 'invalid-code' : 'valid-code';

    next();
  },

  passwordCheck: function (req, res, next) {
    let { password, confirmPassword } = req.body;

    if (!validator.isLength(password, { min: 8 })) {
      req.flash("error", "Password must be at least 8 characters long.");
    }
    if (!/[a-z]/.test(password)) {
      req.flash("error", "Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      req.flash("error", "Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      req.flash("error", "Password must contain at least one digit.");
    }
    if (!/[\/*\-+!@#\$%\^&~\[\]]/.test(password)) {
      req.flash("error", "Password must contain at least one special character (/ * - + ! @ # $ ^ & ~ [ ]).");
    }
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match.");
    }

    // Synchronous label updates
    const errors = req.flash("error");
    const passwordLabel1 = errors.length ? errors[0] : 'Password is valid';

    res.locals.passwordLabel1 = passwordLabel1;
    res.locals.passwordValidity = errors.length ? 'invalid-code' : 'valid-code';

    next();
  },

  emailCheck: async function (req, res, next) {
    const { email } = req.body;

    try {
      const [rows, fields] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);

      if (rows && rows.length > 0) {
        req.flash("error", `${email} is already in use.`);
        return res.redirect("/registration");
      }

      next();
    } catch (error) {
      next(error);
    }
  },

  isUsernameUnique: async function (req, res, next) {
    const { username } = req.body;

    try {
      const [rows, fields] = await db.execute("SELECT id FROM users WHERE username = ?", [username]);

      if (rows && rows.length > 0) {
        req.flash("error", `${username} is already in use.`);
        return res.redirect("/registration");
      }

      next();
    } catch (error) {
      next(error);
    }
  },

};
