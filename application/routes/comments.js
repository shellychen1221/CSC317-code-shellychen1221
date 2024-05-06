var express = require('express');
var router = express.Router();
var { isLoggedIn } = require('../middleware/auth');
var db = require('../conf/database');

router.post('/create', isLoggedIn, async function (req, res, next) {
  var { userId, username } = req.session.user; // Add 'username' to destructuring assignment
  var { postId, comment } = req.body;
  
  try {
    var [insertResult, _] = await db.execute(
      `INSERT INTO comments (text, fk_authorId, fk_postId) VALUES (?, ?, ?);`,
      [comment, userId, postId] // Swap 'userId' and 'postId'
    );

    if (insertResult && insertResult.affectedRows == 1) {
      return res.status(201).json({
        commentId: insertResult.insertId, // Correct typo: 'commendId' to 'commentId'
        username: username,
        commentText: comment,
        
      });
    } else {
      res.json({
        message: "error",
      });
    }
  } catch (error) {
    // Handle the error here (e.g., log or send an error response)
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
