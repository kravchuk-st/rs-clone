const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');
const { JWT_SECRET } = require('../general/constants');

const verifyToken = (req, res, next) => {
  if (req.cookies?.token !== undefined) {
    jwt.verify(req.cookies.token, JWT_SECRET, (error, decoded) => {
      if (error) {
        error.status = StatusCodes.FORBIDDEN;
        req.user = undefined;
        next(error);
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
