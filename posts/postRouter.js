const express = require('express');
const router = express.Router();
const db = require('./postDb')
const validatePost = require('../middleware/validatePost')
const validatePostId = require('../middleware/validatePostId')

router.get('/', (req, res, next) => {
  // do your magic!
  db.get()
    .then(posts=>{
      return res.status(200).json(posts)
    })
    .catch(next)
});

router.get('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
  db.getById(req.params.id)
    .then(post=>{
      return res.status(200).json(post)
    })
    .catch(next)
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
  db.remove(req.params.id)
      .then(post => {
          if (post === 0) {
              res
                  .status(404)
                  .json({ message: "The post with the specified ID does not exist." });
          } else {
              res.status(200).json("Post deleted from database");
          }
      })
      .catch(error => {
          res
              .status(500)
              .json({ error: "The post information could not be retrieved." });
      })
})

router.put('/:id', validatePostId(), validatePost(), (req, res, next) => {
  // do your magic!
  db.update(req.params.id,req.body)
    .then(success=>{
      return db.getById(req.params.id)
    })
    .then(post=>{
      return res.status(200).json(post)
    })
    .catch(next)
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
