const jwt = require('jsonwebtoken');
const User = require('../models/users/user.model');

const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../errors/errorMessages.config');
const { JWT_SECRET } = require('../general/constants');

const verifyToken = (req, res, next) => {
  if (req.headers?.authorization?.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, (error, decoded) => {
      if (error) {
        error.status = StatusCodes.FORBIDDEN;
        req.user = undefined;
        next(error);
      } else {
        User.findOne({
          _id: decoded.id,
        }).exec((error, user) => {
          if (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessages.general.internal);
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
