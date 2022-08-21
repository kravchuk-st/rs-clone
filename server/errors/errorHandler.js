const errorHandler = (err, req, res, next) => {
  res.status(500).send('Error occured');
  next(err);
};

module.exports = errorHandler;
