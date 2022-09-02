const jwt = require('jsonwebtoken');
const User = require('../models/users/user.model');

const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../errors/errorMessages.config');
const { JWT_SECRET } = require('../general/constants');

const verifyToken = (req, res, next) => {
  if (req.headers?.authorization?.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, function (error, decode) {
      if (error) req.user = undefined;
      User.findOne({
        _id: decode.id,
      }).exec((error, user) => {
        if (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessages.general.internal);
        } else {
          req.user = user;
          next();
        }
      });
    });
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
