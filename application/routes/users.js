
var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');



/* GET localhot:3000/users/register */

router.post("/registration",
  validationMiddleware.isUsernameUnique,
  validationMiddleware.usernameCheck,
  validationMiddleware.emailCheck,
  validationMiddleware.passwordCheck,
  validationMiddleware.emailCheck,

  async function (req, res, next) {
    var { username, email, password } = req.body;
    //check username unique
    try {
      //insert into db
      var hasedPassword = await bcrypt.hash(password, 3);

      var [resultObject, fields] = await db.execute(`INSERT INTO users (username,email,password) VALUES (?,?,?);`
        , [username, email, hasedPassword]);
      //response
      if (resultObject && resultObject.affectedRows == 1) {
        return res.redirect("/login");
      }
      else {
        return res.redirect("/registration");
      }


    } catch (error) {
      next(error);

    }
  });

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash('info', 'Log In Failed: Please provide a valid username/password');
    return res.redirect('/login');
  } else {
    var [rows, fields] = await db.execute(`SELECT id,username,password,email from users where username=?;`, [username]);
    var user = rows[0];

    if (!user) {
      req.flash('error', 'Log In Failed: Invalid username/password');
      return res.redirect('/login');
    } else {
      var passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.username
        };

        req.flash('success', 'You are now logged in');
        return res.redirect('/');
      } else {
        req.flash('error', 'Log In Failed: Invalid username/password');
        return res.redirect('/login');
      }
    }
  }
});



router.use('/:id(\\d+)', isLoggedIn, isMyProfile, function (req, res) {
  res.render('profile', { title: 'profile', css: ["profile_style.css"]});
})

router.post('/logout', isLoggedIn, function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(error);
    }
    return res.redirect('/');
  })
});

module.exports = router;



