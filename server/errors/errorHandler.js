const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }

  next();
};

module.exports = errorHandler;
