module.exports = () => {
  return (req,res,next) => {
    if (!req.body || !req.body.text) {
  		// Make sure you have a return statement, otherwise the
  		// function will continue running and you'll see ERR_HTTP_HEADERS_SENT
  		res.status(400).json({
  			message: "Need a value for text",
  		})
  	} else {
      next()
    }
  }
}
