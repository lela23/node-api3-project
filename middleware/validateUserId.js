const users = require("../users/userDb")

module.exports = () => {
  return (req,res,next) => {
    users.getById(req.params.id)
      .then((user) => {
        if (user) {
          console.log("CheckUserId")
          req.user = user
          next()
        } else {
          res.status(404).json({
            message: "User not found"
          })
        }
      })
      .catch(next)
  }
}
