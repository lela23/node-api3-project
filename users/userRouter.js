const express = require('express')
const db = require('./userDb')
const posts = require('../posts/postDb')
const validateUser = require('../middleware/validateUser')
const validateUserId = require('../middleware/validateUserId')
const validatePost = require('../middleware/validatePost')

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  // do your magic!
  db.insert(req.body)
		.then((user) => {
			return res.status(201).json(user)
		})
		.catch(next)
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  // do your magic!
  if (!req.body.user_id) {
    req.body.user_id = req.params.id
  }
  posts.insert(req.body)
    .then(postId=>{
      return res.status(201).json(postId)
    })
    .catch(next)
});

router.get('/', (req, res, next) => {
  // do your magic!
  db.get()
    .then(users=>{
      return res.status(200).json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  db.getById(req.params.id)
    .then(user=>{
      return res.status(200).json(user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  db.getUserPosts(req.params.id)
    .then(posts=>{
      return res.status(200).json(posts)
    })
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  db.remove(req.params.id)
    .then(success=> {
      if (success===1) {
        return res.status(200).json({message: "User deleted"})
      } else {
        return res.status(500).json({message: "User could not be deleted"})
      }
    })
    .catch(next)
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  // do your magic!
  db.update(req.params.id,req.body)
    .then(success=>{
      return db.getById(req.params.id)
    })
    .then(user=>{
      return res.status(200).json(user)
    })
    .catch(next)
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }
//
// function validateUser(req, res, next) {
//   // do your magic!
// }
//
// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
