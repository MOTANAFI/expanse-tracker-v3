const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
