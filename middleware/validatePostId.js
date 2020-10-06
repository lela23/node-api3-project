const posts = require("../posts/postDb")

module.exports = () => {
  return (req,res,next) => {
    posts.getById(req.params.id)
      .then((post) => {
        if (post) {
          console.log("CheckPostId")
          req.post = post
          next()
        } else {
          res.status(404).json({
            message: "Post not found"
          })
        }
      })
      .catch(next)
  }
}
