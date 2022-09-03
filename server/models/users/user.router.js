const router = require('express').Router();
const { signup, signin, logout } = require('../../middlewares/auth.controller');
const verifyToken = require('../../middlewares/authJWT');
const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../../errors/errorMessages.config');

router.post('/register', signup, (req, res) => {});

router.post('/login', signin, (req, res) => {});

router.post('/logout', logout, (req, res) => {});

router.get('/profile', verifyToken, (req, res) => {
  if (!req.user) {
    res.status(StatusCodes.FORBIDDEN).send(errorMessages.user.forbidden);
  } else {
    //  DB request for user page content
    res.status(StatusCodes.OK).send('Access to profile is given');
  }
});

module.exports = router;
