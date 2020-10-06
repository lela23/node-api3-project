module.exports = () => {
  return (req,res,next) => {
    if (!req.body || !req.body.name) {
      res.status(400).json({
        message: "Missing user name",
      })
    } else {
      next()
    }
  }
}
