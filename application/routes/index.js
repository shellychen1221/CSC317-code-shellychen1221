var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const { getRecentPosts } = require('../middleware/posts');
const { makeThumbnail, getPostById, getCommentsForPostById,getPostsForUserBy} = require('../middleware/posts');
var db = require('../conf/database');

var router = express.Router();

/* GET home page. */

router.get('/login', function (req, res) {
  res.render('login', { title: 'login'  });
})
router.get('/registration', function (req, res) {
  res.render('registration', { title: 'register', js: ["registration.js"] });
});
router.get('/profile', isLoggedIn, getPostsForUserBy, getRecentPosts, async function (req, res) {
  res.render('profile', {
      title: 'Profile',
      posts: res.locals.posts,
      recentPosts: res.locals.recentPosts
  });
});
router.get('/', async function (req, res, next) {
  try {
      var [rows, _] = await db.execute(
          `SELECT id,title,thumbnail,concat_ws(' ', title, description) as haystack
          FROM posts
          ORDER BY id DESC;`
      );

      res.locals.posts = rows;
      return res.render('index', { title: 'Home' });
     
  } catch (error) {
      next(error);
  }
});



router.get('/postvideo',isLoggedIn, function (req, res) {
  res.render('postvideo', { title: 'post video'});
});
module.exports = router;
