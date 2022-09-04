const router = require('express').Router();
const { signup, signin, logout } = require('../../middlewares/auth.controller');
const verifyToken = require('../../middlewares/authJWT');
const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../../errors/errorMessages.config');

router.post('/register', signup, (req, res) => {});

router.post('/login', signin, (req, res) => {});

router.get('/logout', logout, (req, res) => {});

router.get('/profile', verifyToken, (req, res) => {
  if (!req.user) {
    res.status(StatusCodes.FORBIDDEN).send(errorMessages.user.forbidden);
  } else {
    res.status(StatusCodes.OK).send({
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      articles: req.user.articles,
      recipes: req.user.recipes,
    });
  }
});

module.exports = router;
