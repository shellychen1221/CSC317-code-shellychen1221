const { request } = require('express');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');
const { } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/auth');
const { makeThumbnail, getPostById, getCommentsForPostById, getPostsForUserBy } = require('../middleware/posts');

const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos/uploads')
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`)
    }
})

const upload = multer({ storage: storage })
router.post('/create', isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;
    try {
      var [insertResult, _] = await db.execute(
        `INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUE (?, ?, ?, ?, ?);`,
        [title, description, path, thumbnail, userId]
      );
      if (insertResult && insertResult.affectedRows) {
        req.flash('success', "Your post was created successfully");
        setTimeout(() => {
          req.session.save((error) => {
            if (error) return next(error);
            return res.redirect('/');
          });
        }, 1000);
      } else {
        next(new Error('Post could not be created'));
      }
    } catch (error) {
      next(error);
    }
  });
  
router.get('/:id(\\d+)', getPostById, getCommentsForPostById, isLoggedIn, function (req, res) {
    res.render('viewpost', { title: `View Post ${req.params.id}`, js: ["viewpost.js"] });
});



router.get("/search", async function (req, res, next) {
    var { searchValue } = req.query;
    try {
        var [rows, _] = await db.execute(
            `SELECT id,title,thumbnail,concat_ws(' ', title, description) as haystack
        from posts
        having haystack like ?;`,
            [`%${searchValue}%`]

        );
        if (rows && rows.length == 0) {

        } else {
            res.locals.posts = rows;
            return res.render('index', { title: 'index'});
        }

    }
    catch (error) {
        next(error);
    }


});

router.post("/:id/delete", isLoggedIn, async function (req, res, next) {
  var postId = req.params.id;
  try {
    // Delete associated comments first
    await db.execute(
      `DELETE FROM comments WHERE fk_postid = ?;`,
      [postId]
    );

    // Then delete the post
    var [deleteResult, _] = await db.execute(
      `DELETE FROM posts WHERE id = ?;`,
      [postId]
    );

    if (deleteResult && deleteResult.affectedRows) {
      req.flash('success', "Post deleted successfully");
    } else {
      req.flash('error', "Failed to delete the post");
    }
    return res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});
  

  
  
  
  
  
module.exports = router;